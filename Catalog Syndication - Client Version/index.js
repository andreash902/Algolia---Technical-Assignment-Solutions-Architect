const axios = require('axios');
const xml2js = require('xml2js');
const { KafkaClient, Consumer, Producer } = require('kafka-node'); // Including Producer for potential future use
const fs = require('fs');
const parser = new xml2js.Parser();

const algoliaAppId = 'XIBNVPFIEF'; // Client Algolia App ID
const algoliaApiKey = '58aa9547a62e8b262df30c53a731a5b1'; // Client Algolia Admin API Key
const algoliaIndexName = 'ProductCatalog'; // Client Index Name
const kafkaConfig = {
  kafkaHost: 'host:9092', // Replaceable with correct host and port from Client.
  topic: 'articleparameter_updates' // Replaceable with correct Topic name from Client.
};
const productFeedUrl = 'https://customer.hiringtest.com/productfeed.xml'; // Replaceable with correct Client Product Feed URL. Might need to consider potential Authorization.

let productCatalog = [];
let kafkaUpdates = [];

/*INTRO:
  To ensure synchronization accuracy, we prioritize retrieving the XML catalog as the primary source of truth, 
  addressing reported synchronization discrepancies between the catalog and Kafka messages. 
  Subsequently, we integrate changes from Kafka. While it mitigates the issue to some extent, 
  advising the client to implement timestamping for both XML and Kafka would improve synchronization reliability further.
*/

async function fetchAndParseXMLWithRetry(retryCount = 5) { // Here we fetch the XML, parse it with xml2js, and added a retry logic. We add the items to the Product Catalog. It can handle multiple products.
  for (let i = 0; i < retryCount; i++) {
    try {
      const response = await axios.get(productFeedUrl, { timeout: 120000 }); // 120-second timeout
      const result = await parser.parseStringPromise(response.data);
      productCatalog = result.root.row.map(item => ({
        name: item.name[0],
        description: item.description[0],
        brand: item.brand[0],
        categories: item.categories[0].split(','),
        hierarchicalCategories: {
          lvl0: item.hierarchicalCategories[0].lvl0[0],
          lvl1: item.hierarchicalCategories[0].lvl1[0].replace(' &gt; ', ' > ')
        },
        price: parseFloat(item.price[0]),
        image: item.image[0],
        objectID: item.objectID[0]
      }));
      applyKafkaUpdates(); // Apply Kafka updates
      logCatalogExports(); // Log the catalog exports
      break; // Success
    } catch (error) { // Added new Console logs
      console.error(`Attempt ${i + 1}: Error fetching or parsing Client's XML feed. Retrying in 30 seconds...`);
      if (i === retryCount - 1) {
        console.error('Max retries reached. Unable to fetch and parse XML.');
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, 30000)); // Waiting for 30 seconds
    }
  }
}

function setupKafkaConsumer() {
  const client = new KafkaClient(kafkaConfig);
  const consumer = new Consumer(client, [{ topic: kafkaConfig.topic, partition: 0 }], { autoCommit: true });

  consumer.on('message', (message) => {
    kafkaUpdates.push(JSON.parse(message.value));
  });

  consumer.on('error', (err) => console.error('Error consuming Kafka messages:', err));
}

function applyKafkaUpdates() {
  kafkaUpdates.forEach(update => {
    const index = productCatalog.findIndex(item => item.objectID === update.objectID);
    if (index !== -1) {
      productCatalog[index] = { ...productCatalog[index], ...update };
    }
  });
  kafkaUpdates = []; // Clearing temporary Kafka updates after application
}

async function sendToAlgolia(data) { // Utilizing the Algolia Ingestion API (https://www.algolia.com/doc/rest-api/ingestion/) we push the Product Catalog to Algolia for indexing.
  try {
    await axios.post(`https://${algoliaAppId}.algolia.net/1/indexes/${algoliaIndexName}/batch`, { requests: data.map(item => ({ action: 'updateObject', body: item })) }, { headers: { 'X-Algolia-API-Key': algoliaApiKey, 'X-Algolia-Application-Id': algoliaAppId, 'Content-Type': 'application/json' } });
    console.log('Product Catalog successfully sent to Algolia');
  } catch (error) {
    console.error('Error sending data to Algolia for Indexing:', error.message);
  }
}

function logCatalogExports() {
  const logMessage = `Catalog export at ${new Date().toISOString()}\n`;
  fs.appendFile('CatalogExports.log', logMessage, (err) => {
    if (err) throw err;
    console.log('Current Catalog export was logged in CatalogExports.log');
  });
}

/*
I assume that using the Clients existing Kafka could be useful for sending status reports.
This function has been commented out but left in the code so the client could utilize it, if wanted.

async function sendStatusToKafka(statusMessage) {
  const client = new KafkaClient(kafkaConfig);
  const producer = new Producer(client);
  const payloads = [
    { topic: 'status_reports', messages: statusMessage }
  ];
  
  producer.on('ready', async function() {
    producer.send(payloads, (err, data) => {
      if (err) {
        console.error('Error sending status to Kafka:', err);
      } else {
        console.log('Status sent to Kafka:', data);
      }
    });
  });

  producer.on('error', function(err) {
    console.error('Error in Kafka Producer:', err);
  });
}
*/

function calculateNextRun() {
  const now = new Date();
  const nextRun = new Date();
  nextRun.setHours(now.getHours() + 1, 15, 0, 0); // We set the next run time to the next hour + 15 minutes to not interfere with the E-Commerce Website fetching the XML Catalog, assuming it does that at exactly every hour.
  if (nextRun < now) { // If the calculated time is in the past, we schedule it for the next hour.
    nextRun.setHours(now.getHours() + 2, 15, 0, 0);
  }
  return { nextRun, delay: nextRun - now }; // Here we return the next run time and the delay in milliseconds.
}

async function scheduleNextRun() {
  const { nextRun, delay } = calculateNextRun();
  setTimeout(async () => {
    await fetchAndParseXMLWithRetry(5); 
    await sendToAlgolia(productCatalog);
    scheduleNextRun(); // Schedules the next run
  }, delay);
}

async function main() { // When the script is first initialized, we want to know when the first run is scheduled exactly and how long to wait for the run.
  console.log('Algolia Feed Syndication Script initialized');
  const now = new Date();
  const { nextRun, delay } = calculateNextRun();
  console.log(`Current time is ${now.toISOString()}, next run will be at ${nextRun.toISOString()} in ${Math.floor(delay / 60000)} minutes.`); 
  setupKafkaConsumer();
  scheduleNextRun(); 
}

main().catch(err => console.error(err));

/* Note: This script version omits several functionalities present in the client-specific implementation to streamline demonstration purposes. 
   Please review the client version first to understand the logic of the original script.
   In this demonstration version, direct data ingestion into Algolia's API is simulated by uploading the local ProductCatalog.json from the "productcatalog" directory. 
   This approach serves to illustrate the mechanism of data mapping and parsing in the absence of live client data feeds from Kafka and the XML from the URl.
   For a detailed understanding and access to the complete script, please look to the Client Version at:
   https://github.com/andreash902/Algolia-Solution-Architect---Hiring-Test/tree/main/Catalog%20Syndication%20-%20Client%20Version */



const axios = require('axios');
// const xml2js = require('xml2js');
// const { KafkaClient, Consumer } = require('kafka-node');
const fs = require('fs');
// const parser = new xml2js.Parser();

const algoliaAppId = 'XIBNVPFIEF'; //Client Algolia App ID
const algoliaApiKey = '58aa9547a62e8b262df30c53a731a5b1'; //Client Algolia Admin API Key
const algoliaIndexName = 'ProductCatalog'; //Client Index Name
// const kafkaConfig = {
//   kafkaHost: 'host:9092', //Replace with correct host and port from Client.
//   topic: 'articleparameter_updates' //Replace with correct Topic name from Client.
// };
// const productFeedUrl = 'https://customer.hiringtest.com/productfeed.xml';

let productCatalog = [];
// let kafkaUpdates = [];

async function loadJSONCatalog() {
  try {
    const data = fs.readFileSync('ProductCatalog/ProductCatalog.json', 'utf8');
    productCatalog = JSON.parse(data);
    console.log('Product Catalog loaded from JSON.');
    await sendToAlgolia(productCatalog);
  } catch (err) {
    console.error('Error loading or parsing ProductCatalog.json:', err);
  }
}

/* function setupKafkaConsumer() {
  // Kafka Consumer setup code here
} */

/* function applyKafkaUpdates() {
  // Apply Kafka updates code here
} */

async function sendToAlgolia(data) { //Utilizing the Algolia Ingestion API we push the Product Catalog to Algolia for indexing.
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

function calculateNextRun() {
  const now = new Date();
  const nextRun = new Date();
  nextRun.setHours(now.getHours() + 1, 15, 0, 0); //We set the next run time to the next hour + 15 minutes to not interfere with the E-Commerce Website fetching the XML Catalog, assuming it does that at exactly every hour.
  if (nextRun < now) { //If the calculated time is in the past, we schedule it for the next hour.
    nextRun.setHours(now.getHours() + 2, 15, 0, 0);
  }
  return { nextRun, delay: nextRun - now }; // Here we return the next run time and the delay in milliseconds.
}

async function scheduleNextRun() {
  const { nextRun, delay } = calculateNextRun();
  setTimeout(async () => {
    await loadJSONCatalog(); // Adjusted to load JSON Catalog
    // await fetchAndParseXML(); // This line is replaced with the JSON loading function
    scheduleNextRun(); // Schedule the next run
  }, delay);
}

async function main() {
  console.log('Algolia Feed Syndication Script initialized');
  await loadJSONCatalog(); // Immediately load and send the ProductCatalog.json to Algolia at script start instead of utilizing scheduling like in clients version
  // setupKafkaConsumer(); // Kafka setup is now commented out because we can't fully recreate the entire Product Catalog (Expected Algolia Payload) for the Algolia Indexing out of XML and Kafka Message. So I decided against a local kafka instance.
  scheduleNextRun(); // This remains to manage the scheduling but will not involve Kafka or XML fetching.
}

main().catch(err => console.error(err));

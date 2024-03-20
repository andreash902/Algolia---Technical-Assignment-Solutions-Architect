import { defineNuxtPlugin } from '#app';
import algoliasearch from 'algoliasearch/lite';
import aa from 'search-insights';


export default defineNuxtPlugin(nuxtApp => {
  const searchClient = algoliasearch('XIBNVPFIEF', 'eaf96fe775c360d419386c13db96480b');

  // Generate a unique token for this page visit
  const userToken = `user_${Date.now()}`;

  // Initialize Algolia Insights with the dynamically generated userToken
  aa('init', {
    appId: 'XIBNVPFIEF',
    apiKey: 'eaf96fe775c360d419386c13db96480b',
    userToken: userToken
  });

  // Method to send events
  const sendEvent = (eventType, item, eventName, queryID) => {
    // Logging to ensure sendEvent is being called and to inspect arguments
    console.log('Sending event:', eventType, item, eventName, queryID);
    
    // Log the payload
    const payload = {
      index: 'ProductCatalog',
      eventName,
      objectIDs: [item.objectID],
      queryID: queryID,
    };
    console.log('Payload:', payload);
  
    // Send the event to Algolia Insights
    aa(eventType, payload);
  };
  


  nuxtApp.provide('sendEvent', sendEvent);
});

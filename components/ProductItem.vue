<template>
    <div class="aa-ItemWrapper">
      <div class="aa-ItemContent">
        <div class="aa-ItemIcon aa-ItemIcon--picture aa-ItemIcon--alignTop">
          <img :src="item.image" :alt="item.name" width="40" height="40" />
        </div>
        <div class="aa-ItemContentBody">
          <div class="aa-ItemContentTitle">
            {{ item.name }}
          </div>
          <div class="aa-ItemContentDescription">
            By <strong>{{ item.brand }}</strong> in
            <strong>{{ item.categories[0] }}</strong>
          </div>
        </div>
      </div>
      <div class="aa-ItemActions">
        <!-- Action buttons like 'Add to cart' can be added here -->
      </div>
    </div>
  </template>
  
  <script>
  
import { onMounted, ref } from 'vue';
import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';

  export default {
    props: {
      item: Object,
    },
  };
  </script>
  
  <style scoped>
  /* Style your product item here */
  .aa-ItemWrapper {
    /* Example styling; adjust as needed */
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  .aa-ItemContentBody {
    margin-left: 10px;
  }
  .aa-ItemContentTitle {
    font-weight: bold;
  }
  .aa-ItemContentDescription {
    font-size: 0.9em;
  }
  </style>
  
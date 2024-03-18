<template>
    <div v-if="visible && results.length > 0" class="autocomplete-overlay">
      <ul>
        <li v-for="result in results" :key="result.objectID">
          {{ result.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      results: Array,
      visible: Boolean,
    },
  }
  </script>
  
  <style scoped>
  .autocomplete-overlay {
   color: black;
   background-color: green;
   font-size: 50;
  }
  </style>
  
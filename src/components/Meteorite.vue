<template>
    <div class="meteorite">
      <p>Name: {{ meteorite.name }}</p>
      <p>Monnig Number: {{ meteorite.monnigNumber }}</p>
      <p>Country: {{ meteorite.country }}</p>
      <p>Group: {{ meteorite.group }}</p>
      <p>Year Found: {{ meteorite.yearFound }}</p>
      <p>Weight: {{ meteorite.weight }}</p>
      </div>
  </template>
  
  <script>
  export default {
    props: {
      meteorite: Object, // Define the expected prop type
    },
  };
  </script>
  
  <style scoped>
    .meteorite {
      border: 1px solid white;
      padding: 10px; /* Add some padding for readability */
    }
  </style>
  
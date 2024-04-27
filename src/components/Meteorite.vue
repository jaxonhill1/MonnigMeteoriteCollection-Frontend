<template>
    <div class="meteorite">
      <h3>{{ meteoriteData.name }}</h3>
      <p>ID: {{ meteoriteData.id }}</p>
      </div>
  </template>
  
  <script>
  export default {
    props: {
      meteoriteData: Object,
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  
  
<template>
    <div v-if="meteorite" class="single-meteorite">
      <h2>{{ meteorite.name }}</h2>
      <h3>{{ meteorite.monnigNumber }}</h3>
      <p>{{ meteorite.yearFound }}, {{ meteorite.country }}</p>
      <p>.</p>
      <p>Class: {{ meteorite._class }}</p>
      <p>Group: {{ meteorite.group }}</p>
      <p>Weight: {{ meteorite.weight }}</p>
      <p>Find or Fall: {{ meteorite.howFound }}</p>
      
      </div>
    <div v-else>
      Loading meteorite details...
    </div>
  </template>
  
  <script>
  import { apiBaseUrl } from '../config';
  import axios from 'axios';

  export default {
    data() {
      return {
        meteorite: {},
        isLoading: false,
        error: null,
      };
    },
    created() {
      // Access meteorite ID from route parameters
      const meteoriteId = this.$route.params.id;
      this.fetchMeteoriteData(meteoriteId);
    },
    methods: {
      async fetchMeteoriteData(meteoriteId) {
        this.isLoading = true;
        this.error = null;
        try {
          const response = await axios.get(apiBaseUrl + `/meteorites/${meteoriteId}`);
          this.meteorite = response.data.data;
        } catch (error) {
          this.error = 'Failed to fetch details.';
          console.error('Error fetching meteorite details:', error);
        } finally {
          this.isLoading = false;
        }
      },
    },
  };
</script>
  
  <style scoped>
  
  </style>
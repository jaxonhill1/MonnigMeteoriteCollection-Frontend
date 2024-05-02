<template>
  <div class="title">
    <h1>Meteorites</h1>
    <p>Click on a meteorite's name to see its details.</p>
    <p>You can search by name, Monnig number, country, year found, or weight.</p>
    <br>
    <h2>Search</h2>
    <SearchMeteorites />
  </div>
  <div class="meteorite-page">
    <div v-if="isLoading">
      Loading meteorites...
    </div>
    <div class="meteorite-grid" v-else-if="filteredMeteorites.length">
      <Meteorite v-for="meteorite in filteredMeteorites" :key="meteorite.id" :meteorite-data="meteorite" />
    </div>
    <div v-else>
      No meteorites found!
    </div>
  </div>
</template>

<script>
import Meteorite from './Meteorite.vue';
import SearchMeteorites from './SearchMeteorites.vue'; // Import the SearchMeteorites component
import axios from 'axios';
import { apiBaseUrl } from '../config';
import _ from 'lodash';

export default {
  components: {
    Meteorite,
    SearchMeteorites // Register the SearchMeteorites component
  },
  data() {
    return {
      meteorites: [],
      isLoading: false,
      searchTerm: '',
    };
  },
  async mounted() {
    this.isLoading = true;
    try {
      const response = await axios.get(apiBaseUrl + '/meteorites');
      this.meteorites = response.data.content;
    } catch (error) {
      console.error('Error fetching meteorites:', error);
    } finally {
      this.isLoading = false; // Set loading to false even on errors
    }
  },
  computed: {
    filteredMeteorites() {
      return this.meteorites.filter(meteorite => {
        const searchTermLower = this.searchTerm.toLowerCase();
        return (
          meteorite.name.toLowerCase().includes(searchTermLower) || 
          meteorite.monnigNumber.toLowerCase().includes(searchTermLower) ||
          meteorite.country.toLowerCase().includes(searchTermLower) ||
          String(meteorite.yearFound).toLowerCase().includes(searchTermLower) ||
          String(meteorite.weight).toLowerCase().includes(searchTermLower)
        );
      });
    },
  },
};
</script>

<style scoped>
.title {
  padding-top: 70px;
}
.meteorite-page {
  padding: 2rem 0; /* Top and bottom padding */
  display: flex;
  flex-direction: column;
  height: 100vh; /* Make the page fill the viewport height */
  overflow-y: auto; /* Enable vertical scrolling */
}

.meteorite-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 0; /* Remove default gap */
}
</style>

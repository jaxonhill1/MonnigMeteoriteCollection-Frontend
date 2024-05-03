<template>
  <div class="title">
    <h1>Meteorites</h1>
    <p>You can search by name, Monnig number, country, year found, or weight.</p>
    <p>Click search with no input to Find All Meteorites</p>
    <p>Click on a meteorite's name to see its details.</p>
    <br>
    <h2>Search</h2>
    <SearchMeteorites />
    <h1>Add New Meteorite</h1>
    <NewMeteoriteForm />

  </div>
  
</template>

<script>
import Meteorite from './MeteoriteDetails.vue';
import SearchMeteorites from './SearchMeteorites.vue';
import NewMeteoriteForm from './NewMeteoriteForm.vue';
import axios from 'axios';
import { apiBaseUrl } from '../config';

export default {
  components: {
    Meteorite,
    SearchMeteorites,
    NewMeteoriteForm
  },
  data() {
    return {
      meteorites: [],
      isLoading: false,
      searchTerm: '',
    };
  },
  methods: {
    showAllMeteorites() {
      this.searchTerm = ''; // Reset the search term
    }
  },
  async mounted() {
    this.isLoading = true;
    try {
      const response = await axios.get(apiBaseUrl + '/meteorites');
      this.meteorites = response.data.data.content;
    } catch (error) {
      console.error('Error fetching meteorites:', error);
    } finally {
      this.isLoading = false;
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

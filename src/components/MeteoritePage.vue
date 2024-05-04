<template>
  <div class="container mt-4">
    <div class="mb-4">
      <h1>Meteorites</h1>
      <p>You can search by name, Monnig number, country, year found, or weight.</p>
      <p>Click search with no input to find all meteorites.</p>
      <p>Click on a meteorite's name to see its details.</p>
    </div>

    <div class="mt-2 mb-2">
      <h2>Search Meteorite</h2>
      <RouterLink to="/meteorites/search">
        <button type="button" class="btn btn-outline-light">Search Meteorite</button>
      </RouterLink>
    </div>
    
    <div class="mt-2 mb-2">
      <h2>Add New Meteorite</h2>
      <RouterLink to="/meteorites/add">
        <button type="button" class="btn btn-outline-light">Add a meteorite</button>
      </RouterLink>

      <div class="mt-2 mb-2">
      <h2>Edit a Meteorite</h2>
      <RouterLink to="/meteorites/edit">
        <button type="button" class="btn btn-outline-light">Edit a meteorite</button>
      </RouterLink>
    </div>
    </div>
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

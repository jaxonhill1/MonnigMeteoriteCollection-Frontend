<template>
  <div class="meteorite-page">
    <div v-if="isLoading">
      Loading meteorites...
    </div>
    <div class="meteorite-grid" v-else-if="meteorites.length">
      </div>
    <div v-else>
      No meteorites found!
    </div>
  </div>
</template>

<script>
import Meteorite from './Meteorite.vue';
import axios from 'axios';
import { apiBaseUrl } from '../config';

export default {
  components: {
    Meteorite,
  },
  data() {
    return {
      meteorites: [],
      isLoading: false,
    };
  },
  async mounted() {
    this.isLoading = true;
    try {
      const response = await axios.get(apiBaseUrl + '/meteorites');
      this.meteorites = response.data.map(dto => ({
        id: dto.id,
        name: dto.name,
        monnigNumber: dto.monnigNumber,
        country: dto.country,
        group: dto.group,
        yearFound: dto.yearFound,
        weight: dto.weight.toString(),
        // ... add other properties as needed
      }));
    } catch (error) {
      console.error('Error fetching meteorites:', error);
    } finally {
      this.isLoading = false; // Set loading to false even on errors
    }
  },
  computed: {
    getMeteoriteRows() {
      const rows = [];
      for (let i = 0; i < this.meteorites.length; i += 3) {
        rows.push(this.meteorites.slice(i, i + 3));
      }
      return rows;
    },
  },
  methods: {
    goToDetails(meteoriteId) {
      // Implement your router navigation logic here
      this.$router.push(`/meteorites/${meteoriteId}`);
    },
  },
};
</script>

<style scoped>
.meteorite-page {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Make the page fill the viewport height */
  overflow-y: auto; /* Enable vertical scrolling */
}

.meteorite-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px; /* Add spacing between meteorites */
}

.meteorite-row {
  display: flex;
  flex-wrap: wrap; /* Allow rows to wrap if necessary */
}

.meteorite {
    border: 1px solid white;
  }
</style>

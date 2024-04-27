<template>
  <div class="title">
    <h1>Meteorites</h1>
    <p>Click on a meteorite's name to see its details.</p>
    <p>You can search by name, Monnig number, country, year found, or weight.</p>
    <br>
    <p>Search</p>
    <!-- <input type="text" v-model="searchTerm" placeholder="Search meteorites..." @keyup.enter="searchMeteorites"/> -->
    <input type="text" v-model="searchTerm" placeholder="Enter criteria..."/>
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
import axios from 'axios';
import { apiBaseUrl } from '../config';
import _ from 'lodash';

export default {
  components: {
    Meteorite,
  },
  data() {
    return {
      meteorites: [],
      isLoading: false,
      sortField: 'id',  // default sort field
      searchTerm: '',
    };
  },
  async mounted() {
    this.isLoading = true;
    try {
      const response = await axios.get(apiBaseUrl + '/meteorites');
      this.meteorites = response.data.data.map(dto => ({
        id: dto.id,                           // id

        name: dto.name,                       // name
        monnigNumber: dto.monnigNumber,       // monnig number
        country: dto.country,                 // country
        class: dto.class,                     // class
        group: dto.group,                     // group
        yearFound: dto.yearFound,             // yearFound
        weight: dto.weight.toString(),        // weight

        howFound: dto.howFound,               // howFound
        sampleHistories: dto.sampleHistories, // sampleHistories is a List<Long>
        loanId: dto.loan,                     // loanId of associated loan
      }));
    } catch (error) {
      console.error('Error fetching meteorites:', error);
    } finally {
      this.isLoading = false; // Set loading to false even on errors
    }
  },
  computed: {
    filteredMeteorites() {
      return this.meteorites.filter(meteorite => {
        // Perform search based on user input (searchTerm)
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
    getMeteoriteRows() {
      const rows = [];
      for (let i = 0; i < this.filteredMeteorites.length; i += 3) {
        rows.push(this.meteorites.slice(i, i + 3));
      }
      return rows;
    },
  },
  methods: {
    
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

.meteorite-row {
  display: flex;
  flex-wrap: wrap; /* Allow rows to wrap if necessary */
}

.meteorite {
  margin: 0; /* Remove default margin */
  padding: 5px; /* Add minimal padding if desired */
  border: 1px solid white;
}

</style>


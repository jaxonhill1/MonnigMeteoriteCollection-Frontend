<template>
  <div>
    <input v-model="searchCriteria.name" @keyup.enter="searchMeteorites" placeholder="Search by name (contains)" type="text" class="search-input" />
    <input v-model="searchCriteria.monnigNumber" @keyup.enter="searchMeteorites" placeholder="Search by Monnig number (exact)" type="text" class="search-input" />
    <input v-model="searchCriteria.country" @keyup.enter="searchMeteorites" placeholder="Search by country (contains)" type="text" class="search-input" />
    <input v-model="searchCriteria._class" @keyup.enter="searchMeteorites" placeholder="Search by class (contains)" type="text" class="search-input" />
    <input v-model="searchCriteria._group" @keyup.enter="searchMeteorites" placeholder="Search by group (contains)" type="text" class="search-input" />
    <input v-model="searchCriteria.howFound" @keyup.enter="searchMeteorites" placeholder="Search by howFound (exact)" type="text" class="search-input" />
    <button @click="searchMeteorites">Search</button>
    <button @click="clearSearch">Clear</button> <!-- Clear Button -->

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">Error: {{ error }}</div>
    
    <ul v-if="results.length > 0">
      <li style="font-weight: 700; color: aqua;">Name - Country - MonnigNumber - Class - Group - HowFound</li>
      <li v-for="result in results" :key="result.id" @click="viewDetails(result.id)" class="clickable">
        {{ result.name }} - {{ result.country }} - {{ result.monnigNumber }} - {{ result._class }} - {{ result.group }} - {{ result.howFound }}
      </li>
    </ul>
    <div v-else>No results found</div>
  </div>
</template>

  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        searchCriteria: {
          name: '',
          monnigNumber: '',
          country: '',
          _class: '',
          _group: '',
          howFound: ''
        },
        results: [],
        loading: false,
        error: null
      };
    },

    methods: {
  searchMeteorites() {
    this.loading = true;
    this.error = null;
    // Setting up the search criteria based on your component's data structure
    const searchCriteria = {
      name: this.searchCriteria.name,
      monnigNumber: this.searchCriteria.monnigNumber,
      country: this.searchCriteria.country,
      _class: this.searchCriteria._class,
      _group: this.searchCriteria._group,
      howFound: this.searchCriteria.howFound
    };
    
    axios.post(`http://localhost:8080/api/v1/meteorites/search`, searchCriteria, {
      params: {
        // If you have pagination parameters, they can be passed here
        page: 0,
        size: 10,
        sort: 'name,asc'  // Example sorting parameter
      }
    })
    .then(response => {
      // Assuming response data is in the expected format
      this.results = response.data.data.content;
      this.loading = false;
    })
    .catch(error => {
      this.error = 'Failed to fetch results: ' + error.message;
      this.loading = false;
      this.results = [];
    });
  },
  clearSearch() {
    this.searchCriteria = {
          name: '',
          monnigNumber: '',
          country: '',
          _class: '',
          _group: '',
          howFound: ''
    };  // Clear search input
    this.results = [];      // Clear search results
  },
  viewDetails(id) {
      this.$router.push({ name: 'MeteoriteDetails', params: { id: id } });
    }
}



  }
  </script>
  
  <style scoped>
  .clickable {
    cursor: pointer;
    margin-bottom: 5px;
    transition: background-color 0.3s ease;
  }

  .clickable:hover {
    background-color: #1f0202;  
  }

  .search-input {
    margin-right: 10px;
    padding: 8px;
    width: 200px;
  }
  
  .loading,
  .error {
    margin-top: 10px;
  }
  
  ul {
    margin-top: 20px;
  }
  
  li {
    list-style: none;
    margin-bottom: 5px;
  }
  </style>
  
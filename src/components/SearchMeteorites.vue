<template>
  
  <div class="container py-4">
      <p>You can search by name, Monnig number, country, year found, or weight.</p>
      <p>Click search with no input to find all meteorites.</p>
      <p>Click on a meteorite's name to see its details.</p>
    <div class="row g-3 mb-1">
      
      <div class="col-md-6">
        <input v-model="searchCriteria.name" @keyup.enter="searchMeteorites" placeholder="Search by name (contains)" type="text" class="form-control" />
      </div>
      <div class="col-md-6">
        <input v-model="searchCriteria.monnigNumber" @keyup.enter="searchMeteorites" placeholder="Search by Monnig number (exact)" type="text" class="form-control" />
      </div>
      <div class="col-md-6">
        <input v-model="searchCriteria.country" @keyup.enter="searchMeteorites" placeholder="Search by country (contains)" type="text" class="form-control" />
      </div>
      <div class="col-md-6">
        <input v-model="searchCriteria._class" @keyup.enter="searchMeteorites" placeholder="Search by class (contains)" type="text" class="form-control" />
      </div>
      <div class="col-md-6">
        <input v-model="searchCriteria._group" @keyup.enter="searchMeteorites" placeholder="Search by group (contains)" type="text" class="form-control" />
      </div>
      <div class="col-md-6">
        <input v-model="searchCriteria.howFound" @keyup.enter="searchMeteorites" placeholder="Search by howFound (exact)" type="text" class="form-control" />
      </div>
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-3">
      <button class="btn btn-outline-light" @click="searchMeteorites">Search</button>
      <button class="btn btn-outline-danger" @click="clearSearch">Clear</button>
    </div>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="alert alert-danger">Error: {{ error }}</div>
    
    <ul class="list-group" v-if="results.length > 0">
      <li class="list-group-item active">Name - Country - MonnigNumber - Class - Group - HowFound</li>
      <li v-for="result in results" :key="result.id" @click="viewDetails(result.id)" class="list-group-item list-group-item-action clickable">
        {{ result.name }} - {{ result.country }} - {{ result.monnigNumber }} - {{ result._class }} - {{ result.group }} - {{ result.howFound }}
      </li>
    </ul>
    <div v-else class="alert alert-info">No results found</div>
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
  .container {
  margin-top: 5rem; /* Adjust top margin to ensure visibility of the content below the header */
    }

  .clickable {
    cursor: pointer;
    margin-bottom: 5px;
    transition: background-color 0.3s ease;
  }

  .clickable:hover {
    background-color: #d9d2d2;  
  }

  .search-input {
    margin-right: 10px;
    padding: 8px;
    width: 200px;
  }
  
  ul {
    margin-top: 20px;
  }
  
  
  </style>
  
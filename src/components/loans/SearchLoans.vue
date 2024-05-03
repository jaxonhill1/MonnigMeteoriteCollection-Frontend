<template>
    <div>
        <input v-model="searchCriteria.name" @keyup.enter="searchLoans" placeholder="Search by name (contains)" type="text" class="search-input" />
        <input v-model="searchCriteria.institution" @keyup.enter="searchLoans" placeholder="Search by institution (exact)" type="text" class="search-input" />
        <input v-model="searchCriteria.email" @keyup.enter="searchLoans" placeholder="Search by email (contains)" type="text" class="search-input" />
        <input v-model="searchCriteria.phone" @keyup.enter="searchLoans" placeholder="Search by phone (contains)" type="text" class="search-input" />
        <input v-model="searchCriteria.address" @keyup.enter="searchLoans" placeholder="Search by address (contains)" type="text" class="search-input" />
        <br>
        <br>
        <button @click="searchLoans">Search</button>
        <button @click="clearSearch">Clear</button> <!-- Clear Button -->
    
        <br>
    
        <div v-if="loading" class="loading">Loading...</div>
        <div v-if="error" class="error">Error: {{ error }}</div>
        
        <br>

        <ul v-if="results.length > 0">
            <li style="font-weight: 700; color: aqua;">Name - Institution - Address</li>
            <li v-for="result in results" :key="result.id" @click="viewDetails(result.id)" class="clickable">
            {{ result.name }} - {{ result.institution }} - {{ result.address }}
            </li>
        </ul>
        <div v-else>No results found</div>
    </div>

  </template>
  
    
    <script>
    import axios from 'axios';
    import { apiBaseUrl } from '../../config';
    
    export default {
      data() {
        return {
          searchCriteria: {
            name: '',
            institution: '',
            email: '',
            phone: '',
            address: '',
            isArchived: ''
          },
          results: [],
          loading: false,
          error: null,
          searchFlag: false,
        };
      },

      // pull ALL loans upon mounting
      mounted() {
        this.searchLoans();
      },
  
      methods: {
        async searchLoans() {
            this.searchFlag = true;   // flag that the user has tried to search
            this.loading = true;
            this.error = null;
            // Setting up the search criteria
            const searchCriteria = {
                name: this.searchCriteria.name,
                institution: this.searchCriteria.institution,
                email: this.searchCriteria.email,
                phone: this.searchCriteria.phone,
                address: this.searchCriteria.address,
                isArchived: this.searchCriteria.isArchived
            };
            
            axios.post(apiBaseUrl + `/loans/search`, searchCriteria, {
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
            this.searchFlag = false;  // flag that the user has cleared search
            this.searchCriteria = {
                    name: '',
                    institution: '',
                    email: '',
                    phone: '',
                    address: '',
                    isArchived: ''
            };  // Clear search input
            this.results = [];      // Clear search results
            this.searchLoans();     // call another search with empty criteria, to GET all loans
        },

        viewDetails(id) {
            this.$router.push({ name: 'LoanDetails', params: { id: id } });
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
    
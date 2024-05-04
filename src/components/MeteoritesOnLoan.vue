<template>
    <div class="title">
        <RouterLink :to="`/loans/${loanId}`"> Go Back</RouterLink>
        <h1>Meteorites on Loan {{ loanId }}</h1>
        <p>View all meteorites associated with this loan below.</p>
        <br>
        <br>
    
            <h3 style="font-weight: 700; color: plum;">Name - Country - MonnigNumber - Class - Group - HowFound</h3>
            <li v-for="meteorite in meteorites" :key="meteorite.id" @click="viewDetails(meteorite.id)" class="clickable">
                {{ meteorite.name }} - {{ meteorite.country }} - {{ meteorite.monnigNumber }} - {{ meteorite._class }} - {{ meteorite.group }} - {{ meteorite.howFound }}
            </li>
  
    </div>
    
  </template>
  
  <script>
  import Meteorite from './MeteoriteDetails.vue';
  import axios from 'axios';
  import { apiBaseUrl } from '../config';
  
  export default {
    components: {
      Meteorite,
    },
    data() {
      return {
        meteorites: [],
        loanId: '',
      };
    },
    methods: {
        viewDetails(id) {
            this.$router.push({ name: 'MeteoriteDetails', params: { id: id } });
        },
        goBack() {
            this.$router.back();
        }
    },
    async mounted() {
        // grab loan id from route params
        this.loanId = this.$route.params.loanid;
        this.isLoading = true;
        try {
            const response = await axios.get(apiBaseUrl + '/meteorites/onloan/' + this.loanId)
                .then(response => {
                    this.meteorites = response.data.data;
                });
        } catch (error) {
            console.error('Error fetching meteorites:', error);
        } finally {
            this.isLoading = false;
        }
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

  .clickable {
    cursor: pointer;
    margin-bottom: 5px;
    margin-left: 20px;
    transition: background-color 0.3s ease;
  }

  .clickable:hover {
    background-color: #5007c4;  
  }
  </style>
  
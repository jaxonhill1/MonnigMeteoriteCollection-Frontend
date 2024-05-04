<template>
    <div class="title">
      <h3 style="font-weight: 700; color: white;">Sample History</h3>
      <RouterLink :to="`/histories/create/${meteorite}`">Add History</RouterLink>
      <p style="color: plum;">Date - Category - Notes</p>
      <li v-for="history in sampleHistoryList" :key="history.id">
          {{ history.date }} - {{ history.category }} - {{ history.notes }} - <button @click="deleteHistory(history.id)">Delete</button>
      </li>
    </div>
    
  </template>
  
  <script setup>
    import { defineProps } from 'vue';
    // allow meteoriteId to be passed from parent component
    const props = defineProps({
      meteorite: {
          required: true
      }
    });
  </script>


  <script>
  import axios from 'axios';
  import { apiBaseUrl } from '../config';

  export default {
    data() {
      return {
        props: {
          meteorite: {
            required: true
          }
        },
        sampleHistoryList: [],
      };
    },
    methods: {
      async deleteHistory(historyId) {
        try {
          const response = await axios.delete(apiBaseUrl + '/histories/' + historyId)
            .then(response => {
              // perform another GET to grab the updated history list
              this.fetchHistory();
              alert("History deleted!");
            });
        } catch (error) {
          console.error("Error deleting history.", error);
        }
      },
      async fetchHistory() {
        this.isLoading = true;
        try {
            const response = await axios.get(apiBaseUrl + '/histories/mid/' + this.meteorite)
                .then(response => {
                    this.sampleHistoryList = response.data.data;
                });
        } catch (error) {
            console.error('Error fetching histories:', error);
        } finally {
            this.isLoading = false;
        }
      }
    },
    async mounted() {
      this.fetchHistory();
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
  
<template>
    <div class="title">
      <p style="font-weight: 700; color: plum;">Date - Category - Notes</p>
      <li v-for="history in sampleHistoryList" :key="history.meteorite">
          {{ history.date }} - {{ history.category }} - {{ history.notes }}
      </li>
    </div>
    
  </template>
  
  <script setup>
    import { defineProps } from 'vue';
    // allow meteoriteId to be passed from parent component
    const props = defineProps({
      meteoriteId: {
          type: String,
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
          meteoriteId: {
            type: String,
            required: true
          }
        },
        sampleHistoryList: [],
      };
    },
    async mounted() {

      this.isLoading = true;
      try {
          const response = await axios.get(apiBaseUrl + '/histories/mid/' + this.meteoriteId)
              .then(response => {
                  this.sampleHistoryList = response.data.data;
              });
      } catch (error) {
          console.error('Error fetching histories:', error);
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
  
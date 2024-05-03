<template>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input id="name" v-model="newMeteorite.name" type="text" required>
      </div>
      <div>
        <label for="monnigNumber">Monnig Number:</label>
        <input id="monnigNumber" v-model="newMeteorite.monnigNumber" type="text" required>
      </div>
      <div>
        <label for="country">Country:</label>
        <input id="country" v-model="newMeteorite.country" type="text" required>
      </div>
      <div>
        <label for="yearFound">Year Found:</label>
        <input id="yearFound" v-model="newMeteorite.yearFound" type="number" required>
      </div>
      <div>
        <label for="weight">Weight:</label>
        <input id="weight" v-model="newMeteorite.weight" type="number" required>
      </div>
      <!-- Add additional fields as needed -->
      <button type="submit">Add Meteorite</button>
    </form>
  </template>
  
  <script>
  import axios from 'axios';
  import { apiBaseUrl } from '../config';
  
  export default {
    data() {
      return {
        newMeteorite: {
          name: '',
          monnigNumber: '',
          country: '',
          yearFound: 0,
          weight: 0,
        }
      };
    },
    methods: {
      async submitForm() {
        try {
          const response = await axios.post(`${apiBaseUrl}/meteorites`, this.newMeteorite);
          alert('Meteorite added successfully!');
          // Clear the form
          this.newMeteorite = { name: '', monnigNumber: '', country: '', yearFound: 0, weight: 0 };
        } catch (error) {
          console.error('Failed to add meteorite:', error);
          alert('Failed to add meteorite.');
        }
      }
    }
  };
  </script>
  
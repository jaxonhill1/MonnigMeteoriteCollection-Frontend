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
        <label for="class">Class:</label>
        <input id="class" v-model="newMeteorite._class" type="text" required>
      </div>
      <div>
        <label for="group">Group:</label>
        <input id="group" v-model="newMeteorite.group" type="text" required>
      </div>
      <div>
        <label for="yearFound">Year Found:</label>
        <input id="yearFound" v-model="newMeteorite.yearFound" type="number" required>
      </div>
      <div>
        <label for="weight">Weight:</label>
        <input id="weight" v-model="newMeteorite.weight" type="number" step="0.01" required>
      </div>
      <div>
        <label for="howFound">How Found:</label>
        <input id="howFound" v-model="newMeteorite.howFound" type="text" step="0.01" required>
      </div>
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
          _class: '',
          group: '',
          yearFound: null,
          weight: null,
          howFound: '',
          sampleHistories: [],
          loan: null
        }
      };
    },
    methods: {
      async submitForm() {
    const token = localStorage.getItem('authToken');
    const headers = {
        Authorization: `Bearer ${token}`
    };
    console.log('Data being sent:', JSON.stringify(this.newMeteorite));

    try {
        const response = await axios.post(`${apiBaseUrl}/meteorites`, this.newMeteorite, { headers });
        console.log('Response:', response);
        alert('Meteorite added successfully!');
        this.resetForm();
    } catch (error) {
        console.error('Failed to add meteorite:', error);
        if (error.response) {
            alert(`Failed to add meteorite: ${error.response.data.message}`);
        } else {
            alert('Failed to add meteorite. Please check the console for more details.');
        }
    }
}
,
      resetForm() {
        this.newMeteorite = {
          name: '',
          monnigNumber: '',
          country: '',
          _class: '',
          group: '',
          yearFound: null,
          weight: null,
          howFound: '',
          sampleHistories: [],
          loan: null
        };
      }
    }
  };
  </script>
  
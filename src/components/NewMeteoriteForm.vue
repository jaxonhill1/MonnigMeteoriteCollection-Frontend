<template>
  <div class="container mt-5">
    <form @submit.prevent="submitForm" class="row g-3">
      <div class="col-md-6">
        <label for="name" class="form-label">Name:</label>
        <input id="name" v-model="newMeteorite.name" type="text" class="form-control" required>
      </div>
      <div class="col-md-6">
        <label for="monnigNumber" class="form-label">Monnig Number:</label>
        <input id="monnigNumber" v-model="newMeteorite.monnigNumber" type="text" class="form-control" required>
      </div>
      <div class="col-md-6">
        <label for="country" class="form-label">Country:</label>
        <input id="country" v-model="newMeteorite.country" type="text" class="form-control" required>
      </div>
      <div class="col-md-6">
        <label for="class" class="form-label">Class:</label>
        <input id="class" v-model="newMeteorite._class" type="text" class="form-control" required>
      </div>
      <div class="col-md-6">
        <label for="group" class="form-label">Group:</label>
        <input id="group" v-model="newMeteorite.group" type="text" class="form-control" required>
      </div>
      <div class="col-md-6">
        <label for="yearFound" class="form-label">Year Found:</label>
        <input id="yearFound" v-model="newMeteorite.yearFound" type="number" class="form-control" required>
      </div>
      <div class="col-md-6">
        <label for="weight" class="form-label">Weight:</label>
        <input id="weight" v-model="newMeteorite.weight" type="number" class="form-control" step="0.01" required>
      </div>
      <div class="col-md-6">
        <label for="howFound" class="form-label">How Found:</label>
        <input id="howFound" v-model="newMeteorite.howFound" type="text" class="form-control" required>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-outline-light">Add Meteorite</button>
      </div>
    </form>
  </div>
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
  
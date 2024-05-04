<template>
    <div class="container mt-3">
      <h2>Edit Meteorite Sample</h2>
      <form @submit.prevent="submitChanges">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" id="name" v-model="meteorite.name">
        </div>
        <div class="mb-3">
          <label for="monnigNumber" class="form-label">Monnig Number</label>
          <input type="text" class="form-control" id="monnigNumber" v-model="meteorite.monnigNumber">
        </div>
        <!-- Add other fields as necessary -->
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </form>
      <div v-if="warning" class="alert alert-warning mt-3">
        {{ warning }}
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  data() {
    return {
      meteorite: {},
      warning: null
    };
  },
  methods: {
    fetchMeteoriteDetails() {
      axios.get(`http://localhost:8080/api/v1/meteorites/${this.$route.params.id}`)
        .then(response => {
          this.meteorite = response.data.data; // Assuming the response data structure matches
        })
        .catch(error => {
          console.error('Error fetching meteorite details:', error);
          this.warning = 'Failed to load meteorite details.';
        });
    },
    submitChanges() {
      axios.put(`http://localhost:8080/api/v1/meteorites/${this.$route.params.id}`, this.meteorite)
        .then(response => {
          this.warning = 'Update Success';
          // Optionally redirect or fetch the meteorite details again to refresh the data
        })
        .catch(error => {
          console.error('Error updating meteorite details:', error);
          this.warning = 'Failed to update details. Please check the input.';
        });
    },
    formatLabel(key) {
      // Capitalize and format the label from the key
      return key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    },
    inputType(key) {
      // Determine the input type based on the data key
      return key === 'yearFound' || key === 'weight' ? 'number' : 'text';
    }
  },
  mounted() {
    this.fetchMeteoriteDetails();
  }
};
</script>
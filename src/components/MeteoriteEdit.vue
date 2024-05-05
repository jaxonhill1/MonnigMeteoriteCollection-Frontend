<template>
  <div class="container mt-3">
    <h2>Edit Meteorite Sample</h2>
    <form @submit.prevent="submitChanges" class="row g-2">
      <!-- Iterate over fields and use Bootstrap grid to manage layout -->
      <div v-for="(value, key) in meteorite" :key="key" class="col-md-4">
        <label :for="key" class="form-label">{{ formatLabel(key) }}</label>
        <input :id="key"
               v-model="meteorite[key]"
               :type="inputType(key)"
               :step="key === 'weight' ? '0.001' : '1'"
               class="form-control">
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-outline-light">Save Changes</button>
      </div>
    </form>
    <div v-if="warning" class="alert alert-warning mt-3">
      {{ warning }}
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import { ref } from 'vue';
import MeteoriteDetailsVue from './MeteoriteDetails.vue';

export default {
  data() {
    return {
      meteorite: {},
      warning: null
    };
  },
  methods: {
    inputType(key) {
    // Determine the input type based on the data key
    if (key === 'yearFound') {
      return 'number'; // Integer is fine for years
    } else if (key === 'weight') {
      return 'number'; // Specify that this input should allow decimal values
    } else {
      return 'text'; // Default type for other inputs
    }
  },
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

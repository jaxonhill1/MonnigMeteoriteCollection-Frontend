<template>
  <div v-if="isLoading">
    Loading details...
  </div>
  <div v-else-if="error">
    Error: {{ error }}
  </div>
  <div v-else class="meteorite-details">
    <h1>{{ meteorite.name }}</h1>
    <p><span style="color: aqua;">Monnig Number:</span> {{ meteorite.monnigNumber }}</p>
    <p><span style="color: aqua;">Country:</span> {{ meteorite.country }}</p>
    <p><span style="color: aqua;">Year Found:</span> {{ meteorite.yearFound }}</p>
    <p><span style="color: aqua;">Weight:</span> {{ meteorite.weight }} grams</p>
    <p><span style="color: aqua;">Class:</span> {{ meteorite._class }}</p>
    <p><span style="color: aqua;">Group:</span> {{ meteorite.group }}</p>
    <p><span style="color: aqua;">How Found:</span> {{ meteorite.howFound }}</p>
    <p><span style="color: aqua;">Loan:</span> {{ meteorite.loan }}</p>
    <p><span style="color: aqua;">Sample History:</span> {{ meteorite.sampleHistory }}</p>
    <!-- Add more fields as per the associated information -->
  </div>
</template>

<script>
import axios from 'axios';
import { apiBaseUrl } from '../config';

export default {
  data() {
    return {
      meteorite: {},
      isLoading: true,
      error: null
    };
  },
  async mounted() {
    try {
      const response = await axios.get(`${apiBaseUrl}/meteorites/${this.$route.params.id}`);
      this.meteorite = response.data.data;
    } catch (error) {
      this.error = 'Failed to load meteorite details: ' + error.message;
    } finally {
      this.isLoading = false;
    }
  }
};
</script>

<style scoped>
.meteorite-details {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>

<template>
  <div v-if="isLoading">
    Loading details...
  </div>
  <div v-else-if="error">
    Error: {{ error }}
  </div>
  <div v-else class="meteorite-details">
    <div class="details-header">
      <h1>{{ meteorite.name }}</h1>

        <RouterLink :to="`/meteorites/edit/${meteorite.id}`">
          <button type="button" class="btn btn-outline-light">Edit</button>
        </RouterLink>
        <RouterLink :to="`/meteorites/delete/${meteorite.id}`">
          <button type="button" class="btn btn-outline-light">Delete</button>
        </RouterLink>

      
      
    </div>
    <p><span style="color: plum;">Monnig Number:</span> {{ meteorite.monnigNumber }}</p>
    <p><span style="color: plum;">Country:</span> {{ meteorite.country }}</p>
    <p><span style="color: plum;">Year Found:</span> {{ meteorite.yearFound }}</p>
    <p><span style="color: plum;">Weight:</span> {{ meteorite.weight }} grams</p>
    <p><span style="color: plum;">Class:</span> {{ meteorite._class }}</p>
    <p><span style="color: plum;">Group:</span> {{ meteorite.group }}</p>
    <p><span style="color: plum;">How Found:</span> {{ meteorite.howFound }}</p>
    <p><span style="color: plum;">Loan:</span> {{ meteorite.loan }}</p>
    <br>
    <SampleHistory :meteorite="meteorite.id" />
  </div>
</template>

<script>
import axios from 'axios';
import { apiBaseUrl } from '../config';
import SampleHistory from './SampleHistory.vue';

export default {
  components: {
    SampleHistory,
  },
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
  margin: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.details-header {
  display: flex;
  justify-content: space-between; /* Aligns children (h1 and button) on opposite sides */
  align-items: center; /* Aligns children vertically */
}
/* .edit-delete {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
} */

.details-header h1 {
  margin-bottom: 0; /* Removes bottom margin from h1 to align better with button */
}
</style>

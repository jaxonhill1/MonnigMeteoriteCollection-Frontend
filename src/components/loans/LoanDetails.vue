<template>
    <div v-if="isLoading">
      Loading details...
    </div>
    <div v-else-if="error">
      Error: {{ error }}
    </div>
    <div v-else class="loan-details">
      <h1>{{ loan.name }}</h1>
      <p><span style="color: plum;">Loan Name:</span> {{ loan.name }}</p>
      <p><span style="color: plum;">Institution:</span> {{ loan.institution }}</p>
      <p><span style="color: plum;">Institution Address:</span> {{ loan.address }} grams</p>
      <p><span style="color: plum;">Email Associated:</span> {{ loan.email }}</p>
      <p><span style="color: plum;">Phone Associated:</span> {{ loan.phone }}</p>
      <p><span style="color: plum;">Loan Start Date:</span> {{ loan.loanStartDate }}</p>
      <p><span style="color: plum;">Loan End Date:</span> {{ loan.loanEndDate }}</p>
      <p><span style="color: plum;">Archived:</span> {{ loan.isArchived }}</p>
      <br>
      <RouterLink :to="`/loans/update/${loan.id}`">Edit Loan</RouterLink>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { apiBaseUrl } from '../../config';
  
  export default {
    data() {
      return {
        loan: {},
        isLoading: true,
        error: null
      };
    },
    async mounted() {
      try {
        const response = await axios.get(`${apiBaseUrl}/loans/${this.$route.params.id}`);
        this.loan = response.data.data;
      } catch (error) {
        this.error = 'Failed to load loan details: ' + error.message;
      } finally {
        this.isLoading = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .loan-details {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  
<template>
    <RouterLink class="back-button" :to="`/loans`">< Go Back</RouterLink>
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
      <p><span style="color: plum;">Loan End Date:</span> {{ loan.loanDueDate }}</p>
      <p><span style="color: plum;">Archived:</span> {{ loan.isArchived }}</p>
      <br>
      <RouterLink :to="`/loans/update/${loan.id}`">Edit Loan</RouterLink>
      <br>
      <RouterLink :to="`/meteorites/onloan/${loan.id}`">View Meteorites On This Loan</RouterLink>
      <br><br>
      <label>
        Archive This Loan?
        <input type="checkbox" v-model="loan.isArchived" @change="archiveLoanStatusChange">
      </label>
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
    },
    methods: {
      async archiveLoanStatusChange() {

        try {
          const response = await axios.put(apiBaseUrl + '/loans', this.loan);
          console.log('Response:', response.data);
          alert('Archive status changed!');
        } catch (error) {
          console.error('Error archiving the loan:', error);
          alert('Failed to change archive status of the loan.');
        }

        this.$router.push('/loans');
      },
    },
  };
  </script>
  
  <style scoped>
  .loan-details {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  </style>
  
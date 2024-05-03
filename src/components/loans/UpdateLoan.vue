<template>
    <h2>Update Loan</h2>
    <div class="loan-form">
      <form @submit.prevent="submitLoan">
        <label for="name">Name:</label>
        <input id="name" v-model="loan.name" type="text">

        <label for="institution">Institution:</label>
        <input id="institution" v-model="loan.institution" type="text">

        <label for="email">Email:</label>
        <input id="email" v-model="loan.email" type="email">

        <label for="phone">Phone:</label>
        <input id="phone" v-model="loan.phone" type="tel">

        <label for="address">Address:</label>
        <input id="address" v-model="loan.address" type="text">

        <label for="loanStartDate">Loan Start Date:</label>
        <input id="loanStartDate" v-model="loan.loanStartDate" type="date">

        <label for="loanDueDate">Loan Due Date:</label>
        <input id="loanDueDate" v-model="loan.loanDueDate" type="date">

        <label for="notes">Notes:</label>
        <textarea id="notes" v-model="loan.notes"></textarea>

        <label for="extraFiles">Extra Files:</label>
        <input id="extraFiles" v-model="loan.extraFiles" type="text">

        <br><br>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>

<script>
  import { apiBaseUrl } from '@/config';
import axios from 'axios';

  export default {
    data() {
      return {
        loan: {
          id: null,
          name: null,
          institution: null,
          email: null,
          phone: null,
          address: null,
          loanStartDate: null,
          loanDueDate: null,
          isArchived: false,
          meteorites: [],
          notes: null,
          extraFiles: null,
        },
      };
    },
    mounted() {
      this.loan.id = this.$route.params.id;   // set the loan.id, based on URL
    },
    methods: {
      async submitLoan() {
        try {
          const response = await axios.put(apiBaseUrl + '/loans', this.loan);
          console.log('Response:', response.data);
          alert('Loan updated successfully!');
        } catch (error) {
          console.error('Error updating the loan:', error);
          alert('Failed to update loan.');
        }

        this.$router.push({ name: 'LoanDetails', params: { id: this.loan.id } });
      },
    }
  };
</script>

<style>
.loan-form {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px 20px;
  max-width: 600px;
  margin: 20px auto;
}

.loan-form label {
  justify-self: end;
  padding-right: 10px;
}

.loan-form input, .loan-form textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  background-color: #a3a3a3; /* Very light gray background */
  border: 1px solid #ccc; /* Adds a subtle border */
}

.loan-form textarea {
  height: 100px;
}

.loan-form button {
  grid-column: span 2;
  padding: 10px 20px;
  cursor: pointer;
  background-color: #5007c4;
  color: white;
  border: none;
  border-radius: 5px;
}

.loan-form button:hover {
  background-color: #853cfa;
}

</style>
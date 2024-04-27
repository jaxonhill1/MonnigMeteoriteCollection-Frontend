<template>
  <div class="title">
    <h1>Loans</h1>
    <p>Click on a loan's name to see its details.</p>
    <p>You can search by name, institution, phone, email, address, or archived status.</p>
    <br>
    <p>Search</p>
    <input type="text" v-model="searchTerm" placeholder="Enter criteria..." @keyup.enter="searchLoans" />
  </div>
  <div class="loan-page">
    <div v-if="isLoading">
      Loading loans...
    </div>
    <div class="loan-grid" v-else-if="filteredLoans.length">
      <Loan v-for="loan in filteredLoans" :key="loan.id" :loan-data="loan" />
    </div>
    <div v-else>
      No loans found! Did you log in?
    </div>
  </div>
</template>

<script>

import Loan from './Loan.vue';
import axios from 'axios';
import { apiBaseUrl } from '../config';
import _ from 'lodash';

export default {
  components: {
    Loan,
  },
  data() {
    return {
      loans: [],
      isLoading: false,
      sortField: 'id', // default sort field
      searchTerm: '',
    };
  },
  async mounted() {
    this.isLoading = true;
    try {
      const response = await axios.get(apiBaseUrl + '/loans'); // Update endpoint for loans
      this.loans = response.data.data.map(dto => ({
        id: dto.id,
        name: dto.name, // Assuming loan name exists
        institution: dto.institution,
        email: dto.email,
        phone: dto.phone,
        address: dto.address,
        loanStartDate: dto.loanStartDate,
        loanDueDate: dto.loanDueDate,
        isArchived: dto.isArchived,
        meteorites: dto.meteorites,
        notes: dto.notes,
        extraFiles: dto.extraFiles,
      }));
    } catch (error) {
      console.error('Error fetching loans:', error);
    } finally {
      this.isLoading = false;
    }
  },
  computed: {
    filteredLoans() {
      return this.loans.filter(loan => {
        const searchTermLower = this.searchTerm.toLowerCase();
        return (
          loan.name.toLowerCase().includes(searchTermLower) ||
          loan.institution.toLowerCase().includes(searchTermLower) ||
          loan.email.toLowerCase().includes(searchTermLower) ||
          loan.phone.toLowerCase().includes(searchTermLower) ||
          loan.address.toLowerCase().includes(searchTermLower) ||
          String(loan.isArchived).toLowerCase().includes(searchTermLower)
        );
      });
    },
    getLoanRows() {
      const rows = [];
      for (let i = 0; i < this.filteredLoans.length; i += 3) {
        rows.push(this.loans.slice(i, i + 3));
      }
      return rows;
    },
  },
  methods: {
    searchLoans() {
      // Implement additional logic for handling search terms here if needed
    },
  },
};

</script>
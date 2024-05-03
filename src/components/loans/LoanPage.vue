<template>
  <div class="title">
    <h1>Loans</h1>
    <p>You can search by name, institution & its address, email associated, or weight.</p>
    <p>Click on a loan's name to see its details.</p>
    <br>
    <h2>Search</h2>
    <SearchLoans />

  </div>
  
</template>

<script>
import Loan from './LoanDetails.vue';
import SearchLoans from './SearchLoans.vue';
import axios from 'axios';
import { apiBaseUrl } from '../../config';

export default {
  components: {
    Loan,
    SearchLoans
  },
  data() {
    return {
      loans: [],
      isLoading: false,
      searchTerm: '',
    };
  },
  methods: {
    showAllLoans() {
      this.searchTerm = ''; // Reset the search term
    }
  },
  async mounted() {
    this.isLoading = true;
    try {
      const response = await axios.get(apiBaseUrl + '/loans');
      this.loans = response.data.data.content;
    } catch (error) {
      console.error('Error fetching loans:', error);
    } finally {
      this.isLoading = false;
    }
  },
  // computed: {
  //   filteredLoans() {
  //     return this.loans.filter(loan => {
  //       const searchTermLower = this.searchTerm.toLowerCase();
  //       return (
  //         loan.name.toLowerCase().includes(searchTermLower) || 
  //         loan.monnigNumber.toLowerCase().includes(searchTermLower) ||
  //         loan.country.toLowerCase().includes(searchTermLower) ||
  //         String(loan.yearFound).toLowerCase().includes(searchTermLower) ||
  //         String(loan.weight).toLowerCase().includes(searchTermLower)
  //       );
  //     });
  //   },
  // },
};
</script>


<style scoped>
.title {
  padding-top: 70px;
}
.meteorite-page {
  padding: 2rem 0; /* Top and bottom padding */
  display: flex;
  flex-direction: column;
  height: 100vh; /* Make the page fill the viewport height */
  overflow-y: auto; /* Enable vertical scrolling */
}

.meteorite-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 0; /* Remove default gap */
}
</style>

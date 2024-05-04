<template>
    <RouterLink :to="`/loans`">< Go Back</RouterLink>    
    <h2>Create Loan</h2>
      <div class="loan-form">
        <form @submit.prevent="submitLoan">
          <label for="name">Name:</label>
          <input id="name" v-model="loan.name" type="text" required>
  
          <label for="institution">Institution:</label>
          <input id="institution" v-model="loan.institution" type="text" required>
  
          <label for="email">Email:</label>
          <input id="email" v-model="loan.email" type="email" required>
  
          <label for="phone">Phone:</label>
          <input id="phone" v-model="loan.phone" type="tel" required>
  
          <label for="address">Address:</label>
          <input id="address" v-model="loan.address" type="text" required>
  
          <label for="loanStartDate">Loan Start Date:</label>
          <input id="loanStartDate" v-model="loan.loanStartDate" type="date" required>
  
          <label for="loanDueDate">Loan Due Date:</label>
          <input id="loanDueDate" v-model="loan.loanDueDate" type="date" required>
  
          <label for="notes">Notes:</label>
          <textarea id="notes" v-model="loan.notes"></textarea>
  
          <br><br>
          <button type="submit">Submit</button>
          <br><br>

          <label for="meteorites-selected">Meteorites selected: 
                <th v-for="(item, index) in selectedMeteorites" :key="item.id" class="meteorite-added" @click="deselectMeteorite(index)">{{ item.name }},&nbsp</th>
            </label>
    
            <br>

          <label for="meteorite-search">Optionally, add meteorites to this loan now:</label>
            <input id="meteorite-search" type="text" placeholder="Type to search" v-model="searchQuery">
            <li v-for="meteorite in filteredMeteorites" :key="meteorite.id" @click="selectMeteorite(meteorite)" class="dropdown-item">
                {{ meteorite.name }}
            </li>

        </form>
      </div>
    </template>
  
  <script>
    import { apiBaseUrl } from '@/config';
    import axios from 'axios';
    
    export default {
      data() {
          return {
            isSubmitting: false,
            loan: {
              // id: null,
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
            meteorites: [],
            selectedMeteorites: [],
            searchQuery: '',
            dropdownVisible: true
          };
      },
      mounted() {
          this.fetchMeteorites();
      },
      computed: {
          filteredMeteorites() {
              return this.meteorites.filter(meteorite =>
                  meteorite.name.toLowerCase().includes(this.searchQuery.toLowerCase())
              );
          }
      },
      methods: {
        async fetchMeteorites() {
          axios.get(apiBaseUrl + '/meteorites')
            .then(response => {
                this.meteorites = response.data.data.content;
            })
            .catch(error =>{
                console.error('Error fetching meteorites', error);
            });
        },
        selectMeteorite(meteorite) {
            this.searchQuery = '';
            if (!this.selectedMeteorites.some(item => item.id === meteorite.id)) {
                this.selectedMeteorites.push(meteorite);
            }
        },
        deselectMeteorite(index) {
            this.selectedMeteorites.splice(index, 1);
        },
        submitLoan() {
          console.log(this.loan.meteorites);
          this.isSubmitting = true;
          this.sendLoanData().then(() => {
            this.isSubmitting = false;
          }).catch((error) => {
            console.error('Submission failed:', error);
            this.isSubmitting = false;
          });
        },
        async sendLoanData() {
          // first add all selected meteorites to the loan
          this.loan.meteorites = [];

          // Add all selected meteorites' IDs to the loan.meteorites array
          for (let elem of this.selectedMeteorites) {
            this.loan.meteorites.push(elem.id);
          }
          try {
              const response = await axios.post(apiBaseUrl + '/loans', this.loan);
              console.log('Response:', response.data);
              alert('Loan created successfully!');
          } catch (error) {
              console.error('Error creating the loan:', error);
              alert('Failed to create loan.');
          }
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

  .loan-form select, .loan-form textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    background-color: #a3a3a3; /* Very light gray background */
    border: 1px solid #ccc;
  }
  
  .loan-form input, .loan-form textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    background-color: #a3a3a3; /* Very light gray background */
    border: 1px solid #ccc;
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

  .dropdown-item {
    margin-left: 20px;
  }

  .dropdown-item:hover {
    background-color: #853cfa;
    cursor: pointer;
    margin-left: 25px;
  }

  .meteorite-added:hover {
    background-color: #853cfa;
    cursor: pointer;
    margin-left: 25px;
}
  
  </style>
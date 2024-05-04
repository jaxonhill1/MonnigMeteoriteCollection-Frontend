<template>   
    <h2>Add New History</h2>
      <div class="history-form">
        <form @submit.prevent="submitHistory">
          <label for="date">Date:</label>
          <input id="date" v-model="history.date" type="date" required>
  
          <label for="category">Category:</label>
          <input id="category" v-model="history.category" type="text" required>
  
          <label for="notes">Notes:</label>
          <textarea id="notes" v-model="history.notes"></textarea>
  
          <br><br>
          <button type="submit">Submit</button>
          <br><br>
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
            history: {
              id: null,
              date: '',
              category: '',
              notes: '',
              meteorite: 0,   // will be initialized on mount
            }
          };
      },
      mounted() {
          this.history.meteorite = this.$route.params.meteoriteId;
      },
      methods: {
        submitHistory() {
          this.isSubmitting = true;
          this.sendHistoryData().then(() => {
            this.isSubmitting = false;
          }).catch((error) => {
            console.error('Submission failed:', error);
            this.isSubmitting = false;
          });
        },
        async sendHistoryData() {
          console.log(this.history);
          try {
              const response = await axios.post(apiBaseUrl + '/histories', this.history);
              console.log('Response:', response.data);
              alert('History created successfully!');
              this.$router.push('/meteorites');
          } catch (error) {
              console.error('Error creating the history:', error);
              alert('Failed to create history.');
          }
        },
      }
    };
  </script>
  
  <style>
  .history-form {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px 20px;
    max-width: 600px;
    margin: 20px auto;
  }
  
  .history-form label {
    justify-self: end;
    padding-right: 10px;
  }

  .history-form select, .history-form textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    background-color: #a3a3a3; /* Very light gray background */
    border: 1px solid #ccc;
  }
  
  .history-form input, .history-form textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    background-color: #a3a3a3; /* Very light gray background */
    border: 1px solid #ccc;
  }
  
  .history-form textarea {
    height: 100px;
  }
  
  .history-form button {
    grid-column: span 2;
    padding: 10px 20px;
    cursor: pointer;
    background-color: #5007c4;
    color: white;
    border: none;
    border-radius: 5px;
  }
  
  .history-form button:hover {
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
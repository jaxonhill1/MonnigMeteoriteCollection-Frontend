<template>
    <div class="delete-meteorite">
      <h2>Delete Meteorite</h2>
      <p>Are you sure you want to delete the meteorite "{{ meteoriteName }}"?</p>
      <button class="btn btn-outline-danger" @click="deleteMeteorite">Delete</button>
      <router-link to="/" class="btn btn-outline-secondary">Cancel</router-link>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref } from 'vue';
  
  export default {
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    setup(props) {
      const meteoriteName = ref('');
  
      const fetchMeteoriteDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/meteorites/${props.id}`);
          meteoriteName.value = response.data.data.name;
        } catch (error) {
          alert('Error fetching meteorite details.');
        }
      };
  
      const deleteMeteorite = async () => {
        if (!confirm(`Are you sure you want to delete the meteorite "${meteoriteName.value}"?`)) {
          return;
        }
        try {
          await axios.delete(`http://localhost:8080/api/v1/meteorites/${props.id}`);
          alert('Meteorite successfully deleted.');
          this.$router.push('/');
        } catch (error) {
          alert('Failed to delete the meteorite.');
        }
      };
  
      fetchMeteoriteDetails();
  
      return { meteoriteName, deleteMeteorite };
    }
  };
  </script>
  
  <style scoped>
  .delete-meteorite {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 20px;
  }
  </style>
  
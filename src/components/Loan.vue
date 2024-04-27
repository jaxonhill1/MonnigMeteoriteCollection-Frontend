<template>
    <div class="loan" :class="{ 'loan--hover': isHovering }" @mouseenter="isHovering = true" @mouseleave="isHovering = false" @click="$emit('goToDetails', loanData.id)">
      <h2><router-link :to="{ path: '/loans/' + loanData.id }">{{ loanData.name }}</router-link></h2>
      <h3>{{ loanData.institution }}</h3>
      <p>Archived: {{  loanData.isArchived }}</p>
      <p>Start date: {{ loanData.loanStartDate }}</p>
      <p>End date: {{ loanData.loanDueDate }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      loanData: Object,
    },
    data() {
      return {
        isHovering: false,
      };
    },
  };
  </script>
  
  <style scoped>
    .loan--hover {
      background-color: hsla(271, 98%, 49%, 0.308);
    }
  </style>
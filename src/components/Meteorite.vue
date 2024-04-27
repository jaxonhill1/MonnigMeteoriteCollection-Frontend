<template>
    <div class="meteorite" :class="{ 'meteorite--hover': isHovering }" @mouseenter="isHovering = true" @mouseleave="isHovering = false" @click="$emit('goToDetails', meteoriteData.id)">
      <h2><router-link :to="{ path: '/meteorites/' + meteoriteData.id }">{{ meteoriteData.name }}</router-link></h2>
      <h3>{{ meteoriteData.monnigNumber }}</h3>
      <p>{{ meteoriteData.yearFound }}, {{ meteoriteData.country }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      meteoriteData: Object,
    },
    data() {
    return {
      isHovering: false,
    };
  },
  };
  </script>
  
  <style scoped>
    .meteorite--hover {
      background-color: hsla(271, 98%, 49%, 0.308);
    }
  </style>
  
  
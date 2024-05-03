<script setup>
// import any other components
</script>

<template>
  <section class="container">
    <h1 class="title">Monnig Meteorite Collection</h1>

    <WelcomeItem class="welcome-item">
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading>
        <h2>Welcome to the Monnig Meteorite Collection</h2>
      </template>

      <p>
        Monnig Meteorite Collection is our Spring 2024 class project for Dr. Wei's Web Technology class. It is a full-stack application
        featuring a Spring Boot backend and a frontend built using Vue 3.
      </p>

      <div class="developers">
        <h2>Developers</h2>
        <ul>
          <li>Jaxon Hill</li>
          <li>Peter Ho</li>
        </ul>
      </div>
    </WelcomeItem>
  </section>
</template>


<style>
  div{
    margin-bottom:30px
  }
</style>

<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="">
      <input v-model="data.username" type="text" class="form-control" id="floatingInput" placeholder="Username" required>
    </div>

    <div>
      <input v-model="data.password" type="password" class="form-control" placeholder="Password" required>
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    </form>
  </main>
  


</template>

<script lang="ts">
import {reactive} from 'vue';
import {useRouter} from "vue-router";

export default {
  name: "Login",
  setup() {
    const data = reactive({
      username: '',
      password: ''
    });
    const router = useRouter();

    const submit = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/v1/users/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to login');
    }

    const responseData = await response.json(); // Parsing the JSON response
if (responseData && responseData.data && responseData.data.token) {
    localStorage.setItem('authToken', responseData.data.token); // Storing the token
    console.log('Login successful:', responseData);
    await router.push('/');
} else {
    throw new Error('Token not found in response');
}

  } catch (error) {
    console.error('Login error:', error);
  }
}


    return {
      data,
      submit
    }
  }
}
</script>

<style>
html,
body {
  height: 100%;
}

.form-signin {
  max-width: 330px;
  padding: 1rem;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>




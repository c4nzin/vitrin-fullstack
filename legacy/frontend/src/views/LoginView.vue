<template>
  <section class="container">
    <div class="left-side">
      <article>
        <h3 class="title">NEXUS</h3>
        <img
          src="https://ja-africa.org/wp-content/uploads/2020/02/FedEx-Logo-PNG-Transparent.png"
        />
      </article>
    </div>
    <div class="right-side">
      <article>
        <h3 class="top-right-text">
          <b>Not a member yet?</b>
          <a href="#">Click to join us! </a>
        </h3>
        <h3 class="main-text">WELCOME BACK MEMBER!</h3>
        <h1 class="login-label">LOG IN TO CONTINUE</h1>

        <form @submit.prevent="handleLogin">
          <input type="text" v-model="username" placeholder="Enter your username." required />
          <input type="password" v-model="password" placeholder="********" required />
          <button type="submit">Log in</button>
        </form>
        <h5 class="forgot-password-label">Forgot your password? Click to reset</h5>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const username = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await axios.post('http://localhost:3000/api/auth/login', {
      username: username.value,
      password: password.value
    })
    alert('Successfully logged in!')
    window.location.href = '/'
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>

<style scoped>
img {
  height: 100px;
}
.forgot-password-label {
  font-size: large;
}

.main-text {
  font-size: 35px;
  font-weight: bold;
}

.top-right-text {
  position: absolute;
  top: 0;
  right: 0;
  display: table;
  margin-top: -170px;
  margin-right: 20px;
  font-weight: 800;
}

button {
  cursor: pointer;
  font-size: large;
}

.login-label {
  font-size: 18px;
}

a {
  color: gray;
  text-decoration: underline;
  font-weight: 800;
}

a:hover {
  color: #2f0d50;
  background-color: white;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0;
  justify-content: center;
  align-items: center;
}
* {
  box-sizing: border-box;
}
body {
  font-size: 1.25rem;
  font-family: sans-serif;
  line-height: 150%;
  text-shadow: 0 2px 2px #ffffff;
}

input,
button {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 60px;
  outline-width: 5px;
  width: 50%;
  margin-top: 20px;
}

button {
  background-color: #2f0d50;
  color: white;
}

h1,
h2,
h3,
h4,
h5 {
  color: black;
  display: grid;
}

section {
  color: #fff;
  text-align: center;
}

div {
  height: 100%;
}

article {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 20px;
}

h1 {
  font-size: 1.75rem;
  margin: 0 0 0.75rem 0;
}

/* Pattern styles */
.container {
  display: table;
  width: 100%;
  height: 100%;
}

.left-side {
  background-color: #6912bc;
  background-repeat: no-repeat;
  background-size: cover;
  background: url('https://www.aci-iac.ca/wp-content/uploads/2020/09/art-books_2_tom-thomson-study-of-a-womans-head-contextual.jpg');
  position: absolute;
  left: 0px;
  width: 50%;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.right-side {
  background-color: #ffffff;
  position: absolute;
  right: 0px;
  width: 60%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>

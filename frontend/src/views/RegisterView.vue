
<template>
  <div class="container">
    <div class="left-side">
      <div class="content">
        <h1>NEXUS</h1>
        <p></p>
      </div>
    </div>
    <div class="right-side">
      <h2>Create an Account</h2>
      <form @submit.prevent="handleSubmit">
        <input type="text" v-model="username" placeholder="Your Name" required />
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <div class="social-signup">
        <p>Or</p>
        <button type="button" class="login-with-google-btn">Sign in with Google</button>
      </div>
    </div>
  </div>
</template>

<script  lang="ts">
import axios from "axios"

export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password
        })
        console.log(response.data)
        alert('Succesfully registered!')
        window.location.href = '/login'
      } catch (error) {
        console.error('Registration failed:', error)
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.left-side {
  flex: 1;
  background: url('https://www.freevector.com/uploads/vector/preview/31560/freevectorBackgroundOceanBackgrounday0222_generated.jpg')
    no-repeat center center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 300px;
}

h1,
h2,
small {
  color: black;
}

.left-side .content {
  max-width: 400px;
  text-align: center;
}

.right-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 200px;
  background-color: #fff;
}

.right-side h2 {
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
}

.login-with-google-btn {
  transition:
    background-color 0.3s,
    box-shadow 0.3s;

  padding: 12px 16px 12px 42px;
  border: none;
  border-radius: 3px;
  box-shadow:
    0 -1px 0 rgba(0, 0, 0, 0.04),
    0 1px 1px rgba(0, 0, 0, 0.25);

  color: #757575;
  font-size: 14px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
  background-color: white;
  background-repeat: no-repeat;
  background-position: 12px 11px;

  &:hover {
    box-shadow:
      0 -1px 0 rgba(0, 0, 0, 0.04),
      0 2px 4px rgba(0, 0, 0, 0.25);
  }

  &:active {
    background-color: #eeeeee;
  }

  &:focus {
    outline: none;
    box-shadow:
      0 -1px 0 rgba(0, 0, 0, 0.04),
      0 2px 4px rgba(0, 0, 0, 0.25),
      0 0 0 3px #c8dafc;
  }

  &:disabled {
    filter: grayscale(100%);
    background-color: #ebebeb;
    box-shadow:
      0 -1px 0 rgba(0, 0, 0, 0.04),
      0 1px 1px rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }
}

form input {
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border-radius: 0px;
}

form button {
  padding: 10px;
  font-size: 16px;
  background-color: #000;
  color: #fff;
  border: none;
  cursor: pointer;
}

form button:hover {
  background-color: #444;
}

.social-signup {
  padding: 10px;
  margin-top: 30px;
  text-align: center;
}

.social-signup p {
  margin-bottom: 10px;
}

.social-signup button {
  display: block;
  margin: 15px 5px;
  padding: 10px;
  width: 100%;
  max-width: 300px;
  font-size: 16px;
  cursor: pointer;
}

p {
  margin-top: 20px;
}

a {
  color: #000;
  text-decoration: underline;
  cursor: pointer;
}
</style>

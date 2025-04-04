<template>
    <div class="signup-container">
      <h2>Sign Up</h2>
      <form @submit.prevent="signup">
        <input v-model="form.userName" type="text" placeholder="User Name" required />
        <input v-model="form.email" type="email" placeholder="Email" required />
        <input v-model="form.firstName" type="text" placeholder="First Name" required />
        <input v-model="form.lastName" type="text" placeholder="Last Name" required />
        <input v-model="form.password" type="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios'

  const backend = '/api';

  export default {
    data() {
      return {
        form: {
          userName: '',
          email: '',
          firstName: '',
          lastName: '',
          password: ''
        },
        errorMessage: ''
      }
    },
    methods: {
      async signup() {
        try {
            const response = await axios.post(`${backend}/user/signup`, this.form)
            this.$router.push({
                name: 'Welcome',
                query: {
                    userName: response.data.userName,
                    email: response.data.email,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName
                }
            })
        } catch (error) {
            this.errorMessage = 'Error signing up. Please try again.'
            console.error(error)
        }
    }
}
}
  </script>
        
        <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
          }
          .signup-container {
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              width: 300px;
          }
          .signup-container h2 {
              margin-bottom: 20px;
              text-align: center;
          }
          .signup-container input[type="text"],
          .signup-container input[type="email"],
          .signup-container input[type="password"] {
              width: 100%;
              padding: 10px;
              margin: 10px 0;
              border: 1px solid #ccc;
              border-radius: 4px;
          }
          .signup-container button {
              width: 100%;
              padding: 10px;
              background-color: #28a745;
              border: none;
              border-radius: 4px;
              color: #fff;
              font-size: 16px;
              cursor: pointer;
          }
          .signup-container button:hover {
              background-color: #218838;
          }
      </style>

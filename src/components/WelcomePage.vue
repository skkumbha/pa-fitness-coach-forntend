<template>
    <div class="welcome-container">
      <h2>Welcome, {{ firstName }} {{ lastName }}!</h2>
      <p>Your username: {{ userName }}</p>
      <p>You will be receiving emails on your email: {{ email }}</p>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
        userName() {
            return this.$route.query.userName;
        },
        email() {
            return this.$route.query.email;
        },
        firstName() {
            return this.$route.query.firstName;
        },
        lastName() {
            return this.$route.query.lastName;
        },
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
          .welcome-container {
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              text-align: center;
          }
          .welcome-container h1 {
              margin-bottom: 20px;
          }
  </style>
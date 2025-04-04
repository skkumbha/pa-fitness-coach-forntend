<template>
    <div class="chat-container">
      <div class="chat-header">
        <h2>Chat Assistant</h2>
      </div>
      <div class="chat-messages">
        <div
          v-for="(message) in messages"
          :key="message.id"
          :class="message.role === 'assistant' ? 'assistant-message' : 'user-message'"
        >
          <p v-for="(content, idx) in message.content" :key="idx">
            {{ content.text.value }}
          </p>
        </div>
      </div>
      <div class="chat-input">
        <textarea v-model="newMessage" placeholder="Type your message here..."></textarea>
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";

  const backend = '/api'; // Set the backend URL
  
  export default {
    data() {
      return {
        messages: [], // Array to store messages fetched from the backend
        newMessage: "", // User's new message input
        userName: this.$route.query.userName || "", // Retrieve userName from query params
        fetchInterval: null, // To store the interval ID
      };
    },
    async created() {
      await this.fetchMessages(); // Fetch messages when the component is created
      this.startFetchingMessages(); // Start polling for new messages
    },
    beforeUnmount() {
      this.stopFetchingMessages(); // Clear the interval when the component is destroyed
    },
    methods: {
      async fetchMessages() {
        try {
          const response = await axios.get(`${backend}/v1/${this.userName}/messages`);
          console.log("Messages Response is " + JSON.stringify(response.data, null, 2));
          this.messages = Array.isArray(response.data.data) ? response.data.data : []; // Assign the fetched messages to the `messages` array
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      },
      startFetchingMessages() {
        this.fetchInterval = setInterval(async () => {
          await this.fetchMessages(); // Fetch messages every 5 seconds
        }, 300000);
      },
      stopFetchingMessages() {
        if (this.fetchInterval) {
          clearInterval(this.fetchInterval); // Clear the interval
          this.fetchInterval = null;
        }
      },
      async sendMessage() {
        if (this.newMessage.trim() !== "") {
            if (!Array.isArray(this.messages)) {
      console.error("messages is not an array");
      return;
    }
          // Add the user's message to the messages array
          this.messages.push({
            id: `msg_${Date.now()}`,
            role: "user",
            content: [{ type: "text", text: { value: this.newMessage } }],
          });
  
          const userMessage = this.newMessage; // Save the user's message
          this.newMessage = ""; // Clear the input field
  
          try {
            // Send the user's message to the backend
            const response = await axios.post(`${backend}/v1/${this.userName}/messages`, {
              text: userMessage,
            });
  
            // Add the assistant's response to the messages array
            this.messages.push({
              id: response.data.id,
              role: "assistant",
              content: response.data.content,
            });
          } catch (error) {
            console.error("Error sending message:", error);
          }
        }
      },
    },
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>
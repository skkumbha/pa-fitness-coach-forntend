<template>
    <div class="personal-details-container">
      <h2 v-if="!isRecordingAnswer" class="question">{{ questions[currentQuestionIndex] }}</h2>
      <p v-if="isRecordingAnswer" class="recording-message">Recording your answer...</p>
  
      <!-- Input field for all questions except the last one -->
      <input
        v-if="!isRecordingAnswer && currentQuestionIndex < questions.length - 1"
        type="text"
        v-model="answers[currentQuestionIndex]"
        placeholder="Enter your answer"
        class="answer-input"
      />
  
      <!-- Textarea for the last question -->
      <textarea
        v-if="!isRecordingAnswer && currentQuestionIndex === questions.length - 1"
        v-model="answers[currentQuestionIndex]"
        placeholder="Enter your answer"
        rows="4"
        class="answer-textarea"
      ></textarea>
  
      <!-- Go button -->
      <button
        v-if="!isRecordingAnswer"
        @click="nextQuestion"
        class="go-button"
      >
        Go
      </button>
  
      <!-- Submit button -->
      <button
        v-if="allAnswersFilled && currentQuestionIndex === questions.length - 1"
        @click="submitDetails"
        class="submit-button"
      >
        Submit
      </button>
  
      <div class="status-updates">
        <p v-for="(status, index) in statusMessages" :key="index" class="status-message">
          {{ status }}
        </p>
      </div>
    </div>
  </template>
  
  <script>

import axios from 'axios'

const backend = process.env.VUE_APP_BACKEND_URL || 'http://localhost:8080'

  
export default {
    data() {
      return {
        userName: this.$route.query.userName,
        questions: [
          "Now let us talk about your personal stuff, How old are you?",
          "What is your current weight?",
          "What is your current height?",
          "What is your fitness goal?",
        ],
        answers: ["", "", "", ""],
        currentQuestionIndex: 0,
        statusMessages: [],
        isRecordingAnswer: false, // Tracks if the answer is being recorded
      };
    },
    computed: {
      allAnswersFilled() {
        return this.answers.every(answer => answer.trim() !== "");
      },
    },
    methods: {
      async nextQuestion() {
        if (this.answers[this.currentQuestionIndex].trim() !== "") {
          this.isRecordingAnswer = true; // Show "Recording your answer..." message
          await this.simulateDelay(500); // Wait for 500ms to simulate recording effect
          this.isRecordingAnswer = false; // Hide the recording message
  
          if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++; // Move to the next question
          }
        }
      },
      async submitDetails() {
        try {
          // Add status updates
          this.addStatusMessage("Submitting your answers to the backend...");
          
          // Make a backend call to submit the answers
          const response = await axios.post(`${backend}/api/v1/${this.userName}/assistant`, 
          // Send the answers to the backend
          {
            answers: this.answers,
          },
            {
                headers: {
                "Content-Type": "application/json",
                },
            }
        );
  
          // Show processing messages while waiting for the backend response
          this.addStatusMessage("Backend service is processing your request...");
          await this.simulateBackendCall(2000); // Simulate delay for processing
  
          if (response.status === 200) {
            this.addStatusMessage("Assistant created successfully!");
            await this.simulateBackendCall(1000); // Simulate delay for final message
  
            // Navigate to ChatPage
            this.$router.push({
              name: "ChatPage",
              query: { userMessage: this.answers.join(", "), userName: this.userName },
            });
          } else {
            throw new Error("Failed to create assistant");
          }
        } catch (error) {
          console.error("Error during backend call:", error);
          this.addStatusMessage("An error occurred. Please try again.");
        }
      },
      addStatusMessage(message) {
        this.statusMessages.push(message);
        setTimeout(() => {
          this.statusMessages.shift(); // Remove the first message after 3 seconds
        }, 3000);
      },
      simulateBackendCall(delay) {
        return new Promise(resolve => setTimeout(resolve, delay));
      },
      simulateDelay(delay) {
        return new Promise(resolve => setTimeout(resolve, delay));
      },
    },
  };
  </script>
  
  <style>
  .personal-details-container {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    padding: 20px;
    border-radius: 10px;
    max-width: 400px;
    margin: auto;
    text-align: center;
  }
  
  .question {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .recording-message {
    font-size: 16px;
    color: #888;
    margin-bottom: 10px;
    animation: fadeInOut 0.5s ease-in-out;
  }
  
  .answer-input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .answer-textarea {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
  }
  
  .go-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .go-button:hover {
    background-color: #0056b3;
  }
  
  .submit-button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .submit-button:hover {
    background-color: #218838;
  }
  
  .status-updates {
    margin-top: 20px;
    text-align: left;
  }
  
  .status-message {
    animation: fadeUp 3s ease-in-out forwards;
  }
  
  @keyframes fadeUp {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-20px);
    }
  }
  
  @keyframes fadeInOut {
    0%, 100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
  </style>
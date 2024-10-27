// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
 

const firebaseConfig = {
  apiKey: "AIzaSyCbI6AoJdg3EerKFgEvaxggVj6aXjhQkZ4",
  authDomain: "store-f38d3.firebaseapp.com",
  projectId: "store-f38d3",
  storageBucket: "store-f38d3.appspot.com",
  messagingSenderId: "215251317555",
  appId: "1:215251317555:web:58e374c28207136707c446",
  measurementId: "G-VY6DJXTRCH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 

export default app
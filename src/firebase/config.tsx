// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZ-5cwLsjzg5WAS1RagMUhZlsfmWverNQ",
  authDomain: "hackergram-a0865.firebaseapp.com",
  projectId: "hackergram-a0865",
  storageBucket: "hackergram-a0865.appspot.com",
  messagingSenderId: "258409512733",
  appId: "1:258409512733:web:ac61ab36281a833c39ebf4",
  measurementId: "G-6Z65BX1J6N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
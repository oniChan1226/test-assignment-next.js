// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA53BjB6IwZAUugMavtUI9zxf9sBG3zFBQ",
  authDomain: "test-assignment-3b29a.firebaseapp.com",
  projectId: "test-assignment-3b29a",
  storageBucket: "test-assignment-3b29a.appspot.com",
  messagingSenderId: "354507751539",
  appId: "1:354507751539:web:bcc282bf054cf835976a06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const storage = getStorage(app);
import logo from './logo.svg';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGfg_wqQK6j4YnjpzLCvM-k6mAsHWBxOg",
  authDomain: "isa-project-client.firebaseapp.com",
  projectId: "isa-project-client",
  storageBucket: "isa-project-client.appspot.com",
  messagingSenderId: "968340635518",
  appId: "1:968340635518:web:beafe62353262599c6fd2f"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

function App() {
  return (
    <div>
      <LoginSignup />
    </div>
  );
}

export default App;

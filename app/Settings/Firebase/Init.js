import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCmn0RmlV7wYnqgKBibwC263PPUoaBiTJA",
    authDomain: "wordle-19618.firebaseapp.com",
    databaseURL: "https://wordle-19618-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "wordle-19618",
    storageBucket: "wordle-19618.appspot.com",
    messagingSenderId: "996247062799",
    appId: "1:996247062799:web:ea4e1e5d35b440c566567a",
    measurementId: "G-ZYS3JJNF83"
};

export function initFirebase() {
    initializeApp(firebaseConfig);
}
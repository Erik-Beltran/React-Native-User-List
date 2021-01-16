import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyA-4MTjeA9H16Vxtr74fAaBGzxN19d6qLQ",
    authDomain: "user-list-abb77.firebaseapp.com",
    projectId: "user-list-abb77",
    storageBucket: "user-list-abb77.appspot.com",
    messagingSenderId: "533658798177",
    appId: "1:533658798177:web:aed8e48822c4e09d208220"
  };
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig)
 const db = firebase.firestore()

 export default{firebase, db}
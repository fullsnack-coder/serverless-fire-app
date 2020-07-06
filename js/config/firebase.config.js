var firebaseConfig = {
  apiKey: "AIzaSyCv21uTy90ce6ZOCGbPCC9KZ7Xl23COAqo",
  authDomain: "fire-app-c8f29.firebaseapp.com",
  databaseURL: "https://fire-app-c8f29.firebaseio.com",
  projectId: "fire-app-c8f29",
  storageBucket: "fire-app-c8f29.appspot.com",
  messagingSenderId: "560045836406",
  appId: "1:560045836406:web:c2c784ac27a645284ef757",
  measurementId: "G-8P0WFCSR3P",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.functions();

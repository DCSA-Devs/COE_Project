import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCHjNSh1e8JIu969bWygXqgxIsUbkmpRpQ",
  authDomain: "coeproject-24160.firebaseapp.com",
  databaseURL: "https://coeproject-24160.firebaseio.com",
  projectId: "coeproject-24160",
  storageBucket: "coeproject-24160.appspot.com",
  messagingSenderId: "404708360630",
  appId: "1:404708360630:web:76b5839fd35e81da1bc117",
  measurementId: "G-VHPX937EGR",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

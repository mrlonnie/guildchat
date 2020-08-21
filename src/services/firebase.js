import firebase from 'firebase';
var firebaseConfig = {
  apiKey: "AIzaSyAadUDozs4VlFRq7FGyrcEreuKf1_U3FoI",
  authDomain: "guildchat-7c14a.firebaseapp.com",
  databaseURL: "https://guildchat-7c14a.firebaseio.com",
  projectId: "guildchat-7c14a",
  storageBucket: "guildchat-7c14a.appspot.com",
  messagingSenderId: "1046856998140",
  appId: "1:1046856998140:web:d68cd1a21c5748482ccb79",
  measurementId: "G-C8NDMQ3X74"
};
firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebase.auth;
export const firebaseDb = firebase.database();
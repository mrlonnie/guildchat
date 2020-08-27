import firebase from 'firebase';
firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebase.auth;
export const firebaseDb = firebase.database();

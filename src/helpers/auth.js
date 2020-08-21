import { firebaseAuth } from '../services/firebase';

export function register(email, password) {
  return firebaseAuth().createUserWithEmailAndPassword(email, password);
}

export function login(email, password) {
  return firebaseAuth().signInWithEmailAndPassword(email, password);
}
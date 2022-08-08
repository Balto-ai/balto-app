// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDPjkIhzsaL_y_i9zoUAdTkFnHpJbDt0pk',
  authDomain: 'balto-cca.firebaseapp.com',
  projectId: 'balto-cca',
  storageBucket: 'balto-cca.appspot.com',
  messagingSenderId:'745254627018',
  appId: '1:745254627018:web:993bcf1ba61ededd3e3633'
};

// Initialize Firebase

//app is app that we are creating
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore();

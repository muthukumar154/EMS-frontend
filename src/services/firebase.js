import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyB0LH-prFm0PBI7Fh_xjVJY5lTLxdyI59g",
  authDomain: "radiaclstart.firebaseapp.com",
  projectId: "radiaclstart",
  storageBucket: "radiaclstart.firebasestorage.app",
  messagingSenderId: "874759452170",
  appId: "1:874759452170:web:625150140a20cfcfd8d1f3"
};

const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const provider =new GoogleAuthProvider();
export const db = getFirestore(app);
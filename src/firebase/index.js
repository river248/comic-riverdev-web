// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4nDWFRu-GTVBRNtQ09KLHL0rfMHsNVt0",
  authDomain: "comic-riverdev-web.firebaseapp.com",
  projectId: "comic-riverdev-web",
  storageBucket: "comic-riverdev-web.appspot.com",
  messagingSenderId: "630055118244",
  appId: "1:630055118244:web:846be3363bf9fa24d74d31",
  measurementId: "G-DJWYRLP5R0"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const storage = getStorage()
export {
    storage,
    firebase as default
}
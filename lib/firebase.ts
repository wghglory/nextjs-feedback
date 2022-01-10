/* Firebase for web! */

// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: 'nextjs-feedback.appspot.com',
  messagingSenderId: '119767661864',
  appId: '1:119767661864:web:34335f78517e1aa24ca41d',
};

// Initialize Firebase
let app;
if (!app) {
  app = initializeApp(firebaseConfig);
}

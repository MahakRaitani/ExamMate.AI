import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "authexammate.firebaseapp.com",
  projectId: "authexammate",
  storageBucket: "authexammate.firebasestorage.app",
  messagingSenderId: "330034145338",
  appId: "1:330034145338:web:3f7892ca66d2bb324f2d03",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
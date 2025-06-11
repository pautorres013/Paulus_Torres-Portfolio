import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD2QOMbQxgzBteODUmRjCVV3MASUwKh9G8",
  authDomain: "paulustorres-c254d.firebaseapp.com",
  projectId: "paulustorres-c254d",
  storageBucket: "paulustorres-c254d.firebasestorage.app",
  messagingSenderId: "485007848922",
  appId: "1:485007848922:web:bdff730a920d2f1ed0fce3",
  measurementId: "G-HZWBB9548H",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Get a Firestore instance
const fire_db = getFirestore(firebaseApp);

export { fire_db };

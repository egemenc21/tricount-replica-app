// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCtbJvpuLUGUR0n1OUuAoE5Xe14tYlF7Rw",

  authDomain: "tricount-replica-app.firebaseapp.com",

  projectId: "tricount-replica-app",

  storageBucket: "tricount-replica-app.appspot.com",

  messagingSenderId: "29019903104",

  appId: "1:29019903104:web:9f2fc91f6f4715b07a8265",

  measurementId: "G-JZMLEQXVV0"

};




// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// const analytics = 
getAnalytics(app);

// export const getCurrentUser = ():Promise<User | null> => {
//   return new Promise((resolve, reject) => {
//     const unsubscribe = onAuthStateChanged(
//       auth,
//       (userAuth) => {
//         unsubscribe(); 
//         resolve(userAuth);
//       },
//       reject
//     );
//   });
// };
// export const onAuthStateChangedListener = (callback) =>
//   onAuthStateChanged(auth, callback);
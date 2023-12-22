import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCC2pNIVBOf9ptF48DRgLKiIw3xYJVcu4w",
    authDomain: "react-blog-54bb0.firebaseapp.com",
    projectId: "react-blog-54bb0",
    storageBucket: "react-blog-54bb0.appspot.com",
    messagingSenderId: "603919902236",
    appId: "1:603919902236:web:2fc9c005e5dfc88af461d9",
    measurementId: "G-TNWCCPRBE6"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
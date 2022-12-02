import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyDZ01DQKeBYEZ6x0IF9A1TFZ2eMMgx4oiY",
    authDomain: "cookie-clicker-d6721.firebaseapp.com",
    projectId: "cookie-clicker-d6721",
    storageBucket: "cookie-clicker-d6721.appspot.com",
    messagingSenderId: "906187141379",
    appId: "1:906187141379:web:d1cbd6193fe7c4dfee3936",
    measurementId: "G-KGT6KGV6KF"
});

export const auth = app.auth()
export default app
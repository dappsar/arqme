import firebase from "firebase"
const dotenv = require('dotenv')

const env = dotenv.config() // eslint-disable-line

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDEER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}

const Firebase = firebase.initializeApp(firebaseConfig)
export default Firebase
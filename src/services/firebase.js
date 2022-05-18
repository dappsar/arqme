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

const db = firebase.firestore()

db.enablePersistence()
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      console.warn('Firebase: Multiple tabs open')
    } else if (err.code === 'unimplemented') {
      console.warn('Firebase: The current browser does not support all of the features required to enable persistence')
    }
  })


const getCollection = async (colName) => {
  // console.log(`access (getCollection) firebasecollection ${colName}`)
  return db.collection(colName).get()
}

const getCollectionFiltered = async (colName, field, operator, value) => {
  // console.log(`access (getCollectionFiltered) firebasecollection ${colName} ${field} ${operator} ${value}`)
  return db.collection(colName).where(field, operator, value).get()
}

const getCollectionDocById = async (colName, docId) => {
  // console.log(`access (getCollectionDocById) firebasecollection ${colName} ${docId}`)
  return db.collection(colName).doc(docId).get()
}

const addToCollection = async (colName, data) => {
  // console.log(`access (addToCollection) firebasecollection ${colName} ${JSON.stringify(data)}`)
  return db.collection(colName).add(data)
}

const updateCollectionByDocId = async (colName, docId, data) => {
  // console.log(`access (addToCollection) firebasecollection ${colName} ${docId} ${JSON.stringify(data)}`)
  return db.collection(colName).doc(docId).update(data)
}

const handleGet = async (promise) => {
  return promise.then(res => {
    const data = res.docs.map(i => ({
      id: i.id,
      ...i.data()
    }))
    return {
      ok: true,
      error: null,
      data
    }
  })
    .catch(
      err => {
        return {
          ok: false,
          error: err,
          data: null
        }
      }
    )
}


const deleteCollection = async (colName) => {
  return db.collection(colName).get().then(querySnapshot => {
    querySnapshot.forEach((doc) => { doc.ref.delete() })
  })
}


const colNames = {
  CONFIG: 'config',
  SCORES: 'scores',
  HICHSCORES: 'highScores'
}

export {
  Firebase, db, colNames, getCollection, getCollectionFiltered,
  getCollectionDocById, addToCollection, updateCollectionByDocId,
  handleGet, deleteCollection
}

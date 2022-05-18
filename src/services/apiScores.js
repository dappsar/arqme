import { Firebase, colNames } from './firebase'

function saveScore (date, name, score) {
  const db = Firebase.firestore()
  db.collection(colNames.SCORES).add({
    date: date,
    name: name,
    score: score
  }) 
}


const api = { saveScore }

export { api }



import { Firebase, colNames, getCollection, handleGet, deleteCollection } from './firebase'
import { api as apiConfig } from './apiConfig'

async function saveHighScore (date, name, score) {
  const totalPlayers = (await apiConfig.getTotalPlayers()).data
  const maxHighScoresToSave = (await apiConfig.getMaxHighScores()).data
  const db = Firebase.firestore()

  if (totalPlayers === 0) {
    db.collection(colNames.HICHSCORES).add({
      date: date,
      name: name,
      score: score,
      position: 1
    }) 
  } else {
    const highScoresDocs = await handleGet(getCollection(colNames.HICHSCORES))
    const highScores = highScoresDocs.data

    highScores.push ({
      date: date,
      name: name,
      score: score,
      position: 0
    })

    // ordenar array de json por campo score
    highScores.sort (function (a, b) {
      return parseFloat(b.score) - parseFloat(a.score)
    })

    // remove last item si mayor a max
    if (highScores.length > maxHighScoresToSave) {
      highScores.pop() 
    }

    // borra actual colección en firestore
    await deleteCollection (colNames.HICHSCORES)
    
    // persiste en firestore
    var position = 0
    highScores.forEach(item => {
      position += 1
      db.collection(colNames.HICHSCORES).add({
        date: item.date,
        name: item.name,
        score: item.score,
        position: position
      }) 
    })
  }

}

async function getHighScore () {
  const highScoresDocs = await handleGet(getCollection(colNames.HICHSCORES))
  return highScoresDocs.data
}


const api = { saveHighScore, getHighScore }

export { api }




import { colNames, getCollection, handleGet, updateCollectionByDocId } from './firebase'

const fields = {
  players: 'players',
  maxHighScores: 'maxHighScores'
}

const handleCatch = () => ({
  data: 0,
  error: true,
  ok: false
})


const getFieldValue = async (fieldName) => {
  // firestore reads: 1 document
  const totals = await handleGet(getCollection(colNames.CONFIG))
  // Si la colección no existe, la crea
  if (totals.data.length === 0) {
    const totalValue = 0
    const dataToAdd = {}
    dataToAdd[`${fieldName}`] = totalValue

    return getCollection(colNames.CONFIG).add(dataToAdd)
      .then(() => ({
        data: totalValue,
        ok: true,
        error: null
      }))
      .catch(handleCatch)
  }

  return {
    data: totals.data[0][fieldName] || 0,
    ok: true,
    error: null
  }
}

const incrementTotalData = async (fieldName) => {
  // firestore reads: 1 document
  const collection = await handleGet(getCollection(colNames.CONFIG))
  const dataToAdd = {}
  dataToAdd[`${fieldName}`] = 1

  if (collection.data.length !== 0) {
    // existe la colección
    const docId = collection.data[0].id
    const currentValue = collection.data[0][fieldName] || 0
    dataToAdd[`${fieldName}`] = currentValue + 1

    // firestore writes: 1
    return updateCollectionByDocId(colNames.CONFIG, docId, dataToAdd)
      .then(() => ({
        data: dataToAdd,
        ok: true,
        error: null
      }))
      .catch(handleCatch)
  }

  // firestore writes: 1
  return getCollection(colNames.CONFIG).push(dataToAdd)
    .then(() => ({ // eslint-disable-line
      data: dataToAdd,
      ok: true,
      error: null
    }))
    .catch(handleCatch)
}


const getMaxHighScores = async () => {
  const dataCol = await getFieldValue (fields.maxHighScores)
  return {
    data: dataCol.data || 10,
    ok: true,
    error: null
  }
}

const getTotalPlayers = async () => {
  const dataCol = await getFieldValue (fields.players)
  return {
    data: dataCol.data || 0,
    ok: true,
    error: null
  }
}

const incrementTotalPlayers = async () => {
  const result = await incrementTotalData(fields.players)
  return result
}

const api = { getTotalPlayers, getMaxHighScores, incrementTotalPlayers}

export { api }


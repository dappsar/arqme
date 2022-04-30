import { HEROES, COMICS } from './data';
import Firebase from '../components/Firebase'

// the Knuth shuffle algorithm
export function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value)
}

// method to handle points calculation based on sort order as well as grouping
function calculateScore(groupedHeroes, groupValue) {
  // in data HEROUES, the comics has the KEY setted 
  // in group, we receive de VALUE, so we have to get KEY from VALUE
  const correctOrder = HEROES
      .filter(hero => hero.comics === getKeyByValue(COMICS, groupValue))
      .sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  );

  if (!groupedHeroes)
    return 0

  return groupedHeroes.reduce((score, { name }, index) => {
    const maxPoint = HEROES.length;
    const heroIndex = correctOrder.findIndex(hero => hero.name === name);
    const penalty = heroIndex >= 0 ? Math.abs(index - heroIndex) : maxPoint;
    console.log({ name, points: maxPoint - penalty });
    return score + (maxPoint - penalty);
  }, 0);
}

export function saveScore (name, score) {
  const db = Firebase.firestore()
  db.collection('scores').add({
    date: new Date().toISOString(),
    name: name,
    score: score
  }) 
}

export function getTotalScore(groups, timeLeft, player) {
  const gameScore = Object
    .values(COMICS)
    .reduce((sum, value) => sum + calculateScore(groups[value], value), 0);
    
  const timeBonus = getSeconds(timeLeft);
  const score = gameScore ? gameScore + timeBonus : 0
  saveScore (player, score)

  return score
}

// method to handle to the heroe cards movement
export const move = (state, source, destination) => {
  const srcListClone = [...state[source.droppableId]];
  const destListClone =
    source.droppableId === destination.droppableId
      ? srcListClone
      : [...state[destination.droppableId]];

  const [movedElement] = srcListClone.splice(source.index, 1);
  destListClone.splice(destination.index, 0, movedElement);

  return {
    [source.droppableId]: srcListClone,
    ...(source.droppableId === destination.droppableId
      ? {}
      : {
          [destination.droppableId]: destListClone,
        }),
  };
};

// method to get time left
export const getTimeLeft = deadline => deadline - Date.now();

// method to get time left in seconds
export const getSeconds = timeLeft => Math.floor(timeLeft / 1000);

// enums for representing the game state
export const GAME_STATE = {
  READY: 'ready',
  PLAYING: 'playing',
  DONE: 'done',
};

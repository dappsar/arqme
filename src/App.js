import React from 'react'

import { HEROES, COMICS } from './custom/data'
import { shuffle, getTimeLeft, move, GAME_STATE } from './custom/utils'

import ModalReady from './components/ModalReady'
import ModalEnd from './components/ModalEnd'
import Header from './components/Header'
import Footer from './components/Footer'
import Content from './components/Content'

import './app.css';

const GAME_DURATION = 1000 * 120 // 120 seconds

const initialState = {
  // we initialize the state by populating the bench with a shuffled collection of heroes
  bench: shuffle(HEROES),
  [COMICS.AP]: [],
  [COMICS.AS]: [],
  [COMICS.DP]: [],
  [COMICS.DR]: [],
  [COMICS.OO]: [],
  [COMICS.PP]: [],
  gameState: GAME_STATE.READY,
  timeLeft: 0,
  player: ''
}

class App extends React.Component {
  state = initialState

  startGame = (player) => {
    this.currentDeadline = Date.now() + GAME_DURATION
    this.setState(
      {
        player: player,
        gameState: GAME_STATE.PLAYING,
        timeLeft: getTimeLeft(this.currentDeadline),
      },
      this.gameLoop
    )
  }

  gameLoop = () => {
    this.timer = setInterval(() => {
      const timeLeft = getTimeLeft(this.currentDeadline)
      const isTimeout = timeLeft <= 0
      if (isTimeout && this.timer) {
        clearInterval(this.timer)
      }

      this.setState({
        timeLeft: isTimeout ? 0 : timeLeft,
        ...(isTimeout ? { gameState: GAME_STATE.DONE } : {}),
      })
    }, 1000)
  }

  endGame = () => {

    if (this.timer) {
      clearInterval(this.timer)
    }

    this.setState({
      gameState: GAME_STATE.DONE
    })
  }

  resetGame = () => {
    this.setState(initialState)
  }

  onDragEnd = ({ source, destination }) => {
    if (!destination) {
      return
    }

    this.setState(state => {
      return move(state, source, destination)
    })
  }


  render() {
    const { gameState, timeLeft, bench, ...groups } = this.state
    const isDropDisabled = gameState === GAME_STATE.DONE

    return (
      <>
        <Header gameState={gameState} timeLeft={timeLeft} endGame={this.endGame} />
        {this.state.gameState !== GAME_STATE.PLAYING && (
          this.state.gameState === GAME_STATE.READY ? 
          <ModalReady
            startGame={this.startGame}
          /> :
          <ModalEnd
            player={this.state.player}
            groups={groups}
            timeLeft={timeLeft}
            resetGame={this.resetGame}
          />
        )}
        {(this.state.gameState === GAME_STATE.PLAYING ||
          this.state.gameState === GAME_STATE.DONE) && (
            <Content 
              onDragEnd={this.onDragEnd}
              heroes={bench}
              isDropDisabled={isDropDisabled}
              curState={this.state}
            />
        )}
        <Footer />
      </>
    )
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}

export default App

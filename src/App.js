import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import { HEROES, COMICS } from './custom/data'
import { shuffle, getTimeLeft, move, GAME_STATE } from './custom/utils'

import ModalReady from './components/ModalReady'
import ModalEnd from './components/ModalEnd'
import Header from './components/Header'
import Dropzone from './components/Dropzone'
import Footer from './components/Footer'

import './app.css';

const GAME_DURATION = 1000 * 90 // 90 seconds

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
    console.log('player', player)

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
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="container-fluid d-flex flex-column">
              <div className="columns">
                <div className="col-3">
                  <Dropzone
                    id="bench"
                    heroes={bench}
                    isDropDisabled={isDropDisabled}
                  />
                </div>
                <div className="col-3">
                  <Dropzone
                    id={COMICS.DR}
                    heroes={this.state[COMICS.DR]}
                    isDropDisabled={isDropDisabled}
                  />
                  <Dropzone
                    id={COMICS.OO}
                    heroes={this.state[COMICS.OO]}
                    isDropDisabled={isDropDisabled}
                  />
                </div>
                <div className="col-3">
                  <Dropzone
                    id={COMICS.PP}
                    heroes={this.state[COMICS.PP]}
                    isDropDisabled={isDropDisabled}
                  />
                  <Dropzone
                    id={COMICS.AP}
                    heroes={this.state[COMICS.AP]}
                    isDropDisabled={isDropDisabled}
                  />
                </div>
                <div className="col-3">
                  <Dropzone
                    id={COMICS.AS}
                    heroes={this.state[COMICS.AS]}
                    isDropDisabled={isDropDisabled}
                  />
                  <Dropzone
                    id={COMICS.DP}
                    heroes={this.state[COMICS.DP]}
                    isDropDisabled={isDropDisabled}
                  />
                </div>
              </div>
            </div>
          </DragDropContext>
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

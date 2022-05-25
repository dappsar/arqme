import React from 'react'

import { getTotalScore, persistsScoreAsync } from '../custom/utils'
import { api as apiHighScores } from '../services/apiHighScores'
import LoadingSpinner from './LoadingSpinner'

class ModalEnd extends React.Component {

  constructor(props) {
    super(props)

    this.state = { 
      player: props.player,
      groups: props.groups,
      timeLeft: props.timeLeft,
      resetGame: props.resetGame,
      hg: {},
      totalScore: 0
    }
  }

  async componentDidMount() {
    const tscore = getTotalScore(this.state.groups, this.state.timeLeft)
    await persistsScoreAsync(this.state.player, tscore)

    const result  =
    await apiHighScores.getHighScore().then(function (data) {
      return data.sort (function (a, b) {
        return parseFloat(b.score) - parseFloat(a.score)
      })
    })
    this.setState({ hg: result, totalScore: tscore })
    console.log(this.state)
  }

  HighScores = (e) => {
    if (Object.keys(this.state.hg).length === 0) {
      return (
        <>
          <div className="modal-title h7">High Scores:</div>
          <LoadingSpinner/>
        </>
      )
    } else {
      return (
        <>
          <div className="modal-title h7">High Scores:</div>
          <ul>
            {this.state.hg.map(item => {
              return <li key={item.id}>{item.name}: {item.score}</li>;
            })}
          </ul>
        </>
      )
    }
  }

  render () {
    return (
      <div className="modal modal-sm active">
        <div className="modal-overlay" />
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title h5">Digital Architecture Game!</div>
          </div>
          <div className="modal-body">
            <div className="content h6">
              {' '}
                {`You scored: ${ getTotalScore(this.state.groups, this.state.timeLeft) }`}
            </div>
            <hr></hr>
            <div className="content">
              <this.HighScores/>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={this.state.resetGame}>
              Restart game
            </button>
          </div>
        </div>
      </div>
    )
  }

}

export default ModalEnd

/*
              <ul>
                {this.state.hg && this.state.hg.map(el => (
                  <li>
                    {el.name}: {el.score}
                  </li>
                ))}
              </ul>

*/
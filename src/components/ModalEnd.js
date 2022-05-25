import React from 'react'

import { getTotalScore, persistsScoreAsync } from '../custom/utils'
import { api as apiHighScores } from '../services/apiHighScores'

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
            <br/>
            <hr></hr>
            <div className="content">
              <div className="modal-title h7">High Scores:</div>
                {this.state.hg.length}
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
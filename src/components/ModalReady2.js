import React from 'react';

const initialState = Object.freeze({player: ''})

class ModalReady extends React.Component {
  state = initialState

  handleInputPlayerChange = (e) => {
    this.setState (
      {
        player: e.target.value.trim()
      }
    )
  }

  render() {
    return (
      <div className="modal modal-sm active">
        <div className="modal-overlay" />
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title h5">Digital Architecture Game!</div>
          </div>
          <div className="modal-body">
            <div className="content">
              <span>
                {`Drag and Drop the words in the correct bucket list, sort them alphabetically and quickly for better score!`}
              </span>
              <br/><br/>
              <label>
                Player
                <input
                  type="text"
                  className="form-control"
                  placeholder="Player Name"
                  onChange={this.handleInputPlayerChange}
                  id="player"
                  required/>
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-primary"
              onClick={() => this.props.startGame(this.state.player)}
              disabled={this.state.player === ''}
              >
              Start new game
            </button>
          </div>
        </div>
      </div>
    )
  }

}

export default ModalReady

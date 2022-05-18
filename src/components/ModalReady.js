import React from 'react'

import ImageComponent from "./ImageComponent"
import "./modalReady.css"

const initialState = Object.freeze({
  player: '',
  key: 'home'
})

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
      <div className="modal modal-dialog-centered active">
        <div className="modal-container">
          <div className="modal-header">


            <div className="modal-title h3">Digital Architecture Game!</div>
            <hr/>
          </div>
          <div className="modal-body m-0">
            <div className="content container-fluid d-flex flex-column">
              <div className="col-md-6 m-1 text-center">
                <label>
                  <strong>Instructions</strong>
                  <br/><br/>
                  <p>
                    Drag and Drop the words in the correct bucket list
                  </p>
                  <small>
                    (TIP: Sort items alphabetically and quickly for better score!)
                  </small>
                </label>
                <br/>
                <label>
                  <br/>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Player Name"
                    onChange={this.handleInputPlayerChange}
                    id="player"
                    required/>
                </label>
              </div>
              <div className="col-md-6 m-left-2 text-center">
                <label>
                  <strong>Buckets list and words</strong>
                  <br/><br/>
                </label>
                <ImageComponent />
              </div>
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

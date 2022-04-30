import React from 'react'

const handleInputPlayerChange = (e) => {
  console.log('e',e)
  /*
  updateFormData({
    ...formData,

    // Trimming any whitespace
    [e.target.name]: e.target.value.trim()
  });
  */
}

const ModalReady = ({ startGame }) => (
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
              class="form-control"
              placeholder="Player Name"
              onChange={handleInputPlayerChange}
              id="player"
              required/>
          </label>
        </div>
      </div>
      <div className="modal-footer">
        <button
          className="btn btn-primary" onClick={() => startGame('sss')}>
          Start new game
        </button>
      </div>
    </div>
  </div>
)

export default ModalReady;

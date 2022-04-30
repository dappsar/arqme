import React from 'react';

import { getTotalScore } from '../custom/utils';


const ModalEnd = ({ player, groups, timeLeft, resetGame }) => (
  <div className="modal modal-sm active">
    <div className="modal-overlay" />
    <div className="modal-container">
      <div className="modal-header">
        <div className="modal-title h5">Digital Architecture Game!</div>
      </div>
      <div className="modal-body">
        <div className="content h6">
          {' '}
            {`You scored: ${getTotalScore(groups, timeLeft, player)}`}
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn btn-primary" onClick={resetGame}>
          Restart game
        </button>
      </div>
    </div>
  </div>
);

export default ModalEnd;

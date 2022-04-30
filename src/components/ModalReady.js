import React from 'react';

const Content = () => {
  return (
    <div className="content h6">
      {' '}
      {`Drag and Drop the words in the correct bucket list, sort them alphabetically and quickly for better score...`}
    </div>
  )
}

const ModalReady = ({ startGame }) => (
  <div className="modal modal-sm active">
    <div className="modal-overlay" />
    <div className="modal-container">
      <div className="modal-header">
        <div className="modal-title h5">Digital Architecture Game!</div>
      </div>
      <div className="modal-body">
       <Content />
      </div>
      <div className="modal-footer">
        <button
          className="btn btn-primary" onClick={() => startGame('sss')}>
          Start new game
        </button>
      </div>
    </div>
  </div>
);

export default ModalReady;

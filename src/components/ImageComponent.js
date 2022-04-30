import React from "react";
import "./ImageComponent.css";

import stackImage from './images/stack.jpg';

export default class ImageComponent extends React.Component {
  state = { isOpen: false };

  handleShowDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div>
        <img
          className="image"
          src={stackImage}
          onClick={this.handleShowDialog}
          alt="not ofund"
        />
        {this.state.isOpen && (
          <dialog
            className="dialog"
            style={{ position: "absolute" }}
            open
            onClick={this.handleShowDialog}
          >
            <img
              className="small"
              src={stackImage}
              onClick={this.handleShowDialog}
              alt="not found"
            />
          </dialog>
        )}
      </div>
    )
  }
}

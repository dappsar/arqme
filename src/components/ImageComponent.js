import React from "react";
import "./ImageComponent.css";

export default class ImageComponent extends React.Component {
  state = { isOpen: false };

  handleShowDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div>
        <img
          data-toggle="tooltip"
          data-placement="top"
          title="Click to enlarge"
          className="image-small"
          src='./images/stack.jpg'
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
              className="image-big"
              src='./images/stack.jpg'
              onClick={this.handleShowDialog}
              alt="not found"
            />
          </dialog>
        )}
      </div>
    )
  }
}

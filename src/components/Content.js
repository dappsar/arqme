import React from 'react';
import { COMICS } from '../custom/data'
import Dropzone from './Dropzone'
import { DragDropContext } from 'react-beautiful-dnd'

import "./content.css";

class Content extends React.Component {

  render() {

    return (
      <DragDropContext onDragEnd={this.props.onDragEnd}>
        <div className="columns">
          <div className="col-2 left">
            <Dropzone
              id="bench"
              heroes={this.props.heroes}
              isDropDisabled={this.props.isDropDisabled}
            />
          </div>
          <div className="col-5 right">
            <div className="columns">
              <div className="col-4">
                <Dropzone
                  id={COMICS.AP}
                  heroes={this.props.curState[COMICS.AP]}
                  isDropDisabled={this.props.isDropDisabled}
                />
              </div>
              <div className="col-4">
                <Dropzone
                  id={COMICS.AS}
                  heroes={this.props.curState[COMICS.AS]}
                  isDropDisabled={this.props.isDropDisabled}
                />
              </div>
              <div className="col-4">
                <Dropzone
                  id={COMICS.DP}
                  heroes={this.props.curState[COMICS.DP]}
                  isDropDisabled={this.props.isDropDisabled}
                />
              </div>
            </div>
          </div>
          <div className="col-5">
          <div className="columns">
              <div className="col-4">
                <Dropzone
                  id={COMICS.DR}
                  heroes={this.props.curState[COMICS.DR]}
                  isDropDisabled={this.props.isDropDisabled}
                />
              </div>
              <div className="col-4">
                <Dropzone
                    id={COMICS.OO}
                    heroes={this.props.curState[COMICS.OO]}
                    isDropDisabled={this.props.isDropDisabled}
                  />
              </div>
              <div className="col-4">
                <Dropzone
                    id={COMICS.PP}
                    heroes={this.props.curState[COMICS.PP]}
                    isDropDisabled={this.props.isDropDisabled}
                  />
              </div>
            </div>
          </div>

  
          
        </div>
      </DragDropContext>
    )
  }

}

export default Content


import React, { Component, PropTypes } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FlatButton from 'material-ui/FlatButton';
import Logo from '../../../logo.png';

export class ShowSquare extends Component {

  constructor(props) {
    super(props);
    this.state = {
      temp: null
    }
  }

  static PropTypes = {
    id: PropTypes.string.isRequired,
    content: PropTypes.array.isRequired,
  };

  addToFav  (index) {
    console.log("add rest call to add show to index", this.props.content[index]);
  };

  viewShow (index) {
    console.log("add router call to change the route as well as make an action call for this show",this.props.content[index])
  }

  render () {
    const currContent = this.props.content;
    const id = this.props.id;
    return (
      <div id={`${id}-grid`}>
        <GridList id={`${id}-grid-list`} cols={5.1} >
          {currContent.map((content, index) => (
            <GridTile
              id={`${content.title}-grid-title`}
              key={index}
              title={
                <FlatButton
                  label={`${content.title}\n${content.year}`}
                  primary
                  style={{textAlign: 'left', fontStyle: 'Arial'}}
                  labelStyle={{fontSize: 10}}
                  onClick={ () => {this.viewShow(index) }}
                />
              }
              style={{textAlign: 'left'}}
              actionIcon={
                <IconButton
                  onClick={ () => {this.addToFav(index) }}
                >
                  <StarBorder />
                </IconButton>
              }
            >
              <img src={content.poster && content.poster != 'N/A' ? content.poster : Logo} />
            </GridTile>
          ))}
        </GridList>
      </div>
    )
  }

}

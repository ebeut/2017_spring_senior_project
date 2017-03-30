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
      <div id={`${id}-grid`} style={{padding:4, width: 1065, margin:'0 auto'}}>
        <GridList id={`${id}-grid-list`} cols={5} cellHeight={295} style={{width: 1065}}>
          {currContent.map((content, index) => (
            <GridTile
              id={`${content.title}-grid-title`}
              key={index}
              title={
                <FlatButton
                  label={`${content.title}\n(${content.year})`}
                  primary
                  style={{textAlign: 'left', color: 'white'}}
                  labelStyle={{fontSize: 12, fontWeight: 'bold'}}
                  onClick={ () => {this.viewShow(index) }}
                />
              }
              style={{textAlign: 'left'}}
              actionIcon={
                <IconButton
                  onClick={ () => {this.addToFav(index) }}
                >
                  <StarBorder color='white'/>
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

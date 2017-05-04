import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {GridList, GridTile} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import ImageNA from '../../images/ImageNA.png';
import { browserHistory } from 'react-router';

export class ShowSquare extends Component {

  static PropTypes = {
    id: PropTypes.string.isRequired,
    content: PropTypes.array.isRequired,
    getShowInfo: PropTypes.func,
  };

  viewShow (index) {
    this.props.getShowInfo(this.props.content[index].id);
    browserHistory.push('/showInfo');
  }

  render () {
    const currContent = this.props.content;
    const id = this.props.id;
    return (
      <div id={`${id}-grid`} style={{padding:20, width: 1065, margin:'0 auto'}}>
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
            >
              <img src={content.poster && content.poster != 'N/A' ? content.poster : ImageNA} />
            </GridTile>
          ))}
        </GridList>
      </div>
    )
  }

}

import { connect } from 'react-redux';
import ShowInfoPage from './show-info';
import {
  getShowSeasonInfo,
  addFavorite,
  delEpisode,
  addEpisode,
  delFavorite,
  getEpisodes ,
} from './action';

const mapDispatchToProps = {
  getShowSeasonInfo,
  addFavorite,
  delEpisode,
  addEpisode,
  delFavorite,
  getEpisodes,
};

const mapStateToProps = (state) => ({ showInfo : state.showInfo });

export default connect(mapStateToProps, mapDispatchToProps)(ShowInfoPage)

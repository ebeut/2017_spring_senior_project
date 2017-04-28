import { connect } from 'react-redux';
import ShowInfoPage from './show-info';
import {
  getShowSeasonInfo,
  addFavorite,
  delEpisode,
  addEpisode,
  delFavorite,
  getEpisodes ,
  getFav,
} from './action';
import { isLogin, logout } from '../login/action';

const mapDispatchToProps = {
  getShowSeasonInfo,
  addFavorite,
  delEpisode,
  addEpisode,
  delFavorite,
  getEpisodes,
  isLogin,
  logout,
  getFav,
};

const mapStateToProps = (state) => ({ showInfo : state.showInfo, userData: state.userData });

export default connect(mapStateToProps, mapDispatchToProps)(ShowInfoPage)

import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import reducer from './redux/reducer';


export default createStore(reducer,/* preloadedState, */ devToolsEnhancer(
));
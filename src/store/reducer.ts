import * as actions from './actions';
import { Action, AppState } from './type';

const initialState = {
  currentHero: void 0,
  heroLoading: false
};

const reducer = (state: AppState = initialState, action: Action): AppState => {
  switch (action.type) {
    case actions.SET_HERO:
      return {
        ...state,
        currentHero: action.value
      };
    case actions.HERO_LOADING:
      return {
        ...state,
        heroLoading: action.value
      };
  }

  return state;
}

export default reducer;

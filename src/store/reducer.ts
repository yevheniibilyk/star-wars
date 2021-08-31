import * as actions from './actions';
import { Action, AppState } from './type';

const initialState = {
  loading: false,
  heroLoading: false,
  pagination: {
    pages: {},
    total: 0,
    loading: false
  }
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

    case actions.HEROES_PAGE_LOADING:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          loading: action.value
        }
      };

    case actions.SET_HEROES_TOTAL:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          total: action.value
        }
      };

    case actions.SET_HEROES_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          pages: {
            ...state.pagination.pages,
            ...action.value
          }
        }
      };
  }

  return state;
}

export default reducer;

import * as actions from './actions';
import { fetchHero } from '../api';
import { DispatchType } from './type';
import store from './store';
import getHeroIdFromUrl from '../components/HeroesList/utils/getHeroIdFromUrl';

export function getCurrentHero(heroId: string) {
  return (async (dispatch: DispatchType) => {
    dispatch({
      type: actions.HERO_LOADING,
      value: true
    });

    const currentHero = store.getState().currentHero;

    if (currentHero && getHeroIdFromUrl(currentHero.url).toString() === heroId) {
      dispatch({
        type: actions.SET_HERO,
        value: currentHero
      });

      return dispatch({
        type: actions.HERO_LOADING,
        value: false
      });
    }

    try {
      const hero = await fetchHero(heroId);

      dispatch({
        type: actions.SET_HERO,
        value: hero
      });
    } catch (e) {
      dispatch({
        type: actions.SET_HERO,
        value: void 0
      });
    } finally {
      dispatch({
        type: actions.HERO_LOADING,
        value: false
      });
    }

    return null;
  });
}

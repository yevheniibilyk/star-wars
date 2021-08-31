import * as actions from './actions';
import _get from 'lodash.get';
import { fetchHero, fetchHeroesPage } from '../api';
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

export function getHeroesPage(page: number) {
  return (async (dispatch: DispatchType) => {
    const currentPageData = _get(store.getState().pagination, `pages[${page}]`, void 0);

    if (currentPageData) {
      return;
    }

    try {
      dispatch({
        type: actions.HEROES_PAGE_LOADING,
        value: true
      });

      const { total, heroes } = await fetchHeroesPage(page);

      dispatch({
        type: actions.SET_HEROES_TOTAL,
        value: total
      });
      dispatch({
        type: actions.SET_HEROES_PAGE,
        value: { [page]: heroes }
      });
    } catch {
      dispatch({
        type: actions.SET_HEROES_PAGE,
        value: { [page]: [] }
      });
    }
    finally {
      dispatch({
        type: actions.HEROES_PAGE_LOADING,
        value: false
      });
    }

    return;
  });
}


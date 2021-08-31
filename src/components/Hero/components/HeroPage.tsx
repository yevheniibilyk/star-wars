import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { CircularProgress } from '@material-ui/core';
import { getCurrentHero } from '../../../store/actionCreators';
import { Hero } from '../../../types/Hero';
import HeroCard from './HeroCard';
import '../styles/_hero-page.scss';
import { AppState } from '../../../store/type';

function HeroPage(props: RouteComponentProps) {
  const hero: Hero | undefined = useSelector((state: AppState) => state.currentHero);
  const loading: boolean = useSelector((state: AppState) => state.heroLoading);

  const { match: { params } } = props;

  // @ts-ignore
  const heroId = params.id;

  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(getCurrentHero(heroId));
  }, [dispatch]);


  if (loading) {
    return <CircularProgress className="hero-page__loader" />;
  }

  if (!hero) {
    return (
      <div className="hero-page__not-found">
        Not Found
      </div>
    );
  }

  return (
    <div className="hero-page">
      <HeroCard hero={hero} />
    </div>
  );
}

export default withRouter(HeroPage);

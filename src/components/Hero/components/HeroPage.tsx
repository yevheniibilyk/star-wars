import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { Hero } from '../../../types/Hero';
import { axios } from '../../../utils';
import HeroCard from './HeroCard';
import '../styles/_hero-page.scss';

type HeroPageState = {
  hero?: Hero;
  loading: boolean,
  error: boolean
};

class HeroPage extends Component<RouteComponentProps, HeroPageState> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      hero: void 0,
      loading: false,
      error: false
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;

    //@ts-ignore
    this.getHeroById(params.id);
  }

  getHeroById = async (id: string) => {
    try {
      this.setState({ loading: true });

      const { data: hero }: any = await axios.get(`/hero/${id}`);

      this.setState({ hero });
    } catch (e) {
      this.setState({ error: true })
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, hero, error } = this.state;

    if (loading) {
      return <CircularProgress className="hero-page__loader" />;
    }

    if (error || !hero) {
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
}

export default withRouter(HeroPage);

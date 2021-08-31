import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HeroPage from './HeroPage';
import store from '../../../store';
import { Provider } from 'react-redux';
import { fetchHero } from '../../../api';

const MOCK_HERO = {
  name: 'Luke Skywalker',
  height: '172',
  gender: 'male',
  mass: '83',
  skin_color: 'white',
  eye_color: 'blue',
  birth_year: '1999'
}

jest.mock('../../../api/heroes', () => ({
  fetchHero: jest.fn(() => Promise.resolve(MOCK_HERO))
}));

function renderHeroPage(props = {}) {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <HeroPage {...props} />
      </BrowserRouter>
    </Provider>
  )
}

describe('HeroPage', () => {
  afterEach(() => {
    jest.resetModules();
  });

  test('should be able to render HeroPage', async () => {
    // @ts-ignore
    fetchHero.mockImplementationOnce(() => Promise.resolve(MOCK_HERO));

    const { container } = await renderHeroPage({ match: { params: { id: 2 } } });

    expect(container).toMatchSnapshot();
    expect(screen.getByText(MOCK_HERO.name)).toBeInTheDocument();
  });
});

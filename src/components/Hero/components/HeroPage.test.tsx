import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HeroPage from './HeroPage';
import { axios } from '../../../utils';

const MOCK_HERO = {
  name: 'Luke Skywalker',
  height: '172',
  gender: 'male',
  mass: '83',
  skin_color: 'white',
  eye_color: 'blue',
  birth_year: '1999'
}

jest.mock('../../../utils/axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: MOCK_HERO }))
}))

function renderHeroPage(props = {}) {
  return render(
    <BrowserRouter>
      <HeroPage {...props} />
    </BrowserRouter>
  )
}

describe('HeroPage', () => {
  test('should be able to render HeroPage', async () => {
    // @ts-ignore
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: MOCK_HERO }));

    const { container } = await renderHeroPage({ match: { params: { id: 2 } } });

    expect(container).toMatchSnapshot();
    expect(screen.getByText(MOCK_HERO.name)).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalled();
  });

  test('should be able to handle request errors', async () => {
    // @ts-ignore
    axios.get.mockImplementationOnce(() => Promise.reject(new Error('404')));

    await renderHeroPage({ match: { params: { id: 2 } } });

    expect(screen.getByText('Not Found')).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalled();
  });
});

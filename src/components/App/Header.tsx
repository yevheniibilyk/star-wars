import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Star_Wars_logo.svg';

const Header = () => {
  return (
    <div className="app__header">
      <Link to="/">
        <img
          className="app__header__img"
          width={300}
          height={100}
          src={logo}
        />
      </Link>
    </div>
  );
};

export default Header;
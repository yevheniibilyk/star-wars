import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          <Link className="app__header__btn" to="/">
            Star Wars Universe
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
import React, { memo } from 'react';
import '../styles/_hero-page.scss';
import { Typography } from '@material-ui/core';

type ParamProps = {
  name: string;
  value: string;
}

function Param({ name, value }: ParamProps) {
  return (
    <div className="hero-card__param">
      <Typography color="textSecondary">
        {name}:
      </Typography>
      <Typography color="textSecondary">
        {value}
      </Typography>
    </div>
  );
}

export default memo<ParamProps>(Param);

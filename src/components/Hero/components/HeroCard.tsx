import React, { memo } from 'react';
import {Hero} from "../../../types/Hero";
import {Card, CardContent, CardMedia, Typography} from "@material-ui/core";
import Img from "../../../images/s-l300.jpg";
import Param from "./Param";
import '../styles/_hero-card.scss';

type HeroCardProps = {
  hero: Hero;
}

function HeroCard({ hero }: HeroCardProps) {
  return (
    <Card className="hero-card">
      <CardMedia
        className="hero-card__image"
        image={Img}
      />
      <CardContent className="hero-card__content">
        <Typography component="h4" variant="h4">
          {hero.name}
        </Typography>
        <Param name="Height" value={hero.height} />
        <Param name="Gender" value={hero.gender} />
        <Param name="Mass" value={hero.mass} />
        <Param name="Skin color" value={hero.skin_color} />
        <Param name="Eye color" value={hero.eye_color} />
        <Param name="Birth year" value={hero.birth_year} />
      </CardContent>
    </Card>
  );
}

export default memo<HeroCardProps>(HeroCard);
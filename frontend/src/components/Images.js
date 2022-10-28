import React from "react";
import avocadoImage from '../images/avocado-gil-ndjouwou.jpg';
import peanutButterImage from '../images/peanut-butter-corleto.jpg'
import carrotImage from '../images/carrot-david.jpg'
import eggImage from '../images/egg-louis-hansel.jpg'
import Image from './Image';
import { Grid } from '@material-ui/core';

const Images = () =>{

    return(
        <Grid>
        <div className="homePageImageContainer">
            <Image  image_src={avocadoImage}  id='avocado'/>{' '}
            <Image  image_src={peanutButterImage} id='peanut butter'/>{' '}
            <Image  image_src={carrotImage} id='carrot'/>{' '}
            <Image  image_src={eggImage} id='egg'/>{' '}
        </div>
        </Grid>
    )
}

export default Images
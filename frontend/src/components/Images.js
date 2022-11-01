import React from "react";
import avocadoImage from '../images/avocado-gil-ndjouwou.jpg';
import peanutButterImage from '../images/peanut-butter-corleto.jpg'
import carrotImage from '../images/carrot-david.jpg'
import eggImage from '../images/egg-louis-hansel.jpg'
import Image from './Image';
import { Grid } from '@material-ui/core';
import Row from 'react-bootstrap/Row';

const Images = () =>{

    return(
        <Grid>
        <div className="homePageImageContainer">

            <Row className='row-cols-1 row-cols-md-4 g-3 ms-2 me-2'>
            <Image  image_src={avocadoImage}  id='avocado' style='recipe_img'/>{' '}
            <Image  image_src={peanutButterImage} id='peanut butter' style='recipe_img' />{' '}
            <Image  image_src={carrotImage} id='carrot' style='recipe_img' />{' '}
            <Image  image_src={eggImage} id='egg' style='recipe_img'/>{' '}
            </Row>
        </div>
        </Grid>
    )
}

export default Images
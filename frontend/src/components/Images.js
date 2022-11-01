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

            <Row className='row-cols-1 row-cols-md-4 g-5 mt-5 ms-5 me-0'>
            <Image  image_src={avocadoImage}  id='avocado'/>{' '}
            <Image  image_src={peanutButterImage} id='peanut butter'/>{' '}
            <Image  image_src={carrotImage} id='carrot'/>{' '}
            <Image  image_src={eggImage} id='egg'/>{' '}
            </Row>
        </div>
        </Grid>
    )
}

export default Images
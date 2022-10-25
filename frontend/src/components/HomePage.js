import React from 'react'
import Image from './Image';
import { Grid, Typography } from '@material-ui/core';
import avocadoImage from '../images/avocado-irene-kredenets.jpg';


const HomePage = () => {
    const set1 = {
        width: 150,
        height: 200
    }
    return(
        <Grid container spacing={1} align='center'>
                <Grid>
                    <Typography>
                        Some Ingredients
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    
                    <Image style={set1} 
                    image_src={avocadoImage} id='avocado'/>
                </Grid>              
            </Grid>
    )
}

export default HomePage

import React, { useState,useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { faHeart, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';




const BlackTypography = withStyles({
    root: {
        color: "black",
        fontFamily: 'Fuzzy Bubbles',
        fontSize: 26,
 
    }
    })(Typography);

const BlackTypographySm = withStyles({
    root: {
        color: "black",
        fontFamily: 'Fuzzy Bubbles',
        fontSize: 16,
    
    }
    })(Typography);

const Recipe = () => {
    let { recipeID } = useParams();
    const [recipe, setRecipe] = useState([]);
    const [safeToRender, setSafeToRender] = useState();
    const [toggleHeart, setToggleHeart] = useState(false);
    const [aggregateLikes, setAggregateLikes] = useState();
    const isInitialMount = useRef(true);


    const changeColor = () =>{
        setToggleHeart(!toggleHeart)
        window.location.reload();

    }

    useEffect( () => {
        const fetchRecipeByID = async() => {
            try{
                const response = await fetch('/api/searchRecipeByID/?id='+recipeID);
                if (!response.ok){
                    throw new Error("Status code error :" + response.status);
                }
                else{
                    let data = await response.json();
                    if (!Array.isArray(data)){
                        data = [data]
                    }
                    setRecipe(data);
                    setSafeToRender(true);
                    setAggregateLikes(data[0]['aggregateLikes'])

                }
            }catch(err){
                console.log(err)
            }
        }
        fetchRecipeByID();
    }, [])
    
    useEffect( () => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
         } else {
            let requestBody = recipe
            if (!Array.isArray(recipe)){
                requestBody = [recipe]
            }
            const requestOption = {
                method: 'POST', 
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(requestBody),
            };
            const sendRequest = async() =>{
                await fetch('/api/searchRecipeByID/', requestOption);
            };
            sendRequest();  
         }
        
    }, [recipe])

    useEffect( () => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
         } else {
         
            const requestBody = {
                'id' : recipeID,
                'aggregateLikes' : aggregateLikes + 1
            }

            const requestOption = {
                method: 'POST', 
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify([requestBody]),
            };

            const sendRequest = async() =>{
                await fetch('/api/searchRecipeByID/', requestOption);
            };
            sendRequest();
            
         }
        
        

    }, [toggleHeart])

    return( 
        <div className='center-screen'  style={{ backgroundColor: '#FFDF00' }}>  
        {
            safeToRender === null ? (
                <div class="loader">
                    <div class="circles">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                    </div>
                    <div class="pacman">
                        <span class="top"></span>
                        <span class="bottom"></span>
                        <span class="left"></span>
                        <div class="eye"></div>
                    </div>
                    </div>
            ):( 
            <div>
                {recipe?.map( elem => (
                <li key={elem.id} style={{listStyleType: 'None'}}>
                    <Grid container spacing={3}>
                    <Grid container justifyContent='center'>
                        <Grid>
                        <BlackTypography>
                        {elem.title}   
                        </BlackTypography>
                        </Grid>
                        
                    </Grid>
                    
                    <Grid container
                        direction="row"
                        justifyContent='center'
                        item spacing={3}>   
                        <Grid item >                       
                            <img src={elem.image} style={{height: '300px', width: '450px'}}></img>          
                        </Grid>
                        <Grid item>
                            <Grid container direction='column' item spacing={3}>
                                <Grid item>
                                    <Grid container direction='row'>
                                        <div className={ toggleHeart ? 'heart active' : 'heart' } onClick={changeColor}>
                                        <FontAwesomeIcon icon={faHeart}  
                                                     className='fa-2x' 
                                                     style={{ verticalAlign:"middle"}}
                                                     />
                                        </div>
                                    
                                    <BlackTypographySm>{aggregateLikes}</BlackTypographySm>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction='row'>
                                    <FontAwesomeIcon icon={faClock}  className='fa-2x' style={{verticalAlign:'middle'}}/>
                                    <BlackTypographySm>Ready in {elem.readyInMinutes} min!</BlackTypographySm>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction='row'>
                                    <FontAwesomeIcon icon={faStethoscope}  className='fa-2x' style={{verticalAlign:'middle'}}/>
                                    <BlackTypographySm >Heath Score is: {elem.healthScore}</BlackTypographySm>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid>
                        <BlackTypographySm>{elem.summary}</BlackTypographySm>
                        <Button href="/" variant='dark'><p className='fuzzy_bubbles'>Take me to the main page!</p></Button>

                    </Grid>
                    
                    </Grid>

                </li>
                ))}
            </div>
            )
        }
        
        </div>   
     

        )   

}

export default Recipe
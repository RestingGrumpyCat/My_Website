import React from "react";
import RecipeHomePage from "./RecipeHomePage"
import { 
    BrowserRouter, 
    Routes, 
    Route 
} from "react-router-dom";
import Recipes from "./Recipes"

const App = () => {
    
    return(
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route index element={<RecipeHomePage />} />
                    <Route path='/recipes/:ingredient' element={<Recipes />} />

                </Route>
            </Routes>
        </BrowserRouter>
    );

}

export default App
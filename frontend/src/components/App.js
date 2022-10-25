import React from "react";
import HomePage from "./HomePage"
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
                    <Route index element={<HomePage />} />
                    <Route path="/recipes"  element={<Recipes ingredient='avocado' />} />

                </Route>
            </Routes>
        </BrowserRouter>
    );

}

export default App
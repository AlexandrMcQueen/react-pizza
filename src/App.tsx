import React from "react";
import './scss/index.scss'
import {Home} from "./pages/Home";
import {Route, Routes} from "react-router";
import {Cart} from "./pages/Cart";
import PizzaFull from "./pages/PizzaFull";
import MainLayout from "./components/layouts/MainLayout";
import NotFoundPage from "./components/NotFoundPage";

interface RoutesProps {
    children?: React.ReactNode;
    location?: Partial<Location> | string;
}
function App() {

    return (
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route path='react-pizza' element= {<Home/>}/>
                <Route path='pizza/:id' element={<PizzaFull/>}/>
                <Route path='cart' element={<Cart/>}/>
                <Route path= '*' element={<NotFoundPage/>}/>
            </Route>
        </Routes>
  );
}

export default App;

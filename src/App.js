import {Header} from "./components/Header/Header";
import {Categories} from "./components/Categories/Categories";
import {Sort} from "./components/Sort/Sort";
import {PizzaBlock} from "./components/PizzaBlock/PizzaBlock";
import {useEffect, useState} from "react";
import axios from "axios";
import Skeleton from "./components/UI/Skeleton";

function App() {


  const [pizzaBlockInfo, setPizzaBlockInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPizzaDate() {
      try {
        const response = await axios.get(
          "https://63c087ec99c0a15d28d7bb41.mockapi.io/pizzas"
        );
        setPizzaBlockInfo(response.data);
      } catch (err) {
        alert("Не вийшло завантажити список піц,перезавантажте сторінку!");
        console.error(err + " Error in getting pizza date");
      } finally {
        setIsLoading(false);
      }
    }

    getPizzaDate();
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>

          <h2 className="content__title">Всі піци</h2>

          <div className="content__items">
            {isLoading ? (
                <>
                  <Skeleton/>
                  <Skeleton/>
                  <Skeleton/>
                  <Skeleton/>

                </>
            ) : (
              pizzaBlockInfo.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Planner from "./Planner";
import AppleTrees from "./AppleTrees";
import { useState, useEffect } from "react";
import Basket from './Basket';


function App(){

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  function onAdd(tree) {
    const exist = cartItems.find(x => x.variety === tree.variety);
    if (!exist) {
      setCartItems([...cartItems, tree])
    }
  }

  function onRemove(tree) {
    const exist = cartItems.find(x => x.variety === tree.variety);
    if (exist) {
      setCartItems(cartItems.filter((x) => x.variety !== tree.variety))
    }
  }

  // useEffect(() => {
  //   fetch(`https://fruit-trees-api.herokuapp.com/appleTrees`)
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error(
  //         `This is an HTTP error: The status is ${response.status}`
  //       );
  //     }
  //     return response.json();
  //   })
  //   .then((actualData) => {
  //     setData(actualData);
  //     setError(null);
  //   })
  //   .catch((err) => {
  //     setError(err.message);
  //     setData(null);
  //   })
  //   .finally(() => {
  //     setLoading(false);
  //   });
  // }, []);


  return <div>
    <Header />
    <AppleTrees onAdd={onAdd} data={data} loading={loading} error={error} cartItems={cartItems} />
    <Basket onAdd={onAdd} onRemove={onRemove} cartItems={cartItems}/>
    <Planner cartItems={cartItems}/>
    <Footer />   
  </div>
};

export default App;
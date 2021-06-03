import React, { useState, useEffect } from "react";

import { getProducts } from "./helper/coreapicalls";
import Base from "./Base";

import "../styles.css";
import Card from "./Card";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false); //false means now its no error

  //Note:Before components mount up  your data should firstly run using useeffect and then component

  const loadAllProducts = () => {
    //getting all products
    getProducts()
      //throwing produts here
      .then((data) => {
        if (data.error) {
          setError(data.error); //setting ERROR IN (setError) up in BOX
          console.log(error); //is the variable (error) what error it is by printing out
        } else {
          //setting products here
          setProducts(data); //setting products if it doesnot have error
        }
      });
  };

  useEffect(() => {
    loadAllProducts();
  });

  return (
    //base injecting
    <Base title="Home Page" description="Welcome to Tshirt store">
      <h1>Home component</h1>
      <div className="row">
        {/* //getting products  */}
        {products.map((product, index) => {
          return (
            <div key={index} className="col-4 mb-4">
              {/* //Card injecting and product without bracket is a prop name */}
              <Card product={product} />
            </div>
          );
        })}
      </div>
    </Base>
  );
}

import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
//by click add to cat ,for redirecting to cart page
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { isAuthenticated } from "../auth/helper";

const Card = ({
  product, //product is prop name
  addtoCart = true, //addtoCart is true coz we want to show button highlighted and if false we will not show the Add to cart
  removeFromCart = false,
  //for getting onself reload when product is removed so we need vriable to use  and we will create reload and set reload state in cart
  reload = undefined,
  setReload = (f) => f, //functin(f){return f}
}) => {
  const [redirect, setRedirect] = useState(false);
  const [redirectSignin, setRedirectSignin] = useState(false);

  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescription = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "Default price";

  const addToCart = () => {
    if (isAuthenticated()) {
      //Two parameters coz we have given in cartHelper  one is item and next is callback ..so we need second one as call back
      addItemToCart(product, () => setRedirect(true));
      console.log("Added to cart");
    } else {
      if (!isAuthenticated()) {
        setRedirectSignin(true);
      }
    }
  };

  const getAredirectSigin = (redirectSignin) => {
    if (redirectSignin) {
      return <Redirect to="/signin" />;
    }
  };

  const getAredirectCart = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  //from function addToCart
  const showAddToCart = (addToCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            //TODO: handle this too
            removeItemFromCart(product.id);

            //calling setReload function and giving parameter as reload
            setReload(!reload);

            console.log("Product removed from cart");
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cartTitle}</div>
      <div className="card-body">
        {getAredirectSigin(redirectSignin)}
        {getAredirectCart(redirect)}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cartDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">{cartPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addToCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;

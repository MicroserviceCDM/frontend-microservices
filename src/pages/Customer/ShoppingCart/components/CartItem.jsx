import { faPlus, faSubtract } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const CartItem = (props) => {
  const [cart, setCart] = useState([]);
  const handleIncrement = () => {
    const updatedCart = cart.map((item) => {
      if (item.id === props.id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.location.reload();
  };

  const handleDecrement = () => {
    let updatedCart = cart.map((item) => {
      if (item.id === props.id) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    updatedCart = updatedCart.filter((item) => item.quantity > 0);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.location.reload();
  };

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  return (
    <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
      <div className="pb-4 md:pb-8 w-full md:w-40">
        <img
          className="w-full hidden md:block dark:text-white"
          src={props.image}
          alt={props.title}
        />
        <img className="w-full md:hidden" src={props.image} alt={props.title} />
      </div>
      <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
        <div className="w-full flex flex-col justify-start items-start space-y-8">
          <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-black dark:text-white">
            {props.title}
          </h3>
          {/* <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="text-sm leading-none text-gray-800"><span className="text-black underline">Style:</span> {props.style}</p>
                        <p className="text-sm leading-none text-gray-800"><span className="text-black underline">Size:</span> {props.size}</p>
                        <p className="text-sm leading-none text-gray-800"><span className="text-black underline">Color:</span> {props.color}</p>
                    </div> */}
        </div>
        <div className="flex justify-between space-x-8 items-start w-full">
          <p className="text-base xl:text-lg leading-6 dark:text-white">
            {props.price.toLocaleString()} vnd
            {/*<span className="text-red-300 line-through"> ${props.discountPrice}</span> */}
          </p>
          <div className="flex" style={{ marginTop: -8 }}>
            <button onClick={handleDecrement}>
              <FontAwesomeIcon
                className="text-black dark:text-white"
                icon={faSubtract}
              />
            </button>
            <p className="text-sm xl:text-xl leading-6 text-black border-solid border-2 border- px-4 py-2 dark:text-white">
              {props.quantity}
            </p>
            <button onClick={handleIncrement}>
              <FontAwesomeIcon
                className="text-black dark:text-white"
                icon={faPlus}
              />
            </button>
          </div>
          <p className="text-base xl:text-lg font-semibold leading-6 text-black dark:text-white">
            {props.total.toLocaleString()} vnd
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

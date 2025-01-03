import React from "react";

const FooterCart = (props) => {
  const handleClearCart = () => {
    props.onclickClearCart();
  };

  return (
    <footer className="mt-16">
      <hr className="border-t border-gray-200 dark:border-gray-700" />
      <div className="py-6">
        <h4 className="text-lg font-medium">
          Total:{" "}
          <span className="text-base font-bold text-blue-600">
            {props.totalPrice}$
          </span>
        </h4>
      </div>

      <div className="flex flex-col sm:flex-row justify-around mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md"
          onClick={handleClearCart}
        >
          Clear cart
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
          onClick={() => {
            alert("Navigate to checkout page!");
          }}
        >
          Check out
        </button>
      </div>
    </footer>
  );
};

export default FooterCart;
import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrderIdAndProducts,
  deleteOrderProduct,
  updateOrderProductQty,
} from "../store/order.js";
import { useGlobalContext } from "../context";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

function ShoppingCart() {
  const { isCartOpen, closeCart, _setCartQty, _setGuestCartQty } =
    useGlobalContext();
  const [guestCart, setGuestCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [guestCartTotal, setGuestCartTotal] = useState(0);
  const dispatch = useDispatch();
  const { order, user, isLoggedIn } = useSelector((state) => {
    return {
      order: state.order,
      user: state.auth,
      isLoggedIn: !!state.auth.id,
    };
  });

  useEffect(() => {
    user.id && !order.isComplete && dispatch(fetchOrderIdAndProducts(user.id));
  }, [user.id, isLoggedIn]);

  useEffect(() => {
    const amount = order.quantity.reduce((total, item) => {
      return (total += item.quantity);
    }, 0);
    _setCartQty(amount);
  }, [user, order.quantity]);

  useEffect(() => {
    const cartTotal = order.products.reduce((total, product) => {
      const qty = order.quantity.find(
        (item) => item.productId === product.id
      )?.quantity;
      return (total += product.price * qty);
    }, 0);
    setCartTotal(cartTotal);
  }, [order.quantity]);

  useEffect(() => {
    let guestCart = JSON.parse(window.localStorage.getItem("cart"));
    setGuestCart(guestCart);

    const cartTotal = guestCart?.reduce((total, product) => {
      const qty = product.quantity;
      return (total += product.price * qty);
    }, 0);
    setGuestCartTotal(cartTotal);

    const amount = guestCart?.reduce((total, item) => {
      return (total += item.quantity);
    }, 0);
    _setGuestCartQty(amount);
  }, [window.localStorage.cart]);

  const guestRemove = (id) => {
    let guestCart = JSON.parse(window.localStorage.getItem("cart"));
    let tempCart = guestCart.filter((product) => product.id !== id);
    window.localStorage.setItem("cart", JSON.stringify(tempCart));
    guestCart = JSON.parse(window.localStorage.getItem("cart"));
    setGuestCart(guestCart);
  };

  const guestQtyChange = (productId, qty) => {
    let guestCart = JSON.parse(window.localStorage.getItem("cart"));
    const tempCart = guestCart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: qty };
      }
      return item;
    });
    window.localStorage.setItem("cart", JSON.stringify(tempCart));
    guestCart = JSON.parse(window.localStorage.getItem("cart"));
    setGuestCart(guestCart);
  };

  return (
    <Transition.Root show={isCartOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-10"
        onClose={closeCart}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => closeCart()}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {isLoggedIn
                            ? order.products.map((product) => (
                                <li key={product.id} className="py-6 flex">
                                  <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                    <img
                                      src={product.imageUrl}
                                      alt={product.name}
                                      className="w-full h-full object-center object-cover"
                                    />
                                  </div>

                                  <div className="ml-4 flex-1 flex flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={product.href}>
                                            {product.name}
                                          </a>
                                        </h3>
                                        <p className="ml-4">
                                          ${product.price / 100}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.color}
                                      </p>
                                    </div>
                                    <div className="flex-1 flex items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        Qty
                                        <select
                                          className="border-none text-sm"
                                          value={
                                            order.quantity.find(
                                              (item) =>
                                                item.productId === product.id
                                            )?.quantity
                                          }
                                          onChange={(e) =>
                                            dispatch(
                                              updateOrderProductQty(
                                                order.orderId,
                                                product.id,
                                                Number(e.target.value)
                                              )
                                            )
                                          }
                                        >
                                          <option value="1">1</option>
                                          <option value="2">2</option>
                                          <option value="3">3</option>
                                          <option value="4">4</option>
                                          <option value="5">5</option>
                                          <option value="6">6</option>
                                          <option value="7">7</option>
                                          <option value="8">8</option>
                                          <option value="9">9</option>
                                          <option value="10">10</option>
                                        </select>
                                      </p>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() =>
                                            dispatch(
                                              deleteOrderProduct(
                                                order.orderId,
                                                product.id
                                              )
                                            )
                                          }
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))
                            : guestCart?.map((product) => (
                                <li key={product.id} className="py-6 flex">
                                  <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                    <img
                                      src={product.imageUrl}
                                      alt={product.name}
                                      className="w-full h-full object-center object-cover"
                                    />
                                  </div>

                                  <div className="ml-4 flex-1 flex flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={product.href}>
                                            {product.name}
                                          </a>
                                        </h3>
                                        <p className="ml-4">
                                          ${product.price / 100}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.color}
                                      </p>
                                    </div>
                                    <div className="flex-1 flex items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        Qty
                                        <select
                                          className="border-none text-sm"
                                          value={product.quantity}
                                          onChange={(e) =>
                                            guestQtyChange(
                                              product.id,
                                              Number(e.target.value)
                                            )
                                          }
                                        >
                                          <option value="1">1</option>
                                          <option value="2">2</option>
                                          <option value="3">3</option>
                                          <option value="4">4</option>
                                          <option value="5">5</option>
                                          <option value="6">6</option>
                                          <option value="7">7</option>
                                          <option value="8">8</option>
                                          <option value="9">9</option>
                                          <option value="10">10</option>
                                        </select>
                                      </p>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() =>
                                            guestRemove(product.id)
                                          }
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>
                        $
                        {isLoggedIn
                          ? (cartTotal / 100).toFixed(2)
                          : (guestCartTotal / 100).toFixed(2)}
                      </p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      {isLoggedIn ? (
                        <Link
                          to="/checkout"
                          onClick={() => closeCart()}
                          className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          Checkout
                        </Link>
                      ) : (
                        <Link
                          to="/guestUser"
                          onClick={() => closeCart()}
                          className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          Checkout
                        </Link>
                      )}
                    </div>
                    <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          className="text-indigo-600 font-medium hover:text-indigo-500"
                          onClick={() => closeCart()}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ShoppingCart;

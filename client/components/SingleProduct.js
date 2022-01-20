import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSingleProduct, deleteProductThunk } from "../store/singleProduct";
import { useHistory, useParams, Link } from "react-router-dom";
import { getAllProducts } from "../store/products";
import { addToCart } from "../store/order";
import { useGlobalContext } from "../context";

const SingleProduct = () => {
  let history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(4);
  const { _setGuestCartQty } = useGlobalContext();
  const [loadedProduct, setLoadedProduct] = useState({});

  const { singleProduct, adminStatus, allProducts } = useSelector((state) => {
    return {
      singleProduct: state.singleProduct.singleProduct,
      adminStatus: state.auth.adminStatus,
      allProducts: state.products.allProducts,
    };
  });
  const { user, isLoggedIn } = useSelector((state) => {
    return {
      user: state.auth,
      isLoggedIn: !!state.auth.id,
    };
  });

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleProduct(id));
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    setLoadedProduct(singleProduct);
  }, [singleProduct]);

  let similarProducts = allProducts.filter(
    (product) => product.gender === loadedProduct.gender
  );
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const someSimilarProducts = similarProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const guestAddToCart = (id, color, imageUrl, price, name) => {
    const guestCart = window.localStorage.getItem("cart");
    if (!guestCart) {
      window.localStorage.setItem(
        "cart",
        JSON.stringify([{ id, quantity: 1, color, imageUrl, price, name }])
      );
      _setGuestCartQty(1);
    } else {
      let tempCart = JSON.parse(guestCart);

      let item = tempCart.find((item) => item.id === id);
      if (!item) {
        tempCart.push({ id, quantity: 1, color, imageUrl, price, name });
        const amount = tempCart.reduce((total, item) => {
          return (total += item.quantity);
        }, 0);
        _setGuestCartQty(amount);
        window.localStorage.setItem("cart", JSON.stringify(tempCart));
      } else {
        tempCart = tempCart.map((item) => {
          if (item.id === id) {
            item.quantity < 10 && item.quantity++;
          }
          return item;
        });
        const amount = tempCart.reduce((total, item) => {
          return (total += item.quantity);
        }, 0);
        _setGuestCartQty(amount);
        window.localStorage.setItem("cart", JSON.stringify(tempCart));
      }
    }
  };

  const onClickDelete = (id) => {
    dispatch(deleteProductThunk(id));
    history.goBack();
  };

  return (
    <div className="container mx-auto px-6 pb-10">
      {!loadedProduct ? (
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/Ajux_loader.gif" />
      ) : (
        <div className="my-8">
          <div className="md:flex md:items-center">
            <div className="w-full h-64 md:w-1/2 lg:h-96">
              <img
                className="h-full w-full rounded-md max-w-lg mx-auto object-contain"
                src={loadedProduct.imageUrl}
              />
            </div>
            <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2  content-center items-center">
              <h3 className="text-gray-700 uppercase text-lg">
                {loadedProduct.name}
              </h3>
              <span className="text-gray-500 mt-3">
                ${(loadedProduct.price / 100).toFixed(2)}
              </span>
              <br />
              <hr className="my-3"></hr>
              <div className="mt-2">
                <div className="flex items-center mt-1"></div>
              </div>
              <br />
              <h6 className="text-gray-700  ">{loadedProduct.description}</h6>
              <div className="flex items-center mt-6 space-x-3">
                <button
                  onClick={() => {
                    isLoggedIn
                      ? dispatch(addToCart(user.id, loadedProduct.id))
                      : guestAddToCart(
                          loadedProduct.id,
                          loadedProduct.color,
                          loadedProduct.imageUrl,
                          loadedProduct.price,
                          loadedProduct.name
                        );
                  }}
                  className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                >
                  Add to Cart
                </button>
                {adminStatus && (
                  <Link to="/editProduct">
                    <button
                      className="px-8 py-2 bg-yellow-500 text-white text-sm font-medium rounded hover:bg-yellow-400 focus:outline-none focus:bg-yellow-400"
                      type="button"
                    >
                      Edit Product
                    </button>
                  </Link>
                )}
                {adminStatus && (
                  <button
                    className="px-8 py-2 bg-orange-700 text-white text-sm font-medium rounded hover:bg-orange-400 focus:outline-none focus:bg-orange-400"
                    onClick={() => onClickDelete(id)}
                    type="button"
                  >
                    Delete Product
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-gray-600 text-2xl font-medium">
              Similar Products
            </h3>
            {!someSimilarProducts.length === 0 ? (
              <div>Loading...</div>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                {someSimilarProducts.map((product) => {
                  return (
                    <div
                      key={product.id}
                      onClick={() => setLoadedProduct(product)}
                    >
                      <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                        <div className="flex-wrap">
                          <img
                            className="flex items-end justify-end h-56 w-full bg-cover object-contain"
                            src={product.imageUrl}
                          />
                        </div>
                        <div className="px-5 py-3">
                          <h3 className="text-gray-700 uppercase">
                            {product.name.split(" ").slice(0, 3).join(" ")}
                          </h3>
                          <span className="text-gray-500 mt-2">
                            ${(product.price / 100).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;

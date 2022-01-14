import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../store/products";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);

  const { allProducts } = useSelector((state) => {
    return { allProducts: state.products.allProducts };
  });

  // Bring in actions from store
  const dispatch = useDispatch();

  //dispatch from getProducts Thunk
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const someProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginateBack = () => {
    if (currentPage === 1) setCurrentPage(currentPage);
    else {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginateFront = () => {
    if (currentPage < 5) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div>
        <div className="text-center mt-2">
          <Pagination
            paginateFront={paginateFront}
            paginateBack={paginateBack}
            paginate={paginate}
            productsPerPage={productsPerPage}
            totalProducts={allProducts.length}
          />
        </div>

        {someProducts.length === 0 ? (
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/Ajux_loader.gif" />
        ) : (
          <div className="mx-auto container grid grid-cols-3 gap-2 mt-2">
            {someProducts.map((product) => {
              return (
                <Link key={product.id} to={`/allProducts/${product.id}`}>
                  <div className="w-full rounded border-2">
                    <img className="w-35 h-35" src={product.imageUrl} />
                    <div className="flex self-center justify-between mt-2  mb-2">
                      <div className="bold">{product.name}</div>

                      <div className="text-right content-center">
                        $ {(product.price / 100).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default AllProducts;

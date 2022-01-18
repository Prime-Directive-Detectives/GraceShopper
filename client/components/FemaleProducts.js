import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFemaleProducts } from "../store/products";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
const FemaleProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);

  const { femaleProducts } = useSelector((state) => {
    return { femaleProducts: state.products.femaleProducts };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFemaleProducts());
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const someFemaleProducts = femaleProducts.slice(
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
    if (currentPage < 3) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div>
      <div className="text-center mt-2">
        <Pagination
          paginateFront={paginateFront}
          paginateBack={paginateBack}
          paginate={paginate}
          productsPerPage={productsPerPage}
          totalProducts={femaleProducts.length}
        />
      </div>
      {someFemaleProducts.length === 0 ? (
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/Ajux_loader.gif" />
      ) : (
        <div className="mx-auto container grid grid-cols-3 gap-2 ">
          {someFemaleProducts.map((product) => {
            return (
              <Link key={product.id} to={`/allProducts/${product.id}`}>
                <div className="w-full h-full rounded border-2">
                  <img
                    className="max-w-full max-h-full"
                    src={product.imageUrl}
                  />

                  <div className="flex place-self-end justify-between mt-2  mb-2">
                    <div className="text-gray-700 uppercase text-md">
                      {product.name}
                    </div>

                    <div className="text-right content-center text-gray-700 uppercase text-md">
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
  );
};

export default FemaleProducts;

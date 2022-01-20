import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../store/products";

function SearchBar({ placeholder }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const { allProducts } = useSelector((state) => {
    return { allProducts: state.products.allProducts };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = allProducts.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.type.toLowerCase().includes(searchWord.toLowerCase())
      );
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="flex justify-center align-center ">
      <div className="flex flex-col">
        <input
          onChange={handleFilter}
          value={wordEntered}
          name="name"
          placeholder={placeholder}
          className="w-22 py-2 border-b-2 border-red-300 outline-none focus:border-red-500 focus:bg-slate-100 bg-slate-200 text-red-500"
        />

        {filteredData.length != 0 && (
          <div className=" mt-10 border-2 absolute bg-white z-10">
            {filteredData.slice(0, 5).map((value) => {
              return (
                <a
                  onClick={() => {
                    clearInput;
                  }}
                  key={value.id}
                  href={`/allProducts/${value.id}`}
                  className=" text-red-400 hover:text-red-600 visited:text-red-800"
                >
                  <p>
                    {value.name} ${(value.price / 100).toFixed(2)}
                  </p>
                </a>
              );
            })}
          </div>
        )}
      </div>
      <div className="searchIcon">
        {filteredData.length === 0 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2 text-red-500 mt-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        ) : (
          <svg
            onClick={clearInput}
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2 text-red-500 mt-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

export default SearchBar;

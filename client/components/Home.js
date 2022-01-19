import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "swiper/css";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use(Autoplay);

const Home = () => {
  const { allProducts } = useSelector((state) => {
    return { allProducts: state.products.allProducts };
  });

  // grabbing 3 random items from allproducts
  const shuffleAllProducts = allProducts.sort(() => 0.5 - Math.random());
  let popularProducts = shuffleAllProducts.slice(0, 3);

  return (
    <div className="mr-56 ml-56 mt-6 z-0">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper text-center  "
      >
        <SwiperSlide>
          <img src="1.jpg" className="w-full" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="2.jpg" className="w-full" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="3.jpg" className="w-full" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="4.jpg" className="w-full" />
        </SwiperSlide>
      </Swiper>
      <div className="text-gray-700 uppercase mt-6 text-center text-2xl mb-6">
        Popular Products
      </div>
      {popularProducts.length === 0 ? (
        <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-52 w-52 border-t-8 border-b-8 border-indigo-300"></div>
        </div>
      ) : (
        <div className="mx-auto container grid grid-cols-3 gap-2 mt-2 object-fill">
          {popularProducts.map((product) => {
            return (
              <Link
                key={product.id}
                to={`/allProducts/${product.id}`}
                className="w-full  mx-auto rounded-md shadow-md overflow-hidden flex-col justify-evenly"
              >
                <div className=" rounded border-2 h-full object-center w-full">
                  <img
                    className="flex items-end  w-full object-cover h-56 object-center"
                    src={product.imageUrl}
                  />
                  <div className="flex place-self-end justify-between mt-2  mb-2">
                    <div className="text-gray-700 uppercase ">
                      {product.name}
                    </div>

                    <div className="text-right content-center text-gray-700 uppercase ">
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

export default Home;

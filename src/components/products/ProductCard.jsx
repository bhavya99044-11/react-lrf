import React, { useId, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Rating from "./Rating";
import Button from "../common/Button";

const ProductCard = ({
  name,
  price,
  rating,
  reviews,
  images = [],
  onEdit,
  onLike,
  isLiked = false,
}) => {
  const id = useId().replace(/[:]/g, "");
  const prevClass = `product-prev-${id}`;
  const nextClass = `product-next-${id}`;
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const updateNavState = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };
  return (
    <div className="bg-white rounded-xl  shadow-sm w-[361px]">
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: `.${prevClass}`,
            nextEl: `.${nextClass}`,
          }}
          slidesPerView={1.3}
          loop={false}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateNavState(swiper);
          }}
          onSlideChange={updateNavState}
          className="relative z-0"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={name} className=" h-[317px] object-contain" />
            </SwiperSlide>
          ))}
        </Swiper>

        <Button
          text="❮"
          aria-label="Previous image"
          onClick={() => swiperRef.current?.slidePrev()}
          variant="icon"
          useColorClasses={false}
          disabled={isBeginning}
          className={`absolute z-10 ${prevClass} left-2 top-1/2 -translate-y-1/2 bg-gray-200 w-8 h-8 px-0 py-0 rounded-full text-gray-600 hover:bg-gray-300 transition pointer-events-auto`}
        />

        <Button
          text="❯"
          aria-label="Next image"
          onClick={() => swiperRef.current?.slideNext()}
          variant="icon"
          useColorClasses={false}
          disabled={isEnd}
          className={`absolute z-10 ${nextClass} right-2 top-1/2 -translate-y-1/2 bg-gray-200 w-8 h-8 px-0 py-0 rounded-full text-gray-600 hover:bg-gray-300 transition pointer-events-auto`}
        />
      </div>

      <div className="mt-6 ml-6 pb-[23px]">
        <div className="flex justify-between items-center">
          <h3 className="text-[18px] font-bold text-[#202224]">{name}</h3>
          <div className="h-[44px] w-[44px] flex items-center justify-center rounded-full bg-[#F9F9F9]">
            <Button
              text={isLiked ? "♥" : "♡"}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onLike?.();
              }}
              type="button"
              disabled={!onLike}
              variant="icon"
              useColorClasses={false}
              className={`font-[900] w-6 h-6 px-0 py-0 ${
                isLiked ? "text-red-500" : "text-black"
              }`}
            />
          </div>
        </div>
          
        <p className="text-blue-600 font-bold text-sm">
          ${price.toFixed(2)}
        </p>

        <div className="mt-2">
          <Rating value={rating} count={reviews} />
        </div>

        <Button
          text="Edit Product"
          onClick={onEdit}
          variant="custom"
          useColorClasses={false}
          className="mt-3 text-sm bg-[#E2EAF8] font-[700] px-[22px] py-[5px] rounded-[12px] hover:bg-gray-300 transition"
        />
      </div>
    </div>
  );
};

export default ProductCard;

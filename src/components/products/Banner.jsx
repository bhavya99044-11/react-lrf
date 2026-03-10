import React, { useId, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import classNames from "classnames";
import Button from "../common/Button";

const ProductsBanner = ({
  slides = [
    {
      dateRange: "September 12–22",
      titleLines: "Enjoy free home  delivery in this summer",
      subtitle: "Designer Dresses - Pick from trendy Designer Dress.",
      buttonText: "Get Started",
    },
  ],
}) => {
  const id = useId().replace(/[:]/g, "");
  const prevClass = `products-banner-prev-${id}`;
  const nextClass = `products-banner-next-${id}`;
  const swiperRef = useRef(null);
  return (
    <div
      className={classNames(
        "relative bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl pt-[52px] pl-[130px] pb-[52px] text-white overflow-hidden",
      )}
    >
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: `.${prevClass}`,
          nextEl: `.${nextClass}`,
        }}
        slidesPerView={1}
        loop
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="relative"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <p className="text-normal  opacity-80 font-semibold leading-[30px] mb-2">{slide.dateRange}</p>

            <h2 className="text-[37px] leading-[48px] max-w-[420px] font-[900] mb-2">
              {slide.titleLines}
            </h2>

            <p className="leading-[30px] font-semibold opacity-80 mb-[30px]">{slide.subtitle}</p>

            <Button
              text={slide.buttonText}
              variant="custom"
              useColorClasses={false}
              className="bg-[#FF8743] hover:bg-orange-600 w-[156px] flex items-center font-bold py-2 rounded-[11px]  transition"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="absolute inset-0 bg-repeat opacity-20 pointer-events-none"
        style={{ backgroundImage: "url('/images/curves.png')" }}
      ></div>
      <Button
        text="❮"
        aria-label="Previous"
        onClick={() => swiperRef.current?.slidePrev()}
        variant="icon"
        useColorClasses={false}
        className={`absolute z-10 ${prevClass} left-4 top-1/2 pr-[2px] -translate-y-1/2 bg-[#F4F4F4] hover:opacity-50 w-10 h-10 px-0 py-0 font-[300] text-black/80 backdrop-blur-sm transition`}
      />
      <Button
        text="❯"
        aria-label="Next"
        onClick={() => swiperRef.current?.slideNext()}
        variant="icon"
        useColorClasses={false}
        className={`absolute z-10 ${nextClass} right-4  pl-[2px] top-1/2 -translate-y-1/2 bg-[#F4F4F4] hover:opacity-50 w-10 h-10 px-0 py-0 text-black/80 backdrop-blur-sm transition`}
      />
    </div>
  );
};

export default ProductsBanner;

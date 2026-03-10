import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { ProductCard, ProductsBanner } from "../components/products";
import { api } from "../utils/api";

const bannerSlides = [
  {
    dateRange: "September 12–22",
    titleLines: ["Enjoy free home delivery in this summer"],
    subtitle: "Designer Dresses - Pick from trendy Designer Dress.",
    buttonText: "Get Started",
  },
  {
    dateRange: "September 11–22",
    titleLines: ["Enjoy free home delivery in this summer"],
    subtitle: "Designer Dresses - Pick from trendy Designer Dress.",
    buttonText: "Get Started",
  },
];

const products = [
  {
    id: 1,
    name: "Apple Watch Series 4",
    price: 120,
    rating: 4,
    reviews: 131,
    images: ["/images/watch.jpeg", "/images/watch.jpeg"],
  },
  {
    id: 2,
    name: "Apple Watch Series 5",
    price: 150,
    rating: 5,
    reviews: 98,
    images: ["/images/watch.jpeg", "/images/watch.jpeg"],
  },
   {
    id: 3,
    name: "Apple Watch Series 5",
    price: 150,
    rating: 5,
    reviews: 98,
    images: ["/images/watch.jpeg", "/images/watch.jpeg"],
  },
];

const Products = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const response = await api.get("/favourites");
        setFavourites(response.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadFavourites();
  }, []);

  const handleLike = async (product) => {
    const existing = favourites.find(
      (item) => item.productId === product.id,
    );

    try {
      if (existing) {
        await api.delete(`/favourites/${existing.id}`);
        setFavourites((prev) =>
          prev.filter((item) => item.productId !== product.id),
        );
        return;
      }

      const payload = { productId: product.id, ...product };
      const response = await api.post("/favourites", payload);
      setFavourites((prev) => [...prev, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-[30px] ml-[30px] mr-[31px] bg-gray-100 min-h-screen">
      <h2 className="text-[32px]  font-bold text-gray-800 mb-4">Products</h2>

      <ProductsBanner slides={bannerSlides} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 mt-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            rating={product.rating}
            reviews={product.reviews}
            images={product.images}
            isLiked={favourites.some((item) => item.productId === product.id)}
            onLike={() => handleLike(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;

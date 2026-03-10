import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import { ProductCard } from "../components/products";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const response = await api.get("/favourites");
        setFavourites(response.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadFavourites();
  }, []);

  return (
    <div className="pt-[30px] flex flex-col pl-[31px] pr-[33px]">
      <h1 className="font-[700] text-[29.5px] tracking-[-0.2px]">Favourites</h1>
      <div className="mt-6">
        {loading ? (
          <div className="rounded-[14px] bg-white p-6 text-[#404040]">
            <p className="text-base">Loading favourites...</p>
          </div>
        ) : favourites.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
            {favourites.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                rating={product.rating}
                reviews={product.reviews}
                images={product.images}
                isLiked
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[14px] bg-white p-6 text-[#404040]">
            <p className="text-base">No favourites yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;

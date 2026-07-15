"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import { Product } from "@/types/product";

type Props = {
  products: Product[];
};

export default function AppClient({ products }: Props) {
  const [search, setSearch] = useState("Samsung");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const text = [
        product.title,
        product.description,
        product.category,
        product.store,
      ]
        .join(" ")
        .toLowerCase();

      return text.includes(search.toLowerCase());
    });
  }, [products, search]);

  return (
    <>
      <Header search={search} onSearch={setSearch} />

      <main className="min-h-screen bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl p-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-lg transition hover:scale-[1.02]"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-56 w-full object-cover"
                />

                <div className="p-4">
                  <h2 className="line-clamp-2 text-lg font-bold">
                    {product.title}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-sm text-zinc-400">
                    {product.description}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-2xl font-bold text-green-400">
                      ${product.price}
                    </span>

                    <span className="text-zinc-500 line-through">
                      ${product.old_price}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm text-zinc-400">
                    <span>{product.store}</span>
                    <span>{product.category}</span>
                  </div>

                  <a
                    href={product.deeplink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 block rounded-lg bg-blue-600 py-3 text-center font-medium text-white transition hover:bg-blue-500"
                  >
                    Купить →
                  </a>
                </div>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <p className="text-zinc-400">
                Ничего не найдено.
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
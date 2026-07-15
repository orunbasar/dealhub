"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import { Product } from "@/types/product";

type Props = {
  products: Product[];
};

export default function AppClient({ products }: Props) {
  const [search, setSearch] = useState("");

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

          {filteredProducts.length === 0 ? (
            <p className="text-center text-zinc-400 text-lg">
              Ничего не найдено.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-2xl"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-60 w-full object-cover transition duration-300 group-hover:scale-105"
                    />

                    {product.old_price > product.price && (
                      <span className="absolute left-3 top-3 rounded-lg bg-red-600 px-3 py-1 text-sm font-bold text-white">
                        -
                        {Math.round(
                          ((product.old_price - product.price) /
                            product.old_price) *
                            100
                        )}
                        %
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <h2 className="line-clamp-2 text-lg font-bold text-white">
                      {product.title}
                    </h2>

                    <p className="mt-2 line-clamp-3 text-sm text-zinc-400">
                      {product.description}
                    </p>

                    <div className="mt-4 flex items-end gap-3">
                      <span className="text-3xl font-extrabold text-green-400">
                        ${product.price}
                      </span>

                      {product.old_price > product.price && (
                        <span className="pb-1 text-zinc-500 line-through">
                          ${product.old_price}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                        {product.store}
                      </span>

                      <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                        {product.category}
                      </span>
                    </div>

                    <a
                      href={product.deeplink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 block rounded-xl bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
                    >
                      Купить →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";

type Product = {
  id: string;
  title: string;
  image: string;
  price: number;
  category: string;
  store: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    }

    load();
  }, []);

  return (
    <AdminLayout>
      <h1 className="mb-8 text-4xl font-bold text-white">
        📦 Все товары
      </h1>

      <div className="overflow-hidden rounded-2xl border border-zinc-800">

        <table className="w-full">

          <thead className="bg-zinc-900">

            <tr>

              <th className="p-4 text-left">Фото</th>

              <th className="p-4 text-left">Название</th>

              <th className="p-4 text-left">Цена</th>

              <th className="p-4 text-left">Магазин</th>

              <th className="p-4 text-left">Категория</th>

              <th className="p-4 text-center">Действия</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t border-zinc-800"
              >
                <td className="p-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                </td>

                <td className="p-4 font-semibold">
                  {product.title}
                </td>

                <td className="p-4 text-green-400">
                  ${product.price}
                </td>

                <td className="p-4">
                  {product.store}
                </td>

                <td className="p-4">
                  {product.category}
                </td>

                <td className="p-4 text-center">

                  <button
                    className="mr-2 rounded-lg bg-blue-600 px-3 py-2 hover:bg-blue-500"
                  >
                    ✏️
                  </button>

                  <button
                    className="rounded-lg bg-red-600 px-3 py-2 hover:bg-red-500"
                  >
                    🗑️
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </AdminLayout>
  );
}
"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";

type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
  store: string;
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    }

    loadProducts();
  }, []);

  return (
    <AdminLayout>
      <h1 className="mb-8 text-4xl font-bold text-white">
        📊 Dashboard
      </h1>

      <div className="mb-10 grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-zinc-900 p-6">
          <p className="text-zinc-400">Товаров</p>
          <h2 className="mt-2 text-4xl font-bold text-white">
            {products.length}
          </h2>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-6">
          <p className="text-zinc-400">Категорий</p>
          <h2 className="mt-2 text-4xl font-bold text-white">
            {new Set(products.map((p) => p.category)).size}
          </h2>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-6">
          <p className="text-zinc-400">Магазинов</p>
          <h2 className="mt-2 text-4xl font-bold text-white">
            {new Set(products.map((p) => p.store)).size}
          </h2>
        </div>

      </div>

      <div className="rounded-2xl bg-zinc-900 p-6">

        <h2 className="mb-6 text-2xl font-bold">
          Последние товары
        </h2>

        <div className="space-y-3">

          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-xl border border-zinc-800 p-4"
            >
              <div>
                <p className="font-semibold">
                  {product.title}
                </p>

                <p className="text-sm text-zinc-400">
                  {product.category} • {product.store}
                </p>
              </div>

              <div className="font-bold text-green-400">
                ${product.price}
              </div>
            </div>
          ))}

        </div>

      </div>
    </AdminLayout>
  );
}
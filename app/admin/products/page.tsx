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
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    try {
      const res = await fetch("/api/products");

      if (!res.ok) {
        throw new Error("Не удалось загрузить товары");
      }

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert("Ошибка загрузки товаров");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function deleteProduct(id: string) {
    alert("Нажали удалить: " + id);

    const ok = confirm("Удалить товар?");

    if (!ok) return;

    alert("Отправляем DELETE...");

    const res = await fetch("/api/products", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    alert("Статус: " + res.status);

    const result = await res.json();

    console.log(result);

    if (!res.ok) {
      alert(result.error);
      return;
    }

    alert("Удалено");

    await loadProducts();
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 text-xl text-white">
          Загрузка...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="mb-8 text-4xl font-bold text-white">
        📦 Все товары
      </h1>

      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
        <table className="w-full">
          <thead className="border-b border-zinc-800">
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
                className="border-b border-zinc-800"
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

                <td className="p-4 font-bold text-green-400">
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
                    onClick={() => deleteProduct(product.id)}
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
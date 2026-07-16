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

  async function loadProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function deleteProduct(id: string) {
    console.log("DELETE CLICKED:", id);
    alert("Отправляем DELETE...");

    if (!confirm("Удалить товар?")) return;

    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      console.log(data);

      if (!res.ok) {
        alert(data.error || "Ошибка удаления");
        return;
      }

      alert("Удалено");

      await loadProducts();
    } catch (err) {
      console.error(err);
      alert("Ошибка сервера");
    }
  }

  return (
    <AdminLayout>
      <h1 className="mb-8 text-4xl font-bold text-red-500">
        ЭТО НОВАЯ ВЕРСИЯ СТРАНИЦЫ
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
                    onClick={() => alert(`Редактировать ${product.title}`)}
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
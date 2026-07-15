"use client";

import { useState } from "react";

export default function AdminPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    deeplink: "",
    price: "",
    old_price: "",
    category: "",
    store: "",
    brand: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("✅ Товар успешно добавлен");

      setForm({
        title: "",
        description: "",
        image: "",
        deeplink: "",
        price: "",
        old_price: "",
        category: "",
        store: "",
        brand: "",
      });
    } else {
      setMessage(`❌ ${data.error}`);
    }

    setLoading(false);
  }

  function updateField(name: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-2xl p-8">
        <h1 className="mb-8 text-3xl font-bold">
          Добавить товар
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            className="w-full rounded-lg bg-zinc-900 p-3"
            placeholder="Название"
            value={form.title}
            onChange={(e) =>
              updateField("title", e.target.value)
            }
          />

          <textarea
            className="w-full rounded-lg bg-zinc-900 p-3"
            placeholder="Описание"
            rows={5}
            value={form.description}
            onChange={(e) =>
              updateField("description", e.target.value)
            }
          />

          <input
            className="w-full rounded-lg bg-zinc-900 p-3"
            placeholder="URL изображения"
            value={form.image}
            onChange={(e) =>
              updateField("image", e.target.value)
            }
          />

          <input
            className="w-full rounded-lg bg-zinc-900 p-3"
            placeholder="Партнерская ссылка"
            value={form.deeplink}
            onChange={(e) =>
              updateField("deeplink", e.target.value)
            }
          />

          <input
            className="w-full rounded-lg bg-zinc-900 p-3"
            placeholder="Цена"
            value={form.price}
            onChange={(e) =>
              updateField("price", e.target.value)
            }
          />

          <input
            className="w-full rounded-lg bg-zinc-900 p-3"
            placeholder="Старая цена"
            value={form.old_price}
            onChange={(e) =>
              updateField("old_price", e.target.value)
            }
          />

          <input
            className="w-full rounded-lg bg-zinc-900 p-3"
            placeholder="Категория"
            value={form.category}
            onChange={(e) =>
              updateField("category", e.target.value)
            }
          />

          <input
            className="w-full rounded-lg bg-zinc-900 p-3"
            placeholder="Магазин"
            value={form.store}
            onChange={(e) =>
              updateField("store", e.target.value)
            }
          />

          <input
            className="w-full rounded-lg bg-zinc-900 p-3"
            placeholder="Бренд"
            value={form.brand}
            onChange={(e) =>
              updateField("brand", e.target.value)
            }
          />

          <button
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-bold hover:bg-blue-500 disabled:opacity-50"
          >
            {loading ? "Добавление..." : "Добавить товар"}
          </button>
        </form>

        {message && (
          <p className="mt-6 text-lg">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-zinc-800 bg-zinc-950 p-6">
      <h1 className="mb-10 text-3xl font-bold text-white">
        🔥 DealHub
      </h1>

      <nav className="space-y-2">

        <a
          href="/admin"
          className="block rounded-xl px-4 py-3 text-white transition hover:bg-zinc-800"
        >
          📊 Dashboard
        </a>

        <a
          href="/admin/products"
          className="block rounded-xl px-4 py-3 text-white transition hover:bg-zinc-800"
        >
          📦 Товары
        </a>

        <a
          href="/admin/add"
          className="block rounded-xl px-4 py-3 text-white transition hover:bg-zinc-800"
        >
          ➕ Добавить товар
        </a>

        <a
          href="/admin/categories"
          className="block rounded-xl px-4 py-3 text-white transition hover:bg-zinc-800"
        >
          🏷 Категории
        </a>

        <a
          href="/admin/stores"
          className="block rounded-xl px-4 py-3 text-white transition hover:bg-zinc-800"
        >
          🏪 Магазины
        </a>

        <a
          href="/admin/settings"
          className="block rounded-xl px-4 py-3 text-white transition hover:bg-zinc-800"
        >
          ⚙ Настройки
        </a>

      </nav>
    </aside>
  );
}
export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-6">

        <h1 className="text-3xl font-bold text-white">
          🔥 DealHub
        </h1>

        <input
          type="text"
          placeholder="Поиск товаров..."
          className="w-80 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white outline-none focus:border-blue-500"
        />

      </div>
    </header>
  );
}
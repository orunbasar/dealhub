import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: products } = await supabase
    .from("products")
    .select("*");

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl p-8">

        <h1 className="text-4xl font-bold mb-8">
          🔥 DealHub
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products?.map((product) => {
            const discount = Math.round(
              ((product.old_price - product.price) /
                product.old_price) *
                100
            );

            return (
              <div
                key={product.id}
                className="overflow-hidden rounded-2xl bg-zinc-900 shadow-lg transition hover:scale-[1.02]"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-64 w-full object-cover"
                />

                <div className="p-4">

                  <span className="rounded bg-red-600 px-2 py-1 text-sm">
                    -{discount}%
                  </span>

                  <h2 className="mt-3 text-lg font-semibold">
                    {product.title}
                  </h2>

                  <p className="mt-2 text-sm text-zinc-400 line-clamp-3">
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

                  <a
                    href={product.deeplink}
                    target="_blank"
                    className="mt-5 block rounded-lg bg-blue-600 py-3 text-center font-medium transition hover:bg-blue-500"
                  >
                    Купить →
                  </a>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
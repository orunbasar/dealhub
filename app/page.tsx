import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";

export default async function Home() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*");

  return (
    <>
      <Header />

      <main className="min-h-screen bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl p-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products?.map((product: Product) => (
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
          </div>

          {error && (
            <p className="mt-8 text-red-500">
              {error.message}
            </p>
          )}
        </div>
      </main>
    </>
  );
}
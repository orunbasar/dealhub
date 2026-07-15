import AppClient from "@/components/AppClient";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";

export default async function Home() {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    return (
      <main className="min-h-screen bg-zinc-950 p-8 text-red-500">
        Ошибка: {error.message}
      </main>
    );
  }

  const products: Product[] = data ?? [];

  return <AppClient products={products} />;
}
import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: products } = await supabase
    .from("products")
    .select("*");

  return (
    <main style={{ padding: 40 }}>
      <h1>DealHub</h1>

      {products?.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
      ))}
    </main>
  );
}
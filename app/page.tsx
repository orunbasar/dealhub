import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: products } = await supabase
    .from("products")
    .select("*");

  return (
    <main style={{ padding: 40 }}>
      <h1>DealHub</h1>

      {products?.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ddd",
            padding: 20,
            marginBottom: 20,
            borderRadius: 10,
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            width={200}
          />

          <h2>{product.title}</h2>

          <p>${product.price}</p>

          <a
            href={product.deeplink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Купить
          </a>
        </div>
      ))}
    </main>
  );
}
import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: products } = await supabase
    .from("products")
    .select("*");

  return (
    <main style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>DealHub</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
          marginTop: "30px",
        }}
      >
        {products?.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                height: 220,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />

            <h2>{product.title}</h2>

            <p>{product.description}</p>

            <p>
              <del>${product.old_price}</del>
            </p>

            <h3>${product.price}</h3>

            <a
              href={product.deeplink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Купить
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
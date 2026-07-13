import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  return (
    <main style={{ padding: 40 }}>
      <h1>DealHub</h1>

      <p>
        URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}
      </p>

      <p>
        KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 25)}...
      </p>

      <pre>{JSON.stringify({ data, error }, null, 2)}</pre>
    </main>
  );
}
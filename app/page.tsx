import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  return (
    <main style={{ padding: 40 }}>
      <h1>DealHub</h1>

      <pre>{JSON.stringify({ data, error }, null, 2)}</pre>
    </main>
  );
}
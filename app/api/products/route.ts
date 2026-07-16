import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      description,
      image,
      deeplink,
      price,
      old_price,
      category,
      store,
      brand,
    } = body;

    const { error } = await supabaseAdmin
      .from("products")
      .insert([
        {
          title,
          description,
          image,
          deeplink,
          price: Number(price),
          old_price: Number(old_price),
          category,
          store,
          brand,
          in_stock: true,
        },
      ]);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  console.log("========== DELETE CALLED ==========");

  try {
    const { id } = await req.json();

    console.log("ID:", id);

    const { error } = await supabaseAdmin
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.log("DELETE SUCCESS");

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
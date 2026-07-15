import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

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

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
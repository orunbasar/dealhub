import { ReactNode } from "react";
import Sidebar from "./Sidebar";

type Props = {
  children: ReactNode;
};

export default function AdminLayout({
  children,
}: Props) {
  return (
    <div className="flex min-h-screen bg-zinc-950">

      <Sidebar />

      <main className="flex-1 p-10">

        {children}

      </main>

    </div>
  );
}
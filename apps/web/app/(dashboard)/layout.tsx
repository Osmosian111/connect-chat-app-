import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { JWT_SECRET } from "../config";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("chat-app-token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return (
      <>
        <div>{children}</div>
      </>
    );
  } catch {
    redirect("/login");
  }
}

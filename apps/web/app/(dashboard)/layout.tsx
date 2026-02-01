import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { JWT_SECRET } from "../config";
import TokenContextProvider from "../../context/TokenContextProvider";
import HomeContextProvider from "../../context/HomeContextProvider";

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
      <TokenContextProvider token={token}>
        <HomeContextProvider>
          <div>{children}</div>
        </HomeContextProvider>
      </TokenContextProvider>
    );
  } catch {
    redirect("/login");
  }
}

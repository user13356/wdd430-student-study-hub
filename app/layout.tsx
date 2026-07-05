import "./globals.css";
import Navbar from "@/components/Navbar";
import { auth } from "@/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body>
        {/* 👇 ONLY SHOW NAVBAR IF LOGGED IN */}
        {session && <Navbar />}

        <div className="p-4">{children}</div>
      </body>
    </html>
  );
}
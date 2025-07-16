import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
     title: "Academic Grade Management System",
     description: "Dashboard OBE UDINUS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
          <html lang="en">
               <body className="bg-gray-50 text-gray-900 font-sans">{children}</body>
          </html>
     );
}

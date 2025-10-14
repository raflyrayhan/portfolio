import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Rafly's",
  description: "Portfolio of Rafly Maulana — Instrumentation, Control, and Cloud Engineer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bgDark text-gray-100 font-sans">
        <Navbar />
        <main className="min-h-screen px-8 md:px-20 pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

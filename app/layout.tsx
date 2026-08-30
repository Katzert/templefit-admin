import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from "../components/ThemeProvider";
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TEMPLEFIT - Centro de Transformación",
  description: "Entrenamiento funcional, nutrición preventiva y desarrollo espiritual.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans min-h-screen flex flex-col custom-scrollbar bg-temple-cream dark:bg-[#0B0F19] text-temple-navy-dark dark:text-white transition-colors duration-300 antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

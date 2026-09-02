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
  metadataBase: new URL("https://katzert.github.io/templefit-admin"),
  title: "TEMPLEFIT Admin - Holistic Life System CRM",
  description: "Sistema integral de gestión de atletas, finanzas y entrenamiento TempleFit.",
  robots: { index: false, follow: false },
  manifest: "/templefit-admin/manifest.json",
  icons: {
    icon: "/templefit-admin/assets/img/logo-tf-abreviado.png",
    apple: "/templefit-admin/assets/img/logo-tf-corona.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans min-h-screen flex flex-col custom-scrollbar bg-temple-cream dark:bg-[#0B0F19] text-temple-navy-dark dark:text-temple-navy dark:text-white transition-colors duration-300 antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

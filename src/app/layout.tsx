import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Москва 15-19 июня 2026 - гид для Даши и Марианны",
  description:
    "Интерактивный маршрут по Москве для Даши и Марианны: карты, планы на дождь, бюджет, мини-гид и подсказки безопасности.",
  openGraph: {
    title: "Гид по Москве для Даши и Марианны",
    description:
      "Пять дней прогулок: Зарядье, ВДНХ, Воробьевы горы, НЕБО, Сказка и Dream Island.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f5ef",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}

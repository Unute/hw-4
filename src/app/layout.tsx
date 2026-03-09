import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/shared/components/Header";
import { RootStoreProvider } from "@stores/context";
import "@/shared/styles/style.scss";

const roboto = localFont({
  src: [
    { path: "../shared/styles/Roboto/Roboto-Regular.woff2", weight: "400", style: "normal" },
    { path: "../shared/styles/Roboto/Roboto-Medium.woff2", weight: "500", style: "normal" },
    { path: "../shared/styles/Roboto/Roboto-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Lalasia", template: "%s | Lalasia" },
  description: "Интернет-магазин мебели и декора Lalasia — удобный поиск, фильтрация по категориям, корзина.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={roboto.variable}>
      <body>
        <RootStoreProvider>
          <div className="App">
            <Header />
            {children}
          </div>
        </RootStoreProvider>
      </body>
    </html>
  )
}

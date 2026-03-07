import Header from "@/shared/components/Header";
import { RootStoreProvider } from "@stores/context";
import "@/shared/styles/style.scss";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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

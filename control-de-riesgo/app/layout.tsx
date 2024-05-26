import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "../components/SessionWrapper";
import { UserProvider } from "../lib/userContext";
import { RequestProvider } from "../lib/requestContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SCI control de riesgo",
  description: "Programation IV",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <UserProvider>
        <RequestProvider>
          <html lang="en">
            <body className={`${inter.className} background_color`}>
              {children}
            </body>
          </html>
        </RequestProvider>
      </UserProvider>
    </SessionWrapper>
  );
}

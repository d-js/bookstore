import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import language from "@/translations/en.json";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "200",
});

export const metadata: Metadata = {
  title: language.metadata.title,
  description: language.metadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ReactQueryProvider>
          <Navbar />
          {children}
          <ToastContainer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neeraj Salve | Software Engineering Student",
  description:
    "The portfolio of Neeraj Salve, a software engineering student and aspiring full-stack developer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")}catch(e){}',
          }}
        />
        {children}
      </body>
    </html>
  );
}

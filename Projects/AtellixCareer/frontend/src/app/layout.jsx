import { Inter, Sora } from "next/font/google";
import "./globals.css";
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});
const sora = Sora({
    subsets: ["latin"],
    variable: "--font-sora",
});
export const metadata = {
    title: "AtellixCareer — AI Career Navigator",
    description: "Upload your resume, map skill gaps against your target role, and get a week-by-week AI learning path with a real-time progress dashboard.",
};
export default function RootLayout({ children, }) {
    return (<html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans">{children}</body>
    </html>);
}

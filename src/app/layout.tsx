
import './globals.css'
import { inter } from '@/lib/fonts';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}

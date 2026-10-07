import './globals.css'

export const metadata = {
  title: 'AtellixHome — Premium Sofas & Furniture',
  description:
    'Explore sofas, tables, chairs and more from AtellixHome in Noida, Uttar Pradesh, India.',
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          as="image"
          href="/Assets/home/home%20sofe%20.webp"
          fetchPriority="high"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

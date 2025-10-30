export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><nav style={{display:'flex',gap:12,padding:12}}><a href='/'><b>Home</b></a><a href='/search'>Search</a><a href='/booking'>Booking</a></nav>{children}</body>
    </html>
  );
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><nav style={{display:'flex',gap:12,padding:12}}><a href='/'><b>Admin</b></a><a href='/connections'>Connections</a><a href='/ledger'>Ledger</a><a href='/sync-logs'>Sync Logs</a></nav>{children}</body>
    </html>
  );
}


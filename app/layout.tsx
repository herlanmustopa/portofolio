// This root layout is required by Next.js but the actual layout
// is handled by app/[locale]/layout.tsx with i18n support
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

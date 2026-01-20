import Link from "next/link";
import { unbounded, albert_Sans } from "@/utils/font";
import Page from "@/components/organisms/pages";

export default function NotFound() {
  return (
    <main className="bg-primary min-h-screen flex items-center justify-center">
      <Page>
        <div className="text-center">
          <h1 className={`text-9xl font-bold text-green mb-4 ${unbounded.className}`}>
            404
          </h1>
          <h2 className={`text-2xl md:text-3xl font-semibold text-black mb-4 ${unbounded.className}`}>
            Halaman Tidak Ditemukan
          </h2>
          <p className={`text-black/60 mb-8 ${albert_Sans.className}`}>
            Maaf, halaman yang Anda cari tidak dapat ditemukan.
          </p>
          <Link
            href="/"
            className={`inline-block bg-green text-white px-6 py-3 rounded-full font-bold hover:bg-green/90 transition-colors ${albert_Sans.className}`}
          >
            Kembali ke Beranda
          </Link>
        </div>
      </Page>
    </main>
  );
}

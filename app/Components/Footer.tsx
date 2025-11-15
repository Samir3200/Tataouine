export default function Footer() {
  return (
    <footer className="bg-yellow-900 text-white text-center py-6 mt-12">
      <p>© {new Date().getFullYear()} Tataouine.net — Traditions et culture du sud tunisien</p>
      <p className="mt-2 text-sm">Contact : <a href="mailto:Samirelorf@yahoo.fr" className="underline">Samirelorf@yahoo.fr</a></p>
    </footer>
  );
}

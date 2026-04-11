export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/10 px-8 py-12">
      <div className="max-w-[1100px] mx-auto flex justify-between items-center flex-wrap gap-6">
        <div className="text-base font-extrabold">
          <span className="text-teal">Med</span>AI
        </div>
        <div className="flex gap-8 max-sm:gap-4">
          <a href="#" className="text-white/40 no-underline text-sm transition-colors hover:text-white">Privacy</a>
          <a href="#" className="text-white/40 no-underline text-sm transition-colors hover:text-white">Terms</a>
          <a href="#" className="text-white/40 no-underline text-sm transition-colors hover:text-white">HIPAA Compliance</a>
          <a href="#" className="text-white/40 no-underline text-sm transition-colors hover:text-white">Contact</a>
        </div>
        <div className="text-white/25 text-xs">
          © 2026 MedAI. Not a substitute for professional medical advice.
        </div>
      </div>
    </footer>
  );
}

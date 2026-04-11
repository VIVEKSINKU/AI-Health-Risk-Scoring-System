import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4 backdrop-blur-[20px] bg-ink/85 border-b border-white/10 max-md:px-5">
      <Link to="/" className="text-lg font-extrabold tracking-tight flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-teal inline-block shadow-[0_0_12px_#00b89c]"></span>
        MedAI
      </Link>
      <div className="flex gap-8 items-center max-md:hidden">
        <Link to="/#features" className="text-white/60 no-underline text-sm font-medium tracking-wide transition-colors hover:text-white">Features</Link>
        <Link to="/#how" className="text-white/60 no-underline text-sm font-medium tracking-wide transition-colors hover:text-white">How it works</Link>
        <Link to="/app" target="_blank" rel="noopener noreferrer" className="text-white/60 no-underline text-sm font-medium tracking-wide transition-colors hover:text-white">Try it</Link>
        <Link to="/app" target="_blank" rel="noopener noreferrer" className="bg-teal text-white px-5 py-2 rounded-md text-sm font-semibold no-underline transition-colors hover:bg-teal-2">Get started</Link>
      </div>
    </nav>
  );
}

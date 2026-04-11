export default function TestimonialCard({ text, author, role, initials }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
      <div className="text-amber text-[0.8rem] mb-3 tracking-[2px]">★★★★★</div>
      <p className="font-serif text-[1.05rem] text-white/85 leading-[1.65] mb-5 italic">"{text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-[38px] h-[38px] rounded-full bg-teal flex items-center justify-center text-[0.75rem] font-bold text-white">
          {initials}
        </div>
        <div>
          <div className="text-[0.85rem] font-bold text-white">{author}</div>
          <div className="text-[0.75rem] text-white/40">{role}</div>
        </div>
      </div>
    </div>
  );
}

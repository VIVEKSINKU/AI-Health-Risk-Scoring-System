export default function FeatureCard({ title, desc, color, bg }) {
  return (
    <div className="bg-white border border-borderLight rounded-2xl p-8 transition-all duration-250 relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: color }}></div>
      <div className="w-[44px] h-[44px] rounded-[10px] flex items-center justify-center text-[1.3rem] mb-[1.2rem]" style={{ backgroundColor: bg }}>
      </div>
      <h3 className="text-base font-bold text-ink mb-2">{title}</h3>
      <p className="text-[0.85rem] text-muted leading-[1.65] font-normal">{desc}</p>
    </div>
  );
}

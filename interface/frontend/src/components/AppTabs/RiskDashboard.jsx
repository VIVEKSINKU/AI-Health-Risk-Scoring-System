export default function RiskDashboard({ onNext }) {
  const bdata = [
    {l:'Glucose', v:74, c:'#3b82f6'},
    {l:'Haemoglobin', v:55, c:'#10b981'},
    {l:'BP', v:82, c:'#f59e0b'},
    {l:'Cholesterol', v:60, c:'#ef4444'},
    {l:'WBC', v:40, c:'#8b5cf6'},
    {l:'Platelets', v:50, c:'#00b89c'},
    {l:'Creatinine', v:35, c:'#f97316'},
  ];

  return (
    <div className="p-8 animate-fadeUp">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-cream-2 rounded-xl p-4 border border-borderLight flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-full flex-shrink-0" style={{ background: `conic-gradient(#f59e0b 68%, #e5e7eb 68%)` }}>
            <div className="absolute inset-1 bg-cream-2 rounded-full grid place-items-center">
              <span className="text-[1.05rem] font-bold text-amber leading-none mt-0.5">68</span>
            </div>
          </div>
          <div>
            <div className="text-[0.65rem] font-bold text-muted tracking-[0.1em] uppercase mb-0.5">Risk score</div>
            <div className="text-[0.7rem] text-muted">out of 100</div>
          </div>
        </div>

        <div className="bg-cream-2 rounded-xl p-4 border border-borderLight flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-full flex-shrink-0" style={{ background: `conic-gradient(#ef4444 30%, #e5e7eb 30%)` }}>
            <div className="absolute inset-1 bg-cream-2 rounded-full grid place-items-center">
              <span className="text-[1.05rem] font-bold text-ink leading-none mt-0.5">3</span>
            </div>
          </div>
          <div>
            <div className="text-[0.65rem] font-bold text-muted tracking-[0.1em] uppercase mb-0.5">Flags</div>
            <div className="text-[0.7rem] text-muted">attention</div>
          </div>
        </div>

        <div className="bg-cream-2 rounded-xl p-4 border border-borderLight flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-full flex-shrink-0" style={{ background: `conic-gradient(#00b89c 87%, #e5e7eb 87%)` }}>
            <div className="absolute inset-1 bg-cream-2 rounded-full grid place-items-center">
              <span className="text-[1.05rem] font-bold text-teal-2 leading-none mt-0.5">87%</span>
            </div>
          </div>
          <div>
            <div className="text-[0.65rem] font-bold text-muted tracking-[0.1em] uppercase mb-0.5">Confidence</div>
            <div className="text-[0.7rem] text-muted">high accuracy</div>
          </div>
        </div>
      </div>

      <div className="bg-cream-2 rounded-xl p-5 mb-5 border border-borderLight">
        <div className="text-[0.75rem] font-bold text-muted tracking-[0.08em] uppercase">Overall risk level</div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden my-3">
          <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500"></div>
        </div>
        <div className="flex justify-between text-[0.7rem] text-muted">
          <span>Low</span><span className="font-bold text-amber">⬤ Moderate — score 68</span><span>Critical</span>
        </div>
      </div>

      <div className="bg-cream-2 rounded-xl p-5 mb-5 border border-borderLight">
        <div className="text-[0.75rem] font-bold text-muted tracking-[0.08em] uppercase mb-4">Biomarker overview</div>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
          {bdata.map(d => (
            <div key={d.l} className="flex flex-col items-center">
              <div className="relative w-12 h-12 rounded-full mb-2" style={{ background: `conic-gradient(${d.c} ${d.v}%, #e5e7eb ${d.v}%)` }}>
                <div className="absolute inset-1 bg-cream-2 rounded-full grid place-items-center">
                  <span className="text-[0.65rem] font-bold text-ink mt-0.5">{d.v}</span>
                </div>
              </div>
              <span className="text-[0.65rem] text-muted text-center leading-tight break-all">{d.l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-cream-2 rounded-xl p-5 mb-5 border border-borderLight">
        <div className="text-[0.75rem] font-bold text-muted tracking-[0.08em] uppercase">Predicted conditions</div>
        <div className="mt-3">
          <div className="flex items-center justify-between py-2.5 border-b border-borderLight text-[0.85rem]">
            <span className="text-ink font-medium">Hypertension Stage 1</span>
            <span className="text-[0.7rem] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">Moderate</span>
          </div>
          <div className="flex items-center justify-between py-2.5 border-b border-borderLight text-[0.85rem]">
            <span className="text-ink font-medium">Pre-diabetic markers</span>
            <span className="text-[0.7rem] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">Moderate</span>
          </div>
          <div className="flex items-center justify-between py-2.5 border-b border-borderLight text-[0.85rem]">
            <span className="text-ink font-medium">Anaemia (mild)</span>
            <span className="text-[0.7rem] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">Low risk</span>
          </div>
          <div className="flex items-center justify-between py-2.5 text-[0.85rem]">
            <span className="text-ink font-medium">Cardiac arrhythmia</span>
            <span className="text-[0.7rem] font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-800">High risk</span>
          </div>
        </div>
      </div>

      <button onClick={onNext} className="block w-full mt-6 bg-ink text-white p-3 rounded-lg text-[0.88rem] font-bold border-none cursor-pointer font-sans tracking-[0.02em] transition-colors hover:bg-ink-2">View recommendations →</button>
    </div>
  );
}

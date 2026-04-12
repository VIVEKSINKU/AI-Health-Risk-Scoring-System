const RISK_COLOR = { High: '#ef4444', Moderate: '#f59e0b', Low: '#10b981' };

const SOURCE_BADGE = {
  both: { label: 'Symptoms + Lifestyle', bg: 'bg-teal/10', text: 'text-teal-2', border: 'border-teal/30' },
  symptoms: { label: 'Symptom-based', bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  lifestyle: { label: 'Lifestyle risk', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
};

const FALLBACK_FUSED = [
  { disease: 'Heart Attack', probability: 41, risk: 'Moderate', sources: 'lifestyle' },
  { disease: 'Diabetes', probability: 18, risk: 'Low', sources: 'lifestyle' },
  { disease: 'Sleep Disorder', probability: 12, risk: 'Low', sources: 'lifestyle' },
];

export default function RiskDashboard({ result, onNext }) {
  const overall = result?.overall_score ?? 41;
  const riskLabel = result?.risk_label ?? 'Moderate';
  const fused = result?.fused_predictions ?? FALLBACK_FUSED;
  const bmi = result?.bmi ?? null;

  const overallColor = RISK_COLOR[riskLabel] ?? '#f59e0b';
  const topDisease = fused[0] ?? null;

  return (
    <div className="p-8 animate-fadeUp">
      {bmi && (
        <div className="mb-4 inline-flex items-center gap-2 bg-teal/10 border border-teal/30 text-teal text-[0.75rem] font-bold px-3 py-1.5 rounded-full">
          <span> BMI:</span>
          <span className="text-ink">{bmi} kg/m²</span>
        </div>
      )}

      <div className="bg-cream-2 rounded-xl p-5 mb-5 border border-borderLight">
        <div className="text-[0.75rem] font-bold text-muted tracking-[0.08em] uppercase">Overall risk level</div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden my-3">
          <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500"
            style={{ width: `${overall}%` }}></div>
        </div>
        <div className="flex justify-between text-[0.7rem] text-muted">
          <span>Low</span>
          <span className="font-bold" style={{ color: overallColor }}>⬤ {riskLabel} — {overall}%</span>
          <span>Critical</span>
        </div>
      </div>

      <div className="bg-cream-2 rounded-xl p-5 mb-5 border border-borderLight">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[0.75rem] font-bold text-muted tracking-[0.08em] uppercase">Conclusive Prediction</div>
            <div className="text-[0.68rem] text-muted mt-1">Combined from <span className="font-semibold text-ink">symptoms + lifestyle factors</span></div>
          </div>
          {/* <span className="text-[0.65rem] bg-ink text-white px-2.5 py-1 rounded-full font-bold shrink-0">Fused AI</span> */}
        </div>

        <div className="space-y-3">
          {fused.map((d, i) => {
            const badge = SOURCE_BADGE[d.sources] ?? SOURCE_BADGE.symptoms;
            return (
              <div key={i}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[0.8rem] font-semibold text-ink flex-1 truncate">{d.disease}</span>
                  <span className={`text-[0.6rem] font-bold px-1.5 py-0.5 rounded-full border ${badge.bg} ${badge.text} ${badge.border} shrink-0`}>
                    {badge.label}
                  </span>
                  <span className="text-[0.75rem] font-bold text-ink w-10 text-right">{d.probability}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${d.probability}%`, backgroundColor: RISK_COLOR[d.risk] ?? '#f59e0b' }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button onClick={onNext}
        className="block w-full mt-6 bg-ink text-white p-3 rounded-lg text-[0.88rem] font-bold border-none cursor-pointer font-sans tracking-[0.02em] transition-colors hover:bg-ink-2">
        View recommendations →
      </button>
    </div>
  );
}

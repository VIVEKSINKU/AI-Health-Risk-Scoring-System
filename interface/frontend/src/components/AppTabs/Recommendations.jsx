const BORDER_COLOR = {
  danger: 'border-l-red-500',
  warn: 'border-l-amber-500',
  ok: 'border-l-emerald-500',
};

function RecItem({ icon, urgency, title, desc }) {
  return (
    <div className={`flex gap-3.5 items-start bg-cream-2 rounded-xl p-3.5 mb-2.5 border-l-[3px] ${BORDER_COLOR[urgency] ?? 'border-l-emerald-500'} border-y border-r border-borderLight`}>
      <div className="text-[1.1rem] shrink-0 mt-[1px]">{icon}</div>
      <div>
        <div className="text-[0.88rem] font-bold text-ink mb-1">{title}</div>
        {desc && <div className="text-[0.8rem] text-muted leading-[1.55]">{desc}</div>}
      </div>
    </div>
  );
}

const FALLBACK = [
  {
    group: 'General Advice',
    items: [
      { icon: '💧', urgency: 'ok', title: 'Stay hydrated', desc: 'Drink at least 8 glasses of water daily to support all bodily functions.' },
      { icon: '🚶', urgency: 'ok', title: '30-minute daily walk', desc: 'Moderate aerobic activity improves insulin sensitivity and cardiovascular health.' },
      { icon: '🥗', urgency: 'ok', title: 'Eat a balanced diet', desc: 'Prioritise whole grains, vegetables, lean protein, and healthy fats.' },
    ],
  },
  {
    group: 'Suggested Follow-up Tests',
    items: [
      { icon: '🩸', urgency: 'ok', title: 'Complete Blood Count (CBC)', desc: 'Screens for anaemia, infection, and immune system issues.' },
      { icon: '💧', urgency: 'ok', title: 'Fasting blood glucose', desc: 'Checks for diabetes and pre-diabetic markers.' },
      { icon: '❤️', urgency: 'ok', title: 'Lipid panel', desc: 'Measures cholesterol and triglyceride levels for cardiovascular risk.' },
    ],
  },
];

export default function Recommendations({ result }) {
  const sections = result?.recommendations ?? FALLBACK;
  const topDisease = result?.symptom_predictions?.[0]?.disease
    ?? result?.structured_risks?.[0]?.disease
    ?? null;

  return (
    <div className="p-8 animate-fadeUp">
      {topDisease && (
        <div className="mb-6 bg-teal/10 border border-teal/30 rounded-xl px-5 py-4">
          <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-teal mb-1">Top predicted condition</p>
          <p className="text-[1.1rem] font-bold text-ink">{topDisease}</p>
          {sections[0]?.description && (
            <p className="text-[0.82rem] text-muted mt-2 leading-[1.6]">{sections[0].description}</p>
          )}
        </div>
      )}

      {sections.map((section, si) => (
        <div key={si}>
          <div className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-muted mb-3 mt-6 first:mt-0">
            {section.group}
          </div>
          {section.items.map((item, ii) => (
            <RecItem key={ii} {...item} />
          ))}
        </div>
      ))}

      <div className="mt-6 text-[0.72rem] text-muted text-center leading-[1.6] border-t border-borderLight pt-4">
        ⚕️ MedAI is for informational purposes only and is not a substitute for professional medical advice.
        Always consult a qualified healthcare provider.
      </div>
    </div>
  );
}

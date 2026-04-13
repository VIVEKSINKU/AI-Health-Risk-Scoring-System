import { useState, useEffect } from 'react';

/* ── colour map by urgency ── */
const BORDER_COLOR = {
  danger: 'border-l-red-500',
  warn:   'border-l-amber-500',
  ok:     'border-l-emerald-500',
};
const BG_COLOR = {
  danger: 'bg-red-50',
  warn:   'bg-amber-50/60',
  ok:     'bg-emerald-50/50',
};
const BADGE_COLOR = {
  danger: 'bg-red-100 text-red-700',
  warn:   'bg-amber-100 text-amber-700',
  ok:     'bg-emerald-100 text-emerald-700',
};

/* ── section header icon + accent map ── */
const SECTION_META = {
  'AI Health Assessment':        { icon: '🤖', accent: 'from-violet-500 to-indigo-500',  badge: 'bg-violet-100 text-violet-700 border-violet-200' },
  'Personalized Recommendations':{ icon: '💡', accent: 'from-teal to-emerald-500',       badge: 'bg-teal/10 text-teal border-teal/30' },
  'Diet & Nutrition Plan':       { icon: '🥗', accent: 'from-green-500 to-lime-500',     badge: 'bg-green-100 text-green-700 border-green-200' },
  'Recommended Medical Tests':   { icon: '🩺', accent: 'from-blue-500 to-cyan-500',      badge: 'bg-blue-100 text-blue-700 border-blue-200' },
};
const precautionMeta = { icon: '🛡️', accent: 'from-amber-500 to-orange-500', badge: 'bg-amber-100 text-amber-700 border-amber-200' };

function getSectionMeta(group) {
  if (group.startsWith('Precautions for')) return precautionMeta;
  return SECTION_META[group] ?? { icon: '📋', accent: 'from-gray-500 to-gray-600', badge: 'bg-gray-100 text-gray-600 border-gray-200' };
}

/* ── single recommendation card ── */
function RecItem({ icon, urgency, title, desc }) {
  return (
    <div className={`flex gap-3.5 items-start rounded-xl p-4 mb-2.5 border-l-[3px] ${BORDER_COLOR[urgency] ?? 'border-l-emerald-500'} ${BG_COLOR[urgency] ?? 'bg-emerald-50/50'} border-y border-r border-borderLight transition-all duration-200 hover:shadow-sm hover:-translate-y-px`}>
      <div className="text-[1.2rem] shrink-0 mt-[1px] select-none">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[0.88rem] font-bold text-ink leading-snug">{title}</span>
          <span className={`text-[0.58rem] font-bold px-1.5 py-0.5 rounded-full ${BADGE_COLOR[urgency] ?? 'bg-emerald-100 text-emerald-700'} shrink-0 uppercase tracking-wider`}>
            {urgency === 'danger' ? 'High' : urgency === 'warn' ? 'Moderate' : 'Info'}
          </span>
        </div>
        {desc && <div className="text-[0.8rem] text-muted leading-[1.6]">{desc}</div>}
      </div>
    </div>
  );
}

/* ── AI assessment hero card  ── */
function AIAssessmentCard({ section }) {
  const item = section.items?.[0];
  if (!item) return null;
  const urgency = item.urgency ?? 'ok';
  const riskLevel = item.title?.replace('Overall risk: ', '') ?? 'Moderate';

  const ringColor = urgency === 'danger' ? 'border-red-400' : urgency === 'warn' ? 'border-amber-400' : 'border-emerald-400';
  const dotColor  = urgency === 'danger' ? 'bg-red-500' : urgency === 'warn' ? 'bg-amber-500' : 'bg-emerald-500';
  const textColor = urgency === 'danger' ? 'text-red-600' : urgency === 'warn' ? 'text-amber-600' : 'text-emerald-600';

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 mb-6 text-white shadow-lg">
      {/* shimmer */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.4)_50%,transparent_75%)] bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />

      <div className="relative flex items-start gap-5">
        {/* risk ring */}
        <div className={`w-16 h-16 rounded-full border-4 ${ringColor} flex items-center justify-center shrink-0`}>
          <div className={`w-4 h-4 rounded-full ${dotColor} animate-pulse`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-white/50">AI Health Assessment</span>
            <span className="text-[0.55rem] font-bold bg-white/10 px-2 py-0.5 rounded-full text-white/70 border border-white/10">Gemini 2.0</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-lg font-bold ${textColor}`}>⬤</span>
            <span className="text-xl font-bold">{riskLevel} Risk</span>
          </div>
          <p className="text-[0.85rem] text-white/70 leading-[1.7]">{item.desc}</p>
        </div>
      </div>
    </div>
  );
}

/* ── shimmer keyframe injection (once) ── */
const STYLE_ID = 'rec-shimmer-style';
function injectShimmer() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes shimmer {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    @keyframes fadeInUp {
      0%   { opacity: 0; transform: translateY(12px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .rec-section-animate {
      animation: fadeInUp 0.45s ease-out both;
    }
  `;
  document.head.appendChild(style);
}

/* ── fallback data ── */
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
    group: 'Diet & Nutrition Plan',
    items: [
      { icon: '🥦', urgency: 'ok', title: 'Increase vegetable intake', desc: 'Aim for at least 5 servings of vegetables daily. Leafy greens, cruciferous veggies, and colourful produce provide essential vitamins.' },
      { icon: '🍎', urgency: 'ok', title: 'Eat antioxidant-rich fruits', desc: 'Berries, citrus fruits, and pomegranates reduce inflammation and boost immune function.' },
      { icon: '🐟', urgency: 'ok', title: 'Include omega-3 fatty acids', desc: 'Fatty fish, walnuts, and flaxseeds support heart and brain health. Aim for 2 servings of fish per week.' },
      { icon: '🚫', urgency: 'warn', title: 'Limit processed foods & sugar', desc: 'Reduce intake of refined sugars, sodas, and ultra-processed snacks to lower disease risk.' },
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

/* ── main component ── */
export default function Recommendations({ result }) {
  const [visibleSections, setVisibleSections] = useState(0);

  const geminiPowered = result?.gemini_powered ?? false;
  const sections = result?.recommendations ?? FALLBACK;
  const topDisease = result?.symptom_predictions?.[0]?.disease
    ?? result?.structured_risks?.[0]?.disease
    ?? null;

  // inject shimmer style once
  useEffect(() => { injectShimmer(); }, []);

  // stagger-reveal sections
  useEffect(() => {
    setVisibleSections(0);
    if (!sections.length) return;
    const timers = sections.map((_, i) =>
      setTimeout(() => setVisibleSections(prev => Math.max(prev, i + 1)), 120 * (i + 1))
    );
    return () => timers.forEach(clearTimeout);
  }, [sections]);

  /* identify AI assessment section */
  const aiSection = sections.find(s => s.group === 'AI Health Assessment');
  const otherSections = sections.filter(s => s.group !== 'AI Health Assessment');

  return (
    <div className="p-8 animate-fadeUp">
      {/* ── Gemini badge ── */}
      {geminiPowered && (
        <div className="flex items-center gap-2 mb-5 bg-gradient-to-r from-violet-500/10 via-indigo-500/10 to-teal/10 border border-violet-200/60 rounded-xl px-4 py-3">
          <span className="text-lg">✨</span>
          <div>
            <span className="text-[0.78rem] font-bold text-violet-700">Powered by Gemini 2.0 Flash</span>
            <span className="text-[0.72rem] text-muted ml-2">Personalized AI recommendations based on your vitals &amp; predictions</span>
          </div>
        </div>
      )}

      {/* ── top predicted condition ── */}
      {topDisease && (
        <div className="mb-6 bg-teal/10 border border-teal/30 rounded-xl px-5 py-4">
          <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-teal mb-1">Top predicted condition</p>
          <p className="text-[1.1rem] font-bold text-ink">{topDisease}</p>
          {sections[0]?.description && sections[0].group !== 'AI Health Assessment' && (
            <p className="text-[0.82rem] text-muted mt-2 leading-[1.6]">{sections[0].description}</p>
          )}
        </div>
      )}

      {/* ── AI Assessment hero card ── */}
      {aiSection && visibleSections >= 1 && (
        <div className="rec-section-animate" style={{ animationDelay: '0ms' }}>
          <AIAssessmentCard section={aiSection} />
        </div>
      )}

      {/* ── remaining sections ── */}
      {otherSections.map((section, si) => {
        const sectionIndex = aiSection ? si + 2 : si + 1; // offset for stagger
        if (visibleSections < sectionIndex) return null;

        const meta = getSectionMeta(section.group);

        return (
          <div key={si} className="rec-section-animate mb-6" style={{ animationDelay: `${si * 80}ms` }}>
            {/* section header */}
            <div className="flex items-center gap-2.5 mb-3 mt-2">
              <span className={`w-7 h-7 rounded-lg bg-gradient-to-br ${meta.accent} flex items-center justify-center text-[0.85rem] text-white shadow-sm`}>
                {meta.icon}
              </span>
              <span className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-muted flex-1">{section.group}</span>
              {geminiPowered && (
                <span className={`text-[0.55rem] font-bold px-2 py-0.5 rounded-full border ${meta.badge}`}>AI</span>
              )}
            </div>

            {/* section description (for precautions) */}
            {section.description && (
              <div className="text-[0.82rem] text-muted leading-[1.65] mb-3 pl-9">
                {section.description}
              </div>
            )}

            {/* recommendation items */}
            {section.items.map((item, ii) => (
              <RecItem key={ii} {...item} />
            ))}
          </div>
        );
      })}

      {/* ── disclaimer ── */}
      <div className="mt-8 text-[0.72rem] text-muted text-center leading-[1.6] border-t border-borderLight pt-4">
        ⚕️ MedAI is for informational purposes only and is not a substitute for professional medical advice.
        Always consult a qualified healthcare provider.
      </div>
    </div>
  );
}

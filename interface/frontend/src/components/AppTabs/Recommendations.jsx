export default function Recommendations() {
  return (
    <div className="p-8 animate-fadeUp">
      <div className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-muted mb-3">Immediate actions</div>
      
      <div className="flex gap-3.5 items-start bg-cream-2 rounded-xl p-3.5 mb-2.5 border-l-[3px] border-l-red border-y border-r border-borderLight">
        <div className="text-[1.1rem] shrink-0 mt-[1px]">🚨</div>
        <div>
          <div className="text-[0.88rem] font-bold text-ink mb-1">Cardiology consultation</div>
          <div className="text-[0.8rem] text-muted leading-[1.55]">Arrhythmia markers detected. See a cardiologist within 48 hours. Do not ignore palpitations or chest tightness.</div>
        </div>
      </div>
      
      <div className="flex gap-3.5 items-start bg-cream-2 rounded-xl p-3.5 mb-2.5 border-l-[3px] border-l-amber border-y border-r border-borderLight">
        <div className="text-[1.1rem] shrink-0 mt-[1px]">📏</div>
        <div>
          <div className="text-[0.88rem] font-bold text-ink mb-1">Blood pressure monitoring</div>
          <div className="text-[0.8rem] text-muted leading-[1.55]">Check BP twice daily, morning and evening. Target reading below 130/80 mmHg.</div>
        </div>
      </div>

      <div className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-muted mb-3 mt-6">Lifestyle changes</div>
      
      <div className="flex gap-3.5 items-start bg-cream-2 rounded-xl p-3.5 mb-2.5 border-l-[3px] border-l-emerald-500 border-y border-r border-borderLight">
        <div className="text-[1.1rem] shrink-0 mt-[1px]">🥗</div>
        <div>
          <div className="text-[0.88rem] font-bold text-ink mb-1">Reduce sodium intake</div>
          <div className="text-[0.8rem] text-muted leading-[1.55]">Stay under 1,500 mg per day. Avoid processed foods and canned soups to manage blood pressure effectively.</div>
        </div>
      </div>

      <div className="flex gap-3.5 items-start bg-cream-2 rounded-xl p-3.5 mb-2.5 border-l-[3px] border-l-emerald-500 border-y border-r border-borderLight">
        <div className="text-[1.1rem] shrink-0 mt-[1px]">🚶</div>
        <div>
          <div className="text-[0.88rem] font-bold text-ink mb-1">30-minute daily walk</div>
          <div className="text-[0.8rem] text-muted leading-[1.55]">Moderate aerobic activity improves insulin sensitivity and cardiovascular health. Start with a flat, comfortable route.</div>
        </div>
      </div>

      <div className="flex gap-3.5 items-start bg-cream-2 rounded-xl p-3.5 mb-2.5 border-l-[3px] border-l-emerald-500 border-y border-r border-borderLight">
        <div className="text-[1.1rem] shrink-0 mt-[1px]">🥩</div>
        <div>
          <div className="text-[0.88rem] font-bold text-ink mb-1">Increase iron-rich foods</div>
          <div className="text-[0.8rem] text-muted leading-[1.55]">Include spinach, lentils, legumes, and lean red meat to address mild anaemia markers.</div>
        </div>
      </div>

      <div className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-muted mb-3 mt-6">Follow-up tests</div>
      
      <div className="flex gap-3.5 items-start bg-cream-2 rounded-xl p-3.5 mb-2.5 border-l-[3px] border-l-amber border-y border-r border-borderLight">
        <div className="text-[1.1rem] shrink-0 mt-[1px]">🩸</div>
        <div>
          <div className="text-[0.88rem] font-bold text-ink mb-1">HbA1c blood test</div>
          <div className="text-[0.8rem] text-muted leading-[1.55]">Confirm pre-diabetic status within the next two weeks. A reading above 5.7% warrants dietary intervention.</div>
        </div>
      </div>

      <div className="flex gap-3.5 items-start bg-cream-2 rounded-xl p-3.5 mb-2.5 border-l-[3px] border-l-emerald-500 border-y border-r border-borderLight">
        <div className="text-[1.1rem] shrink-0 mt-[1px]">💓</div>
        <div>
          <div className="text-[0.88rem] font-bold text-ink mb-1">ECG / Holter monitor</div>
          <div className="text-[0.8rem] text-muted leading-[1.55]">Request a 24-hour Holter monitor to track cardiac rhythm patterns and confirm arrhythmia diagnosis.</div>
        </div>
      </div>
    </div>
  );
}

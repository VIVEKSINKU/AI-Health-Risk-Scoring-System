import { useState } from 'react';

export default function SymptomsForm({ onNext }) {
  const [severity, setSeverity] = useState(6);

  return (
    <div className="p-8 animate-fadeUp">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.75rem] font-bold text-muted tracking-[0.06em] uppercase">Age</label>
          <input type="number" placeholder="34" min="1" max="120" className="border border-borderLight rounded-lg px-3.5 py-2.5 text-[0.88rem] text-ink font-sans outline-none bg-white transition-colors focus:border-teal" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.75rem] font-bold text-muted tracking-[0.06em] uppercase">Gender</label>
          <select className="border border-borderLight rounded-lg px-3.5 py-2.5 text-[0.88rem] text-ink font-sans outline-none bg-white transition-colors focus:border-teal">
            <option>Male</option>
            <option>Female</option>
            <option>Other / prefer not to say</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.75rem] font-bold text-muted tracking-[0.06em] uppercase">Weight (kg)</label>
          <input type="number" placeholder="70" min="1" max="500" className="border border-borderLight rounded-lg px-3.5 py-2.5 text-[0.88rem] text-ink font-sans outline-none bg-white transition-colors focus:border-teal" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.75rem] font-bold text-muted tracking-[0.06em] uppercase">Height (cm)</label>
          <input type="number" placeholder="175" min="1" max="300" className="border border-borderLight rounded-lg px-3.5 py-2.5 text-[0.88rem] text-ink font-sans outline-none bg-white transition-colors focus:border-teal" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.75rem] font-bold text-muted tracking-[0.06em] uppercase">Sleep (hours)</label>
          <input type="number" placeholder="7" min="0" max="24" className="border border-borderLight rounded-lg px-3.5 py-2.5 text-[0.88rem] text-ink font-sans outline-none bg-white transition-colors focus:border-teal" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.75rem] font-bold text-muted tracking-[0.06em] uppercase">Diet</label>
          <select className="border border-borderLight rounded-lg px-3.5 py-2.5 text-[0.88rem] text-ink font-sans outline-none bg-white transition-colors focus:border-teal">
            <option>Balanced</option>
            <option>Vegetarian</option>
            <option>Vegan</option>
            <option>Keto / Low-carb</option>
            <option>High-protein</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      
      <div className="flex flex-col gap-1.5 mb-6">
        <label className="text-[0.75rem] font-bold tracking-[0.12em] uppercase text-muted">Pre-existing conditions</label>
        <textarea 
          placeholder="List any conditions (e.g., Diabetes, Hypertension)..." 
          rows="2"
          className="border border-borderLight rounded-lg px-3.5 py-2.5 text-[0.88rem] text-ink font-sans outline-none bg-white transition-colors focus:border-teal resize-y"
        ></textarea>
      </div>

      <div className="flex flex-col gap-1.5 mb-6">
        <label className="text-[0.75rem] font-bold tracking-[0.12em] uppercase text-muted">Current symptoms</label>
        <textarea 
          placeholder="Describe your symptoms (e.g., Headache, Fatigue)..." 
          rows="3"
          className="border border-borderLight rounded-lg px-3.5 py-2.5 text-[0.88rem] text-ink font-sans outline-none bg-white transition-colors focus:border-teal resize-y"
        ></textarea>
      </div>

      <div className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-muted mb-3">Symptom severity</div>
      <div className="flex items-center gap-3 mt-2">
        <span className="text-[0.75rem] text-muted">Mild</span>
        <input type="range" min="1" max="10" value={severity} onChange={(e) => setSeverity(e.target.value)} className="flex-1 accent-teal" />
        <span className="text-[0.75rem] text-muted">Severe</span>
        <span className="text-[0.88rem] font-bold text-ink min-w-[18px]">{severity}</span>
      </div>

      <div className="border-[1.5px] border-dashed border-borderLight rounded-xl p-8 text-center text-muted text-[0.85rem] bg-cream-2 cursor-pointer mt-6 transition-colors hover:border-teal hover:text-teal-2">
        <div className="text-2xl mb-2">⬆</div>
        <strong>Upload report (optional)</strong>
        <div className="text-[0.78rem] mt-1 text-muted">Blood test, MRI, X-ray — PDF, JPG, PNG up to 10 MB</div>
      </div>

      <div className="flex justify-end mt-6">
        <button onClick={onNext} className="bg-teal text-white px-8 py-3 rounded-lg text-[0.88rem] font-bold border-none cursor-pointer font-sans transition-colors tracking-[0.02em] hover:bg-teal-2">Run analysis →</button>
      </div>
    </div>
  );
}

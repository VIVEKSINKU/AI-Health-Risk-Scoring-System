import { useState, useRef } from 'react';

export default function SymptomsForm({ onNext }) {
  const [severity, setSeverity] = useState(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const ageRef = useRef();
  const genderRef = useRef();
  const weightRef = useRef();
  const heightRef = useRef();
  const sleepRef = useRef();
  const dietRef = useRef();
  const conditionsRef = useRef();
  const symptomsRef = useRef();

  const handleSubmit = async () => {
    setError('');
    const age = parseFloat(ageRef.current?.value) || 0;
    const weight = parseFloat(weightRef.current?.value) || 70;
    const height = parseFloat(heightRef.current?.value) || 170;
    const sleep = parseFloat(sleepRef.current?.value) || 7;
    const gender = genderRef.current?.value || 'other';
    const diet = dietRef.current?.value || 'Balanced';
    const conditions = conditionsRef.current?.value || '';
    const symptoms = symptomsRef.current?.value || '';

    if (age <= 0) { setError('Please enter a valid age.'); return; }
    if (height <= 0) { setError('Please enter a valid height.'); return; }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ age, weight, height, sleep, gender, diet, conditions, symptoms }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'API error');
      onNext(data);
    } catch (e) {
      setError(`Failed to connect to AI backend: ${e.message}. Make sure Flask is running on port 5000.`);
      setLoading(false);
    }
  };

  return (
    <div className="p-8 animate-fadeUp">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.75rem] font-bold text-muted tracking-[0.06em] uppercase">Age</label>
          <input ref={ageRef} type="number" placeholder="34" min="1" max="120" className="border border-borderLight rounded-lg px-3.5 py-2.5 text-[0.88rem] text-ink font-sans outline-none bg-white transition-colors focus:border-teal" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.75rem] font-bold text-muted tracking-[0.06em] uppercase">Gender</label>
          <select ref={genderRef} className="border border-borderLight rounded-lg px-3.5 py-2.5 text-[0.88rem] text-ink font-sans outline-none bg-white transition-colors focus:border-teal">
            <option>Male</option>
            <option>Female</option>
            <option>Other / prefer not to say</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.75rem] font-bold text-muted tracking-[0.06em] uppercase">Weight (kg)</label>
          <input ref={weightRef} type="number" placeholder="70" min="1" max="500" className="border border-borderLight rounded-lg px-3.5 py-2.5 text-[0.88rem] text-ink font-sans outline-none bg-white transition-colors focus:border-teal" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.75rem] font-bold text-muted tracking-[0.06em] uppercase">Height (cm)</label>
          <input ref={heightRef} type="number" placeholder="175" min="1" max="300" className="border border-borderLight rounded-lg px-3.5 py-2.5 text-[0.88rem] text-ink font-sans outline-none bg-white transition-colors focus:border-teal" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.75rem] font-bold text-muted tracking-[0.06em] uppercase">Sleep (hours/night)</label>
          <input ref={sleepRef} type="number" placeholder="7" min="0" max="24" className="border border-borderLight rounded-lg px-3.5 py-2.5 text-[0.88rem] text-ink font-sans outline-none bg-white transition-colors focus:border-teal" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.75rem] font-bold text-muted tracking-[0.06em] uppercase">Diet</label>
          <select ref={dietRef} className="border border-borderLight rounded-lg px-3.5 py-2.5 text-[0.88rem] text-ink font-sans outline-none bg-white transition-colors focus:border-teal">
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
        <label className="text-[0.75rem] font-bold tracking-[0.12em] uppercase text-muted">symptoms</label>
        <textarea ref={symptomsRef} placeholder="Describe your symptoms (e.g., Headache, Fatigue, chest pain)..." rows="3"
          className="border border-borderLight rounded-lg px-3.5 py-2.5 text-[0.88rem] text-ink font-sans outline-none bg-white transition-colors focus:border-teal resize-y" />
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-[0.82rem] rounded-lg px-4 py-3 leading-snug">
          ⚠️ {error}
        </div>
      )}

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-teal text-white px-8 py-3 rounded-lg text-[0.88rem] font-bold border-none cursor-pointer font-sans transition-colors tracking-[0.02em] hover:bg-teal-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span> Analysing…</>
          ) : 'Run analysis →'}
        </button>
      </div>
    </div>
  );
}

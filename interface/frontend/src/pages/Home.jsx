import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';

export default function Home() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('opacity-100');
          e.target.classList.remove('opacity-0', 'translate-y-[20px]');
        }
      });
    }, { threshold: 0.12 });
    
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(0,184,156,0.12)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black_0%,transparent_100%)]"></div>
        
        <div className="inline-flex items-center gap-1.5 bg-teal/10 border border-teal/30 text-teal text-[0.72rem] font-bold tracking-[0.12em] uppercase px-3.5 py-1.5 rounded-full mb-8 animate-fadeUp z-10">
          <span className="w-1.5 h-1.5 bg-teal rounded-full animate-pulseCustom"></span>
          AI-Powered Diagnostics
        </div>
        
        <h1 className="font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[1.05] tracking-[-0.02em] mb-6 animate-fadeUp [animation-delay:0.1s] z-10">
          Predict disease<br/>before it <em className="italic text-teal">strikes</em>
        </h1>
        
        <p className="text-[1.05rem] text-white/55 max-w-[520px] mx-auto leading-[1.7] font-normal mb-10 animate-fadeUp [animation-delay:0.2s] z-10">
          Enter your symptoms, upload lab reports, and receive an AI-generated risk score, disease prediction, and personalised health recommendations — in seconds.
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap animate-fadeUp [animation-delay:0.3s] z-10">
          <Link to="/app" target="_blank" rel="noopener noreferrer" className="btn-teal">Analyse my health →</Link>
          <a href="#how" className="btn-ghost">See how it works</a>
        </div>
        
        <div className="flex gap-12 mt-16 flex-wrap justify-center animate-fadeUp [animation-delay:0.4s] z-10">
          <div className="text-center">
            <div className="font-serif text-[2.2rem] text-white leading-none">97%</div>
            <div className="text-[0.72rem] text-white/40 tracking-[0.1em] uppercase mt-1">Accuracy rate</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-[2.2rem] text-white leading-none">50+</div>
            <div className="text-[0.72rem] text-white/40 tracking-[0.1em] uppercase mt-1">Conditions detected</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-[2.2rem] text-white leading-none">2s</div>
            <div className="text-[0.72rem] text-white/40 tracking-[0.1em] uppercase mt-1">Average analysis time</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-[2.2rem] text-white leading-none">120k+</div>
            <div className="text-[0.72rem] text-white/40 tracking-[0.1em] uppercase mt-1">Patients analysed</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-cream text-ink py-28 px-8 reveal opacity-0 translate-y-[20px] transition-all duration-600">
        <div className="max-w-[1100px] mx-auto">
          <p className="section-tag">What we offer</p>
          <h2 className="section-title">Built for early<br/>detection that saves lives</h2>
          <p className="section-sub">MedAI combines state-of-the-art machine learning with medical-grade OCR to give you the clearest picture of your health.</p>
          
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            <FeatureCard icon="🧠" title="ML Disease Prediction" desc="Our ensemble model analyses over 80 biomarkers to predict conditions like diabetes, hypertension, and cardiac risk with clinical-grade accuracy." color="#00b89c" bg="rgba(0,184,156,0.1)" />
            <FeatureCard icon="📄" title="Smart Report OCR" desc="Upload blood tests, MRI scans, or X-rays. Our OCR engine extracts values and integrates them automatically into your risk profile." color="#3b82f6" bg="rgba(59,130,246,0.1)" />
            <FeatureCard icon="📊" title="Risk Score Dashboard" desc="A clear 0–100 risk score with visual breakdowns by condition, biomarker, and symptom — so you understand exactly what's driving your result." color="#f59e0b" bg="rgba(245,158,11,0.1)" />
            <FeatureCard icon="💡" title="Personalised Recommendations" desc="From lifestyle changes to specialist referrals, MedAI gives you an actionable plan tailored to your exact findings and risk level." color="#8b5cf6" bg="rgba(139,92,246,0.1)" />
            <FeatureCard icon="🔒" title="Privacy First" desc="End-to-end encrypted. Your data is never sold or shared. HIPAA-compliant infrastructure with zero third-party data exposure." color="#ef4444" bg="rgba(239,68,68,0.1)" />
            <FeatureCard icon="⚡" title="Real-Time Analysis" desc="Results in under 2 seconds. No waiting rooms, no appointments. Get your full health report the moment you submit your data." color="#10b981" bg="rgba(16,185,129,0.1)" />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-ink-2 py-28 px-8 reveal opacity-0 translate-y-[20px] transition-all duration-600">
        <div className="max-w-[1100px] mx-auto">
          <p className="section-tag">The process</p>
          <h2 className="section-title text-white">From symptoms<br/>to answers in 4 steps</h2>
          <p className="section-sub text-white/50">A seamless pipeline from input to insight — backed by rigorous clinical data science.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="relative">
              <div className="font-mono text-[0.7rem] text-teal tracking-[0.1em] mb-3">01 / INPUT</div>
              <div className="text-[0.95rem] font-bold text-white mb-2">Enter your symptoms</div>
              <div className="text-[0.82rem] text-white/45 leading-[1.65] font-normal">Select symptoms, rate severity, and fill in basic patient info. Takes under 90 seconds.</div>
            </div>
            <div className="relative">
              <div className="font-mono text-[0.7rem] text-teal tracking-[0.1em] mb-3">02 / UPLOAD</div>
              <div className="text-[0.95rem] font-bold text-white mb-2">Upload lab reports</div>
              <div className="text-[0.82rem] text-white/45 leading-[1.65] font-normal">Our OCR engine reads blood tests, scans, and reports — extracting every clinically relevant value.</div>
            </div>
            <div className="relative">
              <div className="font-mono text-[0.7rem] text-teal tracking-[0.1em] mb-3">03 / ANALYSE</div>
              <div className="text-[0.95rem] font-bold text-white mb-2">AI processes your data</div>
              <div className="text-[0.82rem] text-white/45 leading-[1.65] font-normal">Our ML models run feature engineering, risk scoring, and disease classification in real time.</div>
            </div>
            <div className="relative">
              <div className="font-mono text-[0.7rem] text-teal tracking-[0.1em] mb-3">04 / RESULTS</div>
              <div className="text-[0.95rem] font-bold text-white mb-2">View your health report</div>
              <div className="text-[0.82rem] text-white/45 leading-[1.65] font-normal">A full dashboard with risk score, predicted conditions, biomarker charts, and personalised recommendations.</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-ink py-28 px-8 reveal opacity-0 translate-y-[20px] transition-all duration-600">
        <div className="max-w-[1100px] mx-auto">
          <p className="section-tag !text-teal">Trusted by patients</p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-white mb-4">Real people.<br/>Real results.</h2>
          
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 mt-12">
            <TestimonialCard text="MedAI flagged my pre-diabetic risk six months before my GP did. I changed my diet, and my latest HbA1c is now in the normal range." author="Sneha R." role="Software engineer, Bengaluru" initials="SR" />
            <TestimonialCard text="I uploaded my blood report and within seconds had a full breakdown of every marker. The recommendations were precise, not generic." author="Arjun K." role="Physician, Mumbai" initials="AK" />
            <TestimonialCard text="The cardiac arrhythmia alert prompted me to visit a cardiologist immediately. Turned out I had a minor condition that needed early treatment." author="Priya M." role="Teacher, Chennai" initials="PM" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal py-24 px-8 text-center reveal opacity-0 translate-y-[20px] transition-all duration-600">
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-white mb-4">Your health can't wait.</h2>
        <p className="text-white/80 text-base mb-8 font-normal max-w-[440px] mx-auto leading-[1.7]">Join over 120,000 people who've taken control of their health with AI-powered early detection.</p>
        <Link to="/app" target="_blank" rel="noopener noreferrer" className="bg-white text-teal-2 px-8 py-3 rounded-md text-sm font-bold border-none cursor-pointer font-sans transition-transform hover:-translate-y-0.5 inline-block no-underline">Analyse my health free →</Link>
      </section>
    </div>
  );
}

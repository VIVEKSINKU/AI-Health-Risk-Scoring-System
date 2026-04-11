import { useState, useEffect } from 'react';
import SymptomsForm from '../components/AppTabs/SymptomsForm';
import RiskDashboard from '../components/AppTabs/RiskDashboard';
import Recommendations from '../components/AppTabs/Recommendations';

export default function AppDemo() {
  const [activeTab, setActiveTab] = useState('form');

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
    <section className="bg-cream min-h-screen py-32 px-8 reveal opacity-0 translate-y-[20px] transition-all duration-600">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-teal-2 mb-4">Live demo</p>
        <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-ink mb-4">Try MedAI now</h2>
        <p className="text-base text-muted max-w-[480px] leading-[1.7] mb-14 font-normal">Interact with the full diagnostic flow below — symptom entry, dashboard, and recommendations.</p>
        
        <div className="bg-white rounded-[20px] border border-borderLight overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.12)] mt-12">
          {/* Header */}
          <div className="bg-ink px-6 py-4 flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></div>
            <div className="flex-1 text-center font-mono text-[0.72rem] text-white/40 tracking-[0.08em]">medai.health / dashboard</div>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-borderLight bg-[#fafaf8] overflow-x-auto">
            <button 
              onClick={() => setActiveTab('form')} 
              className={`whitespace-nowrap px-6 py-3 border-b-2 font-semibold text-[0.8rem] tracking-[0.02em] transition-colors cursor-pointer bg-transparent outline-none ${activeTab === 'form' ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink'}`}>
              1 · Symptoms
            </button>
            <button 
              onClick={() => setActiveTab('dash')} 
              className={`whitespace-nowrap px-6 py-3 border-b-2 font-semibold text-[0.8rem] tracking-[0.02em] transition-colors cursor-pointer bg-transparent outline-none ${activeTab === 'dash' ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink'}`}>
              2 · Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('recs')} 
              className={`whitespace-nowrap px-6 py-3 border-b-2 font-semibold text-[0.8rem] tracking-[0.02em] transition-colors cursor-pointer bg-transparent outline-none ${activeTab === 'recs' ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink'}`}>
              3 · Recommendations
            </button>
          </div>

          {/* Content */}
          <div className="min-h-[500px]">
            {activeTab === 'form' && <SymptomsForm onNext={() => setActiveTab('dash')} />}
            {activeTab === 'dash' && <RiskDashboard onNext={() => setActiveTab('recs')} />}
            {activeTab === 'recs' && <Recommendations />}
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { ArrowRight, Zap, Smartphone, TrendingUp } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 text-center z-10">
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
          <Zap size={14} className="text-accent" />
          <span className="text-xs font-medium tracking-wide uppercase text-slate-300">Разработка за дни, а не месяцы</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
          Превратите свой бизнес <br />
          <span className="gradient-text">в Цифровой Бренд</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          IntelFlow объединяет экспертную разработку и мощь AI для создания премиальных приложений для малого бизнеса. Быстро, доступно и с возможностью масштабирования.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 bg-white text-midnight rounded-full font-semibold transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center"
          >
            Рассчитать стоимость
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
             onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 text-slate-300 hover:text-white font-medium flex items-center transition-colors"
          >
            Как мы работаем
          </button>
        </div>

        {/* Stats / Trust Indicators */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/5 pt-10">
            <div className="flex flex-col items-center">
                <Smartphone className="text-slate-500 mb-3" size={24} />
                <span className="text-2xl font-bold text-white">7-10 Дней</span>
                <span className="text-sm text-slate-500">Средний срок сдачи</span>
            </div>
             <div className="flex flex-col items-center">
                <TrendingUp className="text-slate-500 mb-3" size={24} />
                <span className="text-2xl font-bold text-white">300%</span>
                <span className="text-sm text-slate-500">ROI в первый месяц</span>
            </div>
             <div className="flex flex-col items-center">
                <div className="text-slate-500 mb-3 font-mono font-bold text-lg">AI</div>
                <span className="text-2xl font-bold text-white">Выгодно</span>
                <span className="text-sm text-slate-500">Умная разработка</span>
            </div>
        </div>
      </div>
    </section>
  );
};
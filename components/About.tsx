import React, { useEffect, useRef, useState } from 'react';
import { Layers, Coffee, Scissors, Car, ShoppingBag } from 'lucide-react';

export const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const industries = [
    { name: "Салоны красоты", icon: <Scissors size={20} /> },
    { name: "Ритейл и магазины", icon: <ShoppingBag size={20} /> },
    { name: "Аренда авто", icon: <Car size={20} /> },
    { name: "Кафе и доставка", icon: <Coffee size={20} /> },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger animation when the section is 20% visible
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: disconnect if we only want to animate once
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 bg-midnight relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Left Content - Text */}
          <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Современные приложения. <br/>
              <span className="text-accent">Доступны каждому.</span>
            </h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              IntelFlow — это не обычная веб-студия. Мы используем гибридный подход: современные AI-инструменты под строгим контролем опытных разработчиков.
            </p>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Это позволяет нам сократить время разработки на 80% и стоимость на 60%, делая премиальные цифровые решения доступными для локального бизнеса, который раньше мог позволить себе только шаблоны.
            </p>

            <div className="space-y-4">
              <h3 className="text-white font-medium mb-4">Мы создаем приложения для:</h3>
              <div className="grid grid-cols-2 gap-4">
                {industries.map((ind, index) => (
                  <div key={index} className="flex items-center space-x-3 text-slate-300 p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                    <span className="text-accent">{ind.icon}</span>
                    <span>{ind.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Visual - Card (with delay) */}
          <div className={`relative transition-all duration-1000 delay-200 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
             <div className="absolute inset-0 bg-accent/10 blur-[80px] rounded-full"></div>
             <div className="relative glass-card rounded-2xl p-8 border border-white/10 shadow-2xl">
                <div className="flex items-center space-x-4 mb-6 border-b border-white/5 pb-4">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                        <Layers size={20} className="text-white"/>
                    </div>
                    <div>
                        <div className="text-sm text-slate-400">Сроки запуска</div>
                        <div className="text-white font-semibold">Обычная студия vs IntelFlow</div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-2">
                            <span>Традиционная студия</span>
                            <span>8 Недель</span>
                        </div>
                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-slate-600 w-full opacity-50"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs text-accent mb-2">
                            <span>IntelFlow AI-Hybrid</span>
                            <span>5 Дней</span>
                        </div>
                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden relative">
                            <div className="h-full bg-accent w-[15%] shadow-[0_0_10px_#38bdf8]"></div>
                             <div className="absolute top-0 right-0 h-full w-px bg-white/20"></div>
                        </div>
                         <div className="mt-2 text-xs text-right text-slate-500">Запуск проекта</div>
                    </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
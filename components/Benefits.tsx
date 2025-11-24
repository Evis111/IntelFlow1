import React from 'react';
import { TrendingUp, Calendar, ShieldCheck, Zap, Users, BarChart3 } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <TrendingUp size={24} />,
      title: "Рост продаж",
      desc: "Прямые push-уведомления и предложения внутри приложения увеличивают пожизненную ценность клиента (LTV)."
    },
    {
      icon: <Calendar size={24} />,
      title: "Упрощение операций",
      desc: "Автоматизируйте бронирование, заказы и платежи. Тратьте меньше времени на телефонные звонки."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Доверие к бренду",
      desc: "Профессиональное собственное приложение значительно улучшает имидж вашего бизнеса."
    },
    {
      icon: <Zap size={24} />,
      title: "Преимущество",
      desc: "Станьте первыми в своей нише, кто предложит клиентам удобный цифровой сервис."
    },
     {
      icon: <Users size={24} />,
      title: "Удержание клиентов",
      desc: "Встроенные программы лояльности. Заставляйте клиентов возвращаться к вам автоматически."
    },
     {
      icon: <BarChart3 size={24} />,
      title: "Аналитика данных",
      desc: "Понимайте, что и когда покупают ваши клиенты. Принимайте решения на основе цифр."
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-[#0a0f1c]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Зачем вашему бизнесу приложение?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            В 2025 году мобильное присутствие — это не роскошь, а необходимость. Вот как мы трансформируем ваш бизнес.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, idx) => (
            <div key={idx} className="group p-8 rounded-2xl glass-card hover:bg-white/5 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-slate-800/50 rounded-lg flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform duration-300 border border-white/5">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
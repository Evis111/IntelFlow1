import React from 'react';
import { Quote } from 'lucide-react';
import { Testimonial } from '../types';

const reviews: Testimonial[] = [
  {
    id: 1,
    name: "Анна Петрова",
    role: "Владелица, Салон Glow",
    image: "https://picsum.photos/100/100?random=1",
    content: "Мы получили приложение для салона всего за 4 дня. Клиенты записываются в два клика, а количество звонков администратору сократилось вдвое!"
  },
  {
    id: 2,
    name: "Михаил Романов",
    role: "Основатель, Urban Drive",
    image: "https://picsum.photos/100/100?random=2",
    content: "Невероятный ROI. IntelFlow сделали систему бронирования авто. Теперь 70% наших заказов идут напрямую через телефон. Очень рекомендую."
  },
  {
    id: 3,
    name: "Елена В.",
    role: "Управляющая, Эко Маркет",
    image: "https://picsum.photos/100/100?random=3",
    content: "Для небольшого магазина приложение казалось слишком дорогим удовольствием. IntelFlow доказали обратное. Система лояльности работает отлично."
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-midnight relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-white">
          Реальные результаты <span className="text-accent">Реального Бизнеса</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="relative p-8 rounded-2xl bg-[#111827] border border-white/5 flex flex-col h-full">
              <div className="absolute -top-4 -left-4 text-slate-800">
                <Quote size={64} fill="currentColor" />
              </div>
              
              <p className="text-slate-300 mb-8 relative z-10 italic leading-relaxed">
                "{review.content}"
              </p>
              
              <div className="mt-auto flex items-center space-x-4 border-t border-white/5 pt-6">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-12 h-12 rounded-full object-cover border border-white/10"
                />
                <div>
                  <div className="text-white font-medium">{review.name}</div>
                  <div className="text-xs text-accent uppercase tracking-wide">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
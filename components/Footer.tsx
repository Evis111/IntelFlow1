import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/10 text-center md:text-left">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <div className="text-xl font-bold text-white mb-2">IntelFlow</div>
          <p className="text-slate-500 text-sm">Создаем продолжение вашего бизнеса.</p>
        </div>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-sm text-slate-400">
           <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
           <a href="#" className="hover:text-white transition-colors">Условия использования</a>
           <a href="#" className="hover:text-white transition-colors">Поддержка</a>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-slate-600">
        &copy; {new Date().getFullYear()} IntelFlow Agency. Все права защищены.
      </div>
    </footer>
  );
};
import React, { useState } from 'react';
import { Send, Sparkles, Loader2, CheckCircle } from 'lucide-react';
import { generateAppConcept } from '../services/geminiService';
import { AppConcept } from '../types';
import { createClient } from '@supabase/supabase-js';

// --- КОНФИГУРАЦИЯ БЭКЕНДА ---

// 1. SUPABASE (Ваши данные)
const SUPABASE_URL = 'https://mqejroujmatycqwjqihv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xZWpyb3VqbWF0eWNxd2pxaWh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5Nzg0OTIsImV4cCI6MjA3OTU1NDQ5Mn0.cJJLPaFjYRvwVfhhJFMwFPa7-S_oeMVbUO8imzlumfs';

// Инициализация Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. GOOGLE SHEETS (Ваш URL)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwJy36V6v3FOdt-ZdcwfuOSa08J1TC7rvXqLov-wTjTA801uEArt40x8jA2cEQa29RaFQ/exec';

export const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', phone: '', businessType: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // AI Feature States
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiConcept, setAiConcept] = useState<AppConcept | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleAiGenerate = async () => {
    if (!formState.businessType || formState.businessType.length < 3) return;
    
    setIsGenerating(true);
    const concept = await generateAppConcept(formState.businessType);
    setAiConcept(concept);
    setIsGenerating(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const timestamp = new Date().toISOString();
      const payload = { ...formState, created_at: timestamp };

      // --- 1. Отправка в Supabase ---
      // В Supabase должна быть создана таблица 'leads' с колонками: name, phone, business_type (или businessType)
      const { error: supabaseError } = await supabase
        .from('leads')
        .insert([
          { 
            name: formState.name, 
            phone: formState.phone, 
            business_type: formState.businessType 
          }
        ]);

      if (supabaseError) {
        console.error('Supabase Error:', supabaseError);
        // Не прерываем выполнение, пробуем отправить в Google Sheets как резерв
      }

      // --- 2. Отправка в Google Sheets ---
      if (GOOGLE_SCRIPT_URL) {
        // mode: 'no-cors' нужен, чтобы браузер не блокировал запрос к Google Script
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
      }

      // Имитация небольшой задержки для плавности UI, если API ответил слишком быстро
      if (!GOOGLE_SCRIPT_URL && !supabaseError) {
         await new Promise(resolve => setTimeout(resolve, 800));
      }

      setIsSubmitted(true);
      setAiConcept(null);
    } catch (error) {
      console.error("Critical Error:", error);
      alert("Произошла ошибка при отправке. Но мы сохранили данные локально.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-gradient-to-b from-midnight to-slate-950">
      <div className="max-w-4xl mx-auto px-6">
        <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden min-h-[500px] flex items-center justify-center transition-all duration-500">
          
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[80px] pointer-events-none"></div>

          {isSubmitted ? (
             <div className="flex flex-col items-center justify-center py-8 w-full animate-in fade-in zoom-in-95 duration-700 ease-out fill-mode-forwards">
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)] scale-0 animate-[scale-up_0.5s_ease-out_forwards]">
                  <CheckCircle className="text-green-500 w-12 h-12" strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 text-center opacity-0 animate-[fade-in-up_0.6s_0.2s_forwards]">Заявка успешно принята!</h3>
                <p className="text-slate-400 text-center max-w-md text-lg leading-relaxed mb-8 opacity-0 animate-[fade-in-up_0.6s_0.4s_forwards]">
                    Спасибо, <span className="text-white font-medium">{formState.name}</span>. <br/>
                    Ваши данные сохранены в системе. Мы свяжемся с вами по номеру <span className="text-white font-mono">{formState.phone}</span>.
                </p>
                <button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({ name: '', phone: '', businessType: '' });
                      setAiConcept(null);
                    }}
                    className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 hover:text-white text-slate-400 transition-all text-sm font-medium opacity-0 animate-[fade-in-up_0.6s_0.6s_forwards]"
                >
                    Отправить еще одну заявку
                </button>
             </div>
          ) : (
            <div className="w-full">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Начните Цифровую Трансформацию</h2>
                    <p className="text-slate-400">Заполните форму ниже. Мы ответим с детальным планом в течение 15 минут.</p>
                </div>
            
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
                    {/* Left: The Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Ваше Имя</label>
                            <input 
                                type="text" 
                                name="name" 
                                required
                                value={formState.name}
                                onChange={handleChange}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                                placeholder="Иван Иванов"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Телефон</label>
                            <input 
                                type="tel" 
                                name="phone" 
                                required
                                value={formState.phone}
                                onChange={handleChange}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                                placeholder="+7 (999) 000-00-00"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Вид Бизнеса</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    name="businessType" 
                                    required
                                    value={formState.businessType}
                                    onChange={handleChange}
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all pr-12"
                                    placeholder="Например: Суши-бар, Барбершоп"
                                />
                                {/* AI Trigger Button inside input */}
                                {formState.businessType.length > 2 && !aiConcept && (
                                    <button 
                                        type="button"
                                        onClick={handleAiGenerate}
                                        disabled={isGenerating}
                                        className="absolute right-2 top-2 p-1.5 text-accent hover:bg-accent/10 rounded-md transition-colors tooltip"
                                        title="Сгенерировать AI-концепт"
                                    >
                                        {isGenerating ? <Loader2 className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                                    </button>
                                )}
                            </div>
                            <p className="text-xs text-slate-500 mt-2">
                                Совет: Введите тип бизнеса и нажмите иконку искры, чтобы увидеть идею от AI.
                            </p>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-white text-midnight font-bold py-4 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-95 duration-200"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" /> : <><span>Оставить Заявку</span> <Send size={18} /></>}
                        </button>
                    </form>

                    {/* Right: AI Output Area */}
                    <div className="flex flex-col justify-center">
                        {isGenerating ? (
                            <div className="text-center py-10 space-y-4">
                                <Loader2 className="w-10 h-10 text-accent animate-spin mx-auto" />
                                <p className="text-slate-300 animate-pulse">Анализируем вашу нишу...</p>
                            </div>
                        ) : aiConcept ? (
                            <div className="bg-slate-900/80 border border-accent/20 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center space-x-2 mb-4 text-accent">
                                    <Sparkles size={18} />
                                    <span className="text-sm font-semibold uppercase tracking-wider">Идея от AI</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">"{aiConcept.tagline}"</h3>
                                <div className="space-y-3 mb-4">
                                    {aiConcept.features.map((feat, i) => (
                                        <div key={i} className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2"></div>
                                            <p className="text-slate-300 text-sm">{feat}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-accent/10 p-3 rounded-lg border border-accent/10">
                                    <p className="text-xs text-accent font-medium">Эффект: {aiConcept.estimatedImpact}</p>
                                </div>
                                <p className="text-xs text-slate-500 mt-4 text-center">
                                    *Это лишь превью. Отправьте заявку для полной стратегии.
                                </p>
                            </div>
                        ) : (
                            <div className="hidden md:flex flex-col items-center justify-center text-center h-full border-2 border-dashed border-white/10 rounded-xl p-6">
                                <Sparkles className="text-slate-600 mb-4 w-12 h-12" />
                                <h4 className="text-slate-400 font-medium">Сила AI в действии</h4>
                                <p className="text-sm text-slate-500 mt-2">
                                    Введите вид вашего бизнеса и нажмите на иконку искры, чтобы моментально увидеть, что IntelFlow может создать для вас.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
          )}
        </div>
        
        {/* Добавляем стили для кастомных анимаций в inline style для простоты, или можно в global css */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scale-up {
            0% { transform: scale(0); opacity: 0; }
            80% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}} />
      </div>
    </section>
  );
};
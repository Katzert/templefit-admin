import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, Clock, Users, Dumbbell, Sparkles, AlertCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface EventItem {
  id: string;
  day: number;
  title: string;
  type: 'cristofit' | 'renewal' | 'reto21';
  time?: string;
  studentName?: string;
}

const DEMO_EVENTS: EventItem[] = [
  { id: '1', day: 4, title: 'Sábado CristoFit Camp - Parque Urbano', type: 'cristofit', time: '07:00 AM' },
  { id: '2', day: 11, title: 'Sábado CristoFit Camp - Entrenamiento al Aire Libre', type: 'cristofit', time: '07:00 AM' },
  { id: '3', day: 18, title: 'Sábado CristoFit Camp + Confraternización', type: 'cristofit', time: '07:00 AM' },
  { id: '4', day: 25, title: 'Sábado CristoFit Camp - Cierre del Mes', type: 'cristofit', time: '07:00 AM' },

  // Renovaciones de alumnos
  { id: '5', day: 24, title: 'Renovación Reto 21 Días - Diego Roca', type: 'renewal', studentName: 'Diego Roca' },
  { id: '6', day: 26, title: 'Renovación Reto 21 Días - Mariana Flores', type: 'renewal', studentName: 'Mariana Flores' },
  { id: '7', day: 28, title: 'Renovación Plan Mensual - Carlos Gutiérrez', type: 'renewal', studentName: 'Carlos Gutiérrez' },

  // Hitos del Reto 21 Días
  { id: '8', day: 1, title: 'Inicio Oficial Reto 21 Días Íntegros', type: 'reto21' },
  { id: '9', day: 7, title: 'Evaluación 1: Recomposición & Hábitos', type: 'reto21' },
  { id: '10', day: 14, title: 'Evaluación 2: Ajuste Nutricional & Fuerza', type: 'reto21' },
  { id: '11', day: 21, title: 'Graduación Reto 21 Días Íntegros 🏆', type: 'reto21' }
];

export function CalendarWidget() {
  const [selectedDay, setSelectedDay] = useState<number>(23);
  const [currentMonth, setCurrentMonth] = useState('Julio 2026');

  // Days in month grid (31 days)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const startOffset = 2; // Wednesday start

  const eventsForSelectedDay = DEMO_EVENTS.filter(e => e.day === selectedDay);

  const getEventBadge = (type: EventItem['type']) => {
    switch (type) {
      case 'cristofit':
        return <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" title="CristoFit Camp" />;
      case 'renewal':
        return <span className="w-2 h-2 rounded-full bg-amber-400 shadow-sm shadow-amber-400" title="Renovación Alumno" />;
      case 'reto21':
        return <span className="w-2 h-2 rounded-full bg-temple-gold shadow-sm shadow-temple-gold" title="Hito Reto 21" />;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Calendar Header Card */}
      <Card className="bg-[#0B0F19]/90 border-white/10">
        <CardContent className="!p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-temple-gold/10 border border-temple-gold/30 rounded-2xl text-temple-gold">
                <CalendarIcon size={22} />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-temple-gold">Calendario de Eventos & Renovaciones</span>
                <h2 className="text-2xl font-serif font-black uppercase text-white">{currentMonth}</h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Sábados CristoFit
              </span>
              <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> Renovaciones
              </span>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d, i) => (
              <div key={i} className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 py-2">
                {d}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: startOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="h-16 rounded-xl bg-white/[0.01] border border-transparent" />
            ))}

            {daysInMonth.map((day) => {
              const isSelected = selectedDay === day;
              const dayEvents = DEMO_EVENTS.filter(e => e.day === day);
              const isToday = day === 23;

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`h-16 p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between relative group ${
                    isSelected
                      ? 'bg-temple-gold/20 border-temple-gold shadow-lg shadow-temple-gold/10'
                      : isToday
                      ? 'bg-white/10 border-white/30 text-white'
                      : 'bg-black/40 border-white/5 hover:border-white/20 text-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isSelected ? 'text-temple-gold' : 'text-white'}`}>
                      {day}
                    </span>
                    {isToday && (
                      <span className="text-[8px] font-extrabold uppercase bg-temple-gold text-black px-1.5 rounded-full">
                        Hoy
                      </span>
                    )}
                  </div>

                  {/* Event Badges */}
                  <div className="flex items-center gap-1">
                    {dayEvents.map(ev => (
                      <React.Fragment key={ev.id}>
                        {getEventBadge(ev.type)}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Day Agenda View */}
      <Card className="bg-[#0B0F19]/90 border-white/10">
        <CardContent className="!p-6">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock size={18} className="text-temple-gold" />
              Agenda del {selectedDay} de {currentMonth}
            </h3>
            <span className="text-xs text-gray-400 font-medium">{eventsForSelectedDay.length} actividades programadas</span>
          </div>

          {eventsForSelectedDay.length === 0 ? (
            <div className="py-8 text-center text-gray-400 text-xs">
              No hay eventos ni renovaciones registradas para este día.
            </div>
          ) : (
            <div className="space-y-3">
              {eventsForSelectedDay.map(ev => (
                <div key={ev.id} className="p-4 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${
                      ev.type === 'cristofit' ? 'bg-emerald-500/20 text-emerald-400' :
                      ev.type === 'renewal' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-temple-gold/20 text-temple-gold'
                    }`}>
                      {ev.type === 'cristofit' ? <Users size={18} /> : ev.type === 'renewal' ? <AlertCircle size={18} /> : <Sparkles size={18} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{ev.title}</p>
                      {ev.time && <p className="text-xs text-gray-400 mt-0.5">{ev.time}</p>}
                    </div>
                  </div>

                  {ev.type === 'renewal' && (
                    <a
                      href={`https://wa.me/59170000000?text=${encodeURIComponent(`Hola ${ev.studentName}! Te escribo de TempleFit para coordinar la renovación de tu plan.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-xs font-bold rounded-lg transition"
                    >
                      Recordar Renovación
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

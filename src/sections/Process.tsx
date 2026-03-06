import { useState } from 'react';
import { Clock, Thermometer, Layers, ArrowRight, ArrowLeft } from 'lucide-react';

const stages = [
  {
    id: 1,
    title: 'Загрузка шихты',
    duration: '15-20 мин',
    temp: '20°C',
    description: 'Угольная шихта загружается в коксовую камеру через загрузочные люки. Ширина камеры 410-450 мм определяет скорость коксования.',
    details: 'Объём камеры: 20-40 м³. Насыпная плотность шихты: 750-800 кг/м³. Влажность шихты: 8-10%.'
  },
  {
    id: 2,
    title: 'Нагрев и пластификация',
    duration: '3-4 ч',
    temp: '350-500°C',
    description: 'Постепенный нагрев шихты от стенок к центру. Выделение летучих веществ, размягчение угля и образование пластической массы.',
    details: 'Скорость нагрева: 3-5°C/мин. Давление в камере: 5-30 Па. Начало выделения коксового газа.'
  },
  {
    id: 3,
    title: 'Спекание (коксование)',
    duration: '6-8 ч',
    temp: '500-1000°C',
    description: 'Разложение пластической массы, образование полукокса и затем кокса. Коксовая стенка движется к центру камеры.',
    details: 'Температура в простенках: 1200-1300°C. Расход отопительного газа максимален. Кантовка каждые 20-30 мин.'
  },
  {
    id: 4,
    title: 'Завершение коксования',
    duration: '2-3 ч',
    temp: '1000-1050°C',
    description: 'Достижение заданной температуры в осевой плоскости коксового пирога. Контроль готовности по температуре вертикалов.',
    details: 'Целевая температура кокса: 1050±50°C. Контроль через оптические пирометры. Подготовка к выдаче.'
  },
  {
    id: 5,
    title: 'Выдача кокса',
    duration: '5-10 мин',
    temp: '1050°C',
    description: 'Выталкивание готового кокса штангой через коксовую дверь. Тушение кокса водой или сухое тушение инертным газом.',
    details: 'Влажность тушёного кокса: 2-6%. Беспыльная выдача снижает выбросы в 10-15 раз.'
  }
];

export default function Process() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="process" className="py-24 bg-white px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-orange-500 text-sm font-medium tracking-wider uppercase mb-3 block">
            Технологический процесс
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            От шихты до кокса
          </h2>
          <p className="text-gray-600 max-w-2xl text-lg">
            Процесс коксования занимает 12-14 часов и представляет собой сложную 
            последовательность физико-химических превращений угольной массы 
            при высоких температурах в безвоздушной среде.
          </p>
        </div>

        {/* Timeline */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Stage Navigation */}
          <div className="lg:col-span-4 space-y-3">
            {stages.map((stage, idx) => (
              <button
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                  activeStage === idx 
                    ? 'bg-orange-500 text-white shadow-lg' 
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{stage.title}</div>
                    <div className={`text-sm mt-1 ${activeStage === idx ? 'text-orange-100' : 'text-gray-500'}`}>
                      {stage.duration}
                    </div>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    activeStage === idx ? 'bg-white text-orange-500' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stage.id}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Stage Details */}
          <div className="lg:col-span-8">
            <div className="bg-gray-50 rounded-2xl p-8 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium">{stages[activeStage].duration}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg">
                  <Thermometer className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium">{stages[activeStage].temp}</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {stages[activeStage].title}
              </h3>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {stages[activeStage].description}
              </p>

              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-gray-900">Технические параметры</span>
                </div>
                <p className="text-gray-600">{stages[activeStage].details}</p>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={() => setActiveStage(Math.max(0, activeStage - 1))}
                  disabled={activeStage === 0}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Предыдущий этап
                </button>
                <div className="flex gap-2">
                  {stages.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        idx === activeStage ? 'bg-orange-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setActiveStage(Math.min(stages.length - 1, activeStage + 1))}
                  disabled={activeStage === stages.length - 1}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Следующий этап
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-orange-50 rounded-2xl p-6">
            <div className="text-3xl font-bold text-orange-600 mb-2">27-32</div>
            <div className="text-gray-700 font-medium">мм/час</div>
            <div className="text-sm text-gray-500 mt-1">Оптимальная скорость коксования</div>
          </div>
          <div className="bg-blue-50 rounded-2xl p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">1450°C</div>
            <div className="text-gray-700 font-medium">максимальная</div>
            <div className="text-sm text-gray-500 mt-1">Температура в вертикалах</div>
          </div>
          <div className="bg-green-50 rounded-2xl p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">20-30</div>
            <div className="text-gray-700 font-medium">минут</div>
            <div className="text-sm text-gray-500 mt-1">Период кантовки</div>
          </div>
        </div>
      </div>
    </section>
  );
}

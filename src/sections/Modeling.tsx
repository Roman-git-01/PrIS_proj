import { useState } from 'react';
import { LineChart, Code, Brain, Cpu, TrendingUp, Database, Settings } from 'lucide-react';

const cycleModels = [
  {
    id: 'sawtooth',
    name: 'Пилообразная функция (кантовка)',
    formula: 'f(t) = f₀ + Δf · sawtooth(t mod Tcant, trise, tfall)',
    description: 'Моделирует циклическое изменение параметров с периодом кантовки (20-30 мин)',
    params: ['Tcant = 20-30 мин — период кантовки', 'trise = 10-15 мин — время нарастания', 'tfall = 10-15 мин — время спада', 'Δf = амплитуда изменения'],
    color: 'blue'
  },
  {
    id: 'trapezoid',
    name: 'Трапецеидальная функция (период коксования)',
    formula: 'f(t) = fbase + A · trap(t mod Tcok, trise, tpl, tfall)',
    description: 'Медленное изменение параметров в течение 12-14 часов коксования',
    params: ['Tcok = 12-14 ч — период коксования', 'trise = 2-3 ч — нагрев', 'tpl = 6-8 ч — плато', 'tfall = 2-3 ч — остывание'],
    color: 'green'
  },
  {
    id: 'combined',
    name: 'Суперпозиция циклов',
    formula: 'f_total(t) = f_slow(t) + f_fast(t) + φ(t)',
    description: 'Комбинация быстрого (кантовка) и медленного (коксование) циклов с фазовым сдвигом',
    params: ['f_slow — трапецеидальный профиль', 'f_fast — пилообразный профиль', 'φ(t) — фазовый сдвиг между полублоками'],
    color: 'purple'
  }
];

const predictionModels = [
  {
    name: 'Линейная регрессия с лагом',
    type: 'Базовая модель',
    accuracy: 'Средняя',
    pros: ['Простота интерпретации', 'Быстрое обучение', 'Явное выражение зависимостей'],
    cons: ['Не учитывает нелинейности', 'Чувствительна к выбросам'],
    formula: 'CO(t) = β₀ + β₁·f(t-τ₁) + β₂·p(t-τ₂) + β₃·raz(t-τ₃)'
  },
  {
    name: 'Random Forest / XGBoost',
    type: 'Ансамблевая модель',
    accuracy: 'Высокая (MAE ~1.6%)',
    pros: ['Учёт нелинейных взаимодействий', 'Устойчивость к шуму', 'Важность признаков'],
    cons: ['Менее интерпретируема', 'Требует больше данных'],
    formula: 'ŷ = Σᵢ wᵢ · treeᵢ(X)'
  },
  {
    name: 'Нейронная сеть (LSTM)',
    type: 'Глубокое обучение',
    accuracy: 'Очень высокая',
    pros: ['Учёт временных зависимостей', 'Автоматическое извлечение признаков', 'Сложные паттерны'],
    cons: ['Требует много данных', 'Сложна в интерпретации', 'Высокие вычислительные затраты'],
    formula: 'hₜ = σ(W·[hₜ₋₁, xₜ] + b)'
  }
];

const implementationSteps = [
  {
    step: 1,
    title: 'Предобработка данных',
    description: 'Агрегация с дискретностью 1 мин до 5-10 мин, нормализация, заполнение пропусков',
    icon: Database
  },
  {
    step: 2,
    title: 'Создание признаков',
    description: 'Лаговые переменные (t-5, t-10, t-30 мин), взаимодействия f×α, p×raz',
    icon: Settings
  },
  {
    step: 3,
    title: 'Обучение модели',
    description: 'Разделение на train/test, кросс-валидация, подбор гиперпараметров',
    icon: Brain
  },
  {
    step: 4,
    title: 'Оптимизация выбросов',
    description: 'Байесовская оптимизация целевой функции с учётом ограничений',
    icon: TrendingUp
  }
];

export default function Modeling() {
  const [activeCycleModel, setActiveCycleModel] = useState('combined');
  const [activePredModel, setActivePredModel] = useState(1);

  return (
    <section id="modeling" className="py-24 bg-gray-50 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-purple-500 text-sm font-medium tracking-wider uppercase mb-3 block">
            Цифровой двойник
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Моделирование циклов и прогнозирование
          </h2>
          <p className="text-gray-600 max-w-3xl text-lg">
            Создание цифрового двойника коксовой батареи требует математического описания 
            циклических параметров и построения предиктивных моделей выбросов на основе 
            данных с дискретностью 1 минута.
          </p>
        </div>

        {/* Cycle Models */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <LineChart className="w-6 h-6 text-purple-600" />
            Математические модели циклов
          </h3>
          
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {cycleModels.map((model) => (
              <button
                key={model.id}
                onClick={() => setActiveCycleModel(model.id)}
                className={`text-left p-6 rounded-2xl transition-all duration-300 ${
                  activeCycleModel === model.id 
                    ? 'bg-white shadow-lg ring-2 ring-purple-500' 
                    : 'bg-white/50 hover:bg-white'
                }`}
              >
                <div className={`w-10 h-10 bg-${model.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                  <Code className={`w-5 h-5 text-${model.color}-600`} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{model.name}</h4>
                <p className="text-sm text-gray-600">{model.description}</p>
              </button>
            ))}
          </div>

          {/* Active Model Details */}
          {cycleModels.filter(m => m.id === activeCycleModel).map(model => (
            <div key={model.id} className="bg-white rounded-2xl p-8 animate-in fade-in duration-300">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Формула</h4>
                  <code className="block bg-gray-900 text-green-400 rounded-xl p-4 text-sm font-mono">
                    {model.formula}
                  </code>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Параметры</h4>
                  <ul className="space-y-2">
                    {model.params.map((param, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 flex-shrink-0" />
                        {param}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prediction Models */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Brain className="w-6 h-6 text-purple-600" />
            Модели прогнозирования выбросов
          </h3>
          
          <div className="space-y-4">
            {predictionModels.map((model, idx) => (
              <div 
                key={idx}
                className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 ${
                  activePredModel === idx ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                <button
                  onClick={() => setActivePredModel(activePredModel === idx ? -1 : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-900">{model.name}</h4>
                      <p className="text-sm text-gray-500">{model.type} • Точность: {model.accuracy}</p>
                    </div>
                  </div>
                  <div className={`transform transition-transform ${activePredModel === idx ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                {activePredModel === idx && (
                  <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                    <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Формула</h5>
                        <code className="block bg-gray-100 rounded-lg p-3 text-xs font-mono text-gray-700">
                          {model.formula}
                        </code>
                      </div>
                      <div>
                        <h5 className="font-medium text-green-700 mb-2">Преимущества</h5>
                        <ul className="space-y-1">
                          {model.pros.map((pro, pidx) => (
                            <li key={pidx} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-green-500">+</span> {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-red-700 mb-2">Ограничения</h5>
                        <ul className="space-y-1">
                          {model.cons.map((con, cidx) => (
                            <li key={cidx} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-red-500">−</span> {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Implementation Steps */}
        <div className="bg-white rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-8">Этапы внедрения цифрового двойника</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {implementationSteps.map((step) => (
              <div key={step.step} className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                  <step.icon className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-purple-50 rounded-2xl p-6">
            <h4 className="font-bold text-purple-900 mb-3">Ключевые гипотезы для тестирования</h4>
            <ul className="space-y-2 text-sm text-purple-800">
              <li>• Лаг между изменением f и реакцией выбросов: 5-15 минут</li>
              <li>• Оптимальный α для минимума CO+NOx: 1.25-1.35</li>
              <li>• Корреляция разрежения raz и подсоса воздуха → CO</li>
              <li>• Фазовый сдвиг полублоков влияет на пиковые выбросы</li>
            </ul>
          </div>
          
          <div className="bg-orange-50 rounded-2xl p-6">
            <h4 className="font-bold text-orange-900 mb-3">Рекомендуемый стек технологий</h4>
            <ul className="space-y-2 text-sm text-orange-800">
              <li>• Python: pandas, scikit-learn, XGBoost, TensorFlow/PyTorch</li>
              <li>• Временные ряды: Prophet, ARIMA для базовых моделей</li>
              <li>• Оптимизация: Optuna, scikit-optimize для байесовской оптимизации</li>
              <li>• Визуализация: matplotlib, plotly для интерактивных дашбордов</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { AlertTriangle, Wind, Droplets, Flame, ArrowRight, Shield, Filter } from 'lucide-react';

const emissions = [
  {
    id: 'co',
    formula: 'CO',
    name: 'Монооксид углерода',
    icon: Wind,
    color: 'orange',
    source: 'Неполное сгорание отопительного газа',
    factors: ['Коэффициент избытка воздуха α < 1.2', 'Неравномерное смешение газа и воздуха', 'Нестабильное давление в системе'],
    reduction: 'Поддержание α = 1.20-1.50, равномерное распределение топлива',
    danger: 'Токсичен, в 2-3 раза превышает ПДК в зоне батареи'
  },
  {
    id: 'nox',
    formula: 'NOx',
    name: 'Оксиды азота (NO + NO₂)',
    icon: Flame,
    color: 'red',
    source: 'Термический и топливный механизмы',
    factors: ['Температура горения > 1300°C', 'Высокое содержание азота в топливе', 'Коэффициент избытка воздуха α > 1.3'],
    reduction: 'Снижение температуры горения, ступенчатое сжигание, рециркуляция дымовых газов',
    danger: 'Термический NOx доминирует при T > 1300°C'
  },
  {
    id: 'so2',
    formula: 'SO₂',
    name: 'Диоксид серы',
    icon: Droplets,
    color: 'yellow',
    source: 'Сера в угольной шихте и коксовом газе',
    factors: ['Содержание серы в шихте 0.5-1.5%', 'Сероводород в коксовом газе', 'Сера в отопительном газе'],
    reduction: 'Очистка коксового газа от H₂S, известковый метод очистки дымовых газов',
    danger: 'При сжигании H₂S образуется ~97% SO₂ от массы серы'
  }
];

const controlMethods = [
  {
    title: 'Первичные мероприятия',
    icon: Shield,
    items: [
      'Оптимизация коэффициента избытка воздуха α = 1.20-1.50',
      'Регулирование температуры горения < 1300°C',
      'Равномерное распределение топлива и воздуха по горелкам',
      'Бездымная загрузка (паровая инжекция 7-9·10⁵ Па)',
      'Беспыльная выдача кокса (эффективность 90-95%)'
    ]
  },
  {
    title: 'Вторичные мероприятия',
    icon: Filter,
    items: [
      'Известковый метод очистки от SO₂ (Ca(OH)₂)',
      'Вакуум-содовый метод очистки дымовых газов',
      'Сорбционные методы очистки от H₂S (N-метилпирролидон)',
      'Электрофильтры для улавливания пыли и аэрозолей',
      'Системы мониторинга выбросов в реальном времени'
    ]
  }
];

export default function Emissions() {
  const [activeEmission, setActiveEmission] = useState('co');

  const getColorClass = (color: string, type: 'bg' | 'text' | 'border' | 'light') => {
    const colors: Record<string, Record<string, string>> = {
      orange: { bg: 'bg-orange-500', text: 'text-orange-600', border: 'border-orange-200', light: 'bg-orange-50' },
      red: { bg: 'bg-red-500', text: 'text-red-600', border: 'border-red-200', light: 'bg-red-50' },
      yellow: { bg: 'bg-yellow-500', text: 'text-yellow-600', border: 'border-yellow-200', light: 'bg-yellow-50' },
    };
    return colors[color]?.[type] || '';
  };

  const currentEmission = emissions.find(e => e.id === activeEmission);

  return (
    <section id="emissions" className="py-24 bg-white px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-red-500 text-sm font-medium tracking-wider uppercase mb-3 block">
            Экологический аспект
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Контроль и снижение выбросов
          </h2>
          <p className="text-gray-600 max-w-3xl text-lg">
            Понимание механизмов образования вредных веществ — ключ к разработке 
            эффективных стратегий снижения выбросов. Каждый параметр f, p, raz 
            оказывает влияние на баланс между энергоэффективностью и экологичностью.
          </p>
        </div>

        {/* Emissions Tabs */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          {/* Tabs */}
          <div className="lg:col-span-4 space-y-3">
            {emissions.map((emission) => (
              <button
                key={emission.id}
                onClick={() => setActiveEmission(emission.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                  activeEmission === emission.id 
                    ? `${getColorClass(emission.color, 'light')} ring-2 ${getColorClass(emission.color, 'border')}` 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${getColorClass(emission.color, 'bg')} rounded-lg flex items-center justify-center`}>
                    <emission.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{emission.formula}</div>
                    <div className="text-sm text-gray-500">{emission.name}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Details */}
          <div className="lg:col-span-8">
            {currentEmission && (
              <div className={`${getColorClass(currentEmission.color, 'light')} rounded-2xl p-8 animate-in fade-in duration-300`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-14 h-14 ${getColorClass(currentEmission.color, 'bg')} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <currentEmission.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{currentEmission.name}</h3>
                    <p className="text-gray-600">{currentEmission.source}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/70 rounded-xl p-5">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Факторы образования
                    </h4>
                    <ul className="space-y-2">
                      {currentEmission.factors.map((factor, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0" />
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white/70 rounded-xl p-5">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Методы снижения
                    </h4>
                    <p className="text-sm text-gray-600">{currentEmission.reduction}</p>
                  </div>
                </div>

                <div className="mt-6 bg-white/50 rounded-xl p-4 flex items-center gap-3">
                  <AlertTriangle className={`w-5 h-5 ${getColorClass(currentEmission.color, 'text')}`} />
                  <span className="text-sm text-gray-700">{currentEmission.danger}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Control Methods */}
        <div className="grid md:grid-cols-2 gap-8">
          {controlMethods.map((method, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                  <method.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{method.title}</h3>
              </div>
              
              <ul className="space-y-4">
                {method.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Impact Table */}
        <div className="mt-12 bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="font-bold text-gray-900">Влияние управляющих параметров на выбросы</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Параметр</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">CO</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">NOx</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">SO₂</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">f↑ (расход газа)</td>
                  <td className="px-6 py-4 text-sm text-red-600">↑ Риск при недостатке воздуха</td>
                  <td className="px-6 py-4 text-sm text-red-600">↑ При высоких T</td>
                  <td className="px-6 py-4 text-sm text-orange-600">↑ Пропорционально</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">p↑ (давление)</td>
                  <td className="px-6 py-4 text-sm text-green-600">↓ Снижение утечек</td>
                  <td className="px-6 py-4 text-sm text-gray-600">→ Стабилизация пламени</td>
                  <td className="px-6 py-4 text-sm text-gray-600">→ Минимальное влияние</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">raz↑ (разрежение)</td>
                  <td className="px-6 py-4 text-sm text-red-600">↑ Риск при подсосе</td>
                  <td className="px-6 py-4 text-sm text-green-600">↓ При оптимальном α</td>
                  <td className="px-6 py-4 text-sm text-gray-600">→ Минимальное влияние</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">α↑ (избыток воздуха)</td>
                  <td className="px-6 py-4 text-sm text-green-600">↓ Снижение CO</td>
                  <td className="px-6 py-4 text-sm text-red-600">↑ Термический NOx</td>
                  <td className="px-6 py-4 text-sm text-gray-600">→ Минимальное влияние</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

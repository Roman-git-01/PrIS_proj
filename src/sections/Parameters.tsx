import { useState } from 'react';
import { Wind, Gauge, Activity, ChevronDown, ChevronUp } from 'lucide-react';

const parameters = [
  {
    id: 'f',
    name: 'f — Расход газа',
    icon: Wind,
    color: 'blue',
    value: '1500-3000',
    unit: 'м³/ч',
    description: 'Объёмный расход отопительного газа (коксового или доменного), подаваемого в обогревательные простенки коксовой печи.',
    details: [
      'Температура газа после подогревателя: 50-60°C (предотвращение конденсации нафталина)',
      'Регулируется кантовочными устройствами (КУ) с автоматическим управлением',
      'Зависит от теплотворности газа и требуемой интенсивности нагрева',
      'Изменяется циклически вместе с кантовкой (каждые 20-30 мин)'
    ],
    impact: 'Прямое влияние на температуру в простенках и скорость коксования'
  },
  {
    id: 'p',
    name: 'p — Давление',
    icon: Gauge,
    color: 'green',
    value: '5-150',
    unit: 'Па',
    description: 'Давление в различных зонах коксовой системы — от критического давления на поду до давления в газосборниках.',
    details: [
      'Давление на поду камеры: 5-30 Па (минимум 5 Па по ПТЭ для предотвращения подсоса)',
      'Давление в газосборниках: 60-150 Па (в зарубежной практике до 60 Па)',
      'Контролируется автоматическими регуляторами с точностью ±10 Па',
      'Стабильное давление обеспечивает равномерность горения и снижает утечки'
    ],
    impact: 'Влияет на стабильность горения, утечки газа и безопасность процесса'
  },
  {
    id: 'raz',
    name: 'raz — Разрежение',
    icon: Activity,
    color: 'purple',
    value: '50-500',
    unit: 'Па / мм вод.ст.',
    description: 'Разрежение (вакуум) в регенераторах и общем газосборнике, создаваемое дымососами.',
    details: [
      'Разрежение в верхней зоне регенераторов (восходящий поток): 50-60 Па',
      'Разрежение в общем газосборнике: контролируется для стабильности отсоса',
      'Максимальное разрежение перед нагнетателями: 450-500 мм вод. ст.',
      'Поддержание разрежения критично для отвода продуктов горения'
    ],
    impact: 'Определяет тягу, отвод продуктов горения и эффективность рекуперации тепла'
  }
];

export default function Parameters() {
  const [expandedParam, setExpandedParam] = useState<string | null>('f');

  const getColorClass = (color: string, type: 'bg' | 'text' | 'border') => {
    const colors: Record<string, Record<string, string>> = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
    };
    return colors[color]?.[type] || '';
  };

  return (
    <section id="parameters" className="py-24 bg-gray-50 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-orange-500 text-sm font-medium tracking-wider uppercase mb-3 block">
            Управляющие параметры
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Триада контроля: f, p, raz
          </h2>
          <p className="text-gray-600 max-w-3xl text-lg">
            Эти три параметра формируют основу теплового и гидравлического режимов коксовой батареи. 
            Их циклическое изменение с фазовым сдвигом между полублоками обеспечивает 
            равномерный обогрев и стабильность процесса.
          </p>
        </div>

        {/* Parameters Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {parameters.map((param) => (
            <div 
              key={param.id}
              className={`bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                expandedParam === param.id ? `ring-2 ring-${param.color}-500` : ''
              }`}
              onClick={() => setExpandedParam(expandedParam === param.id ? null : param.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${getColorClass(param.color, 'bg')} rounded-xl flex items-center justify-center`}>
                  <param.icon className={`w-6 h-6 ${getColorClass(param.color, 'text')}`} />
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getColorClass(param.color, 'text')}`}>
                    {param.value}
                  </div>
                  <div className="text-sm text-gray-500">{param.unit}</div>
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{param.name}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{param.description}</p>
              
              <div className="flex items-center justify-between">
                <span className={`text-xs px-3 py-1 ${getColorClass(param.color, 'bg')} ${getColorClass(param.color, 'text')} rounded-full`}>
                  {param.impact.slice(0, 30)}...
                </span>
                {expandedParam === param.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Expanded Details */}
        {expandedParam && (
          <div className="bg-white rounded-2xl p-8 animate-in fade-in slide-in-from-top-4 duration-300">
            {parameters.filter(p => p.id === expandedParam).map(param => (
              <div key={param.id}>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <param.icon className={`w-6 h-6 ${getColorClass(param.color, 'text')}`} />
                  Детализация параметра: {param.name}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Технические характеристики</h4>
                    <ul className="space-y-3">
                      {param.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full ${getColorClass(param.color, 'bg').replace('bg-', 'bg-').replace('50', '500')} mt-2 flex-shrink-0`} />
                          <span className="text-gray-600 text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={`${getColorClass(param.color, 'bg')} rounded-xl p-6`}>
                    <h4 className="font-medium text-gray-900 mb-3">Влияние на процесс</h4>
                    <p className="text-gray-700 mb-4">{param.impact}</p>
                    
                    <div className="bg-white/60 rounded-lg p-4">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Диапазон регулирования</span>
                      <div className="text-2xl font-bold text-gray-900 mt-1">
                        {param.value} <span className="text-lg font-normal text-gray-600">{param.unit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Canting Cycle Info */}
        <div className="mt-12 bg-white rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Циклическая природа параметров</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Параметры f, p, raz изменяются циклически с периодом кантовки (20-30 минут). 
                Кантовка — это переключение направления потоков отопительного газа и продуктов 
                горения для равномерного обогрева коксовой камеры.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  Падение температуры между кантовками: 60-110°C
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  Приведение температур к 20-й секунде после кантовки
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  Фазовый сдвиг между полублоками: π (180°)
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-medium text-gray-900 mb-3">Принцип Лернера</h4>
              <p className="text-gray-600 text-sm">
                Оптимальный гидравлический режим достигается при равенстве сопротивлений 
                восходящего и нисходящего потоков. Это обеспечивает симметрию температурного 
                поля и минимальные потери тепла с уходящими газами.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

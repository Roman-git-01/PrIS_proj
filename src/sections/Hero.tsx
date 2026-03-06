import { Flame, Activity, Settings, BarChart3 } from 'lucide-react';

const stats = [
  { value: '14', label: 'часов', sublabel: 'период коксования' },
  { value: '1200°C', label: 'температура', sublabel: 'в обогревательных стенках' },
  { value: '30', label: 'минут', sublabel: 'период кантовки' },
  { value: '3', label: 'параметра', sublabel: 'f, p, raz' },
];

const features = [
  { icon: Flame, label: 'Тепловой режим' },
  { icon: Activity, label: 'Гидравлический контроль' },
  { icon: Settings, label: 'Циклическое управление' },
  { icon: BarChart3, label: 'Прогнозирование выбросов' },
];

export default function Hero() {
  return (
    <section className="min-h-screen bg-white pt-8 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg tracking-tight">CokingLab</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#process" className="hover:text-gray-900 transition-colors">Процесс</a>
            <a href="#parameters" className="hover:text-gray-900 transition-colors">Параметры</a>
            <a href="#emissions" className="hover:text-gray-900 transition-colors">Выбросы</a>
            <a href="#modeling" className="hover:text-gray-900 transition-colors">Моделирование</a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Цифровой двойник
              <span className="block text-orange-500">коксовой батареи</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
              Комплексное технологическое погружение в процесс производства доменного кокса: 
              от сырья до оптимизации выбросов через математическое моделирование 
              циклических параметров f, p, raz.
            </p>
            
            {/* Features */}
            <div className="flex flex-wrap gap-3">
              {features.map((feature, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-700"
                >
                  <feature.icon className="w-4 h-4 text-orange-500" />
                  {feature.label}
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                className="bg-gray-50 rounded-2xl p-6 hover:bg-orange-50 transition-colors duration-300"
              >
                <div className="text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-gray-900">{stat.label}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="border-l-4 border-orange-500 pl-6 max-w-2xl">
          <p className="text-gray-700 italic mb-3">
            "Процесс коксования — это искусство баланса между энергоэффективностью 
            и экологической ответственностью. Понимание циклических паттернов 
            управляющих параметров открывает путь к созданию предиктивных моделей 
            снижения вредных выбросов."
          </p>
          <p className="text-sm text-gray-500">— Методология цифрового двойника</p>
        </div>
      </div>
    </section>
  );
}

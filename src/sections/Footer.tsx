import { Flame, Github, Mail, ExternalLink } from 'lucide-react';

const links = [
  { label: 'Процесс коксования', href: '#process' },
  { label: 'Управляющие параметры', href: '#parameters' },
  { label: 'Контроль выбросов', href: '#emissions' },
  { label: 'Цифровой двойник', href: '#modeling' },
];

const resources = [
  { label: 'ГОСТ 9521-74', href: '#' },
  { label: 'Методика расчёта выбросов', href: '#' },
  { label: 'Правила технической эксплуатации', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-lg">CokingLab</span>
            </div>
            <p className="text-gray-400 max-w-md mb-6">
              Платформа для моделирования и оптимизации процессов коксования. 
              Цифровой двойник коксовой батареи для снижения вредных выбросов 
              и повышения энергоэффективности.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-3">
              {links.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Ресурсы</h4>
            <ul className="space-y-3">
              {resources.map((resource, idx) => (
                <li key={idx}>
                  <a 
                    href={resource.href} 
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    {resource.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 CokingLab. Материал подготовлен для технического погружения.
          </p>
          <p className="text-gray-600 text-sm">
            На основе открытых источников и технической документации
          </p>
        </div>
      </div>
    </footer>
  );
}

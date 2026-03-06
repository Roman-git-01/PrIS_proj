export interface Task {
  id: string;
  title: string;
  description: string;
  block: 'data' | 'predictor' | 'modeling' | 'optimization' | 'interface';
  status: 'todo' | 'progress' | 'done' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedHours: number;
  spentHours: number;
  tags: string[];
  createdAt: string;
  completedAt?: string;
}

export interface BlockProgress {
  blockId: string;
  blockName: string;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  totalHours: number;
  spentHours: number;
  color: string;
}

export interface UserProgress {
  tasks: Task[];
  lastVisited: string;
  totalHoursSpent: number;
  streakDays: number;
  achievements: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (progress: UserProgress) => boolean;
}

export const BLOCKS = [
  { id: 'data', name: 'Data Pipeline', color: '#3b82f6' },
  { id: 'predictor', name: 'Predictor Engine', color: '#10b981' },
  { id: 'modeling', name: 'Modeling Engine', color: '#8b5cf6' },
  { id: 'optimization', name: 'Optimization Engine', color: '#f59e0b' },
  { id: 'interface', name: 'Interface Layer', color: '#ef4444' },
] as const;

export const INITIAL_TASKS: Task[] = [
  // Data Pipeline
  {
    id: 'DATA-01',
    title: 'Подключение к источникам данных',
    description: 'Реализация коннекторов к SCADA-системе, прямое чтение с OPC/Modbus',
    block: 'data',
    status: 'todo',
    priority: 'critical',
    estimatedHours: 16,
    spentHours: 0,
    tags: ['connector', 'scada', 'opc'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'DATA-02',
    title: 'Валидация и очистка данных',
    description: 'Обнаружение аномалий, пропусков, выбросов. Заполнение пропусков',
    block: 'data',
    status: 'todo',
    priority: 'critical',
    estimatedHours: 12,
    spentHours: 0,
    tags: ['validation', 'cleaning'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'DATA-03',
    title: 'Feature Engineering',
    description: 'Лаги, скользящие окна, циклические признаки, взаимодействия',
    block: 'data',
    status: 'todo',
    priority: 'high',
    estimatedHours: 20,
    spentHours: 0,
    tags: ['features', 'engineering'],
    createdAt: new Date().toISOString(),
  },
  // Predictor Engine
  {
    id: 'PRED-01',
    title: 'Baseline: XGBoost модель',
    description: 'Реализация базовой модели для прогнозирования CO, NOx, SO2',
    block: 'predictor',
    status: 'progress',
    priority: 'critical',
    estimatedHours: 24,
    spentHours: 8,
    tags: ['xgboost', 'baseline'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'PRED-02',
    title: 'Advanced: LSTM модель',
    description: 'Sequence-to-sequence архитектура, multi-horizon prediction',
    block: 'predictor',
    status: 'todo',
    priority: 'high',
    estimatedHours: 40,
    spentHours: 0,
    tags: ['lstm', 'deep-learning'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'PRED-03',
    title: 'Multi-horizon forecasting',
    description: 'Прогнозирование на N time: 5min, 15min, 30min, 1h, 2h, 4h',
    block: 'predictor',
    status: 'todo',
    priority: 'high',
    estimatedHours: 16,
    spentHours: 0,
    tags: ['forecasting', 'multi-horizon'],
    createdAt: new Date().toISOString(),
  },
  // Modeling Engine
  {
    id: 'MODEL-01',
    title: 'Математическая модель циклов',
    description: 'Пилообразная функция кантовки, трапецеидальная функция периода коксования',
    block: 'modeling',
    status: 'progress',
    priority: 'critical',
    estimatedHours: 32,
    spentHours: 12,
    tags: ['cycles', 'mathematics'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'MODEL-02',
    title: 'Калибровка модели по данным',
    description: 'Подбор параметров циклов под реальные данные',
    block: 'modeling',
    status: 'todo',
    priority: 'high',
    estimatedHours: 20,
    spentHours: 0,
    tags: ['calibration', 'optimization'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'MODEL-03',
    title: 'Симуляция "what-if"',
    description: 'Возможность задавать сценарии изменения параметров',
    block: 'modeling',
    status: 'todo',
    priority: 'medium',
    estimatedHours: 16,
    spentHours: 0,
    tags: ['simulation', 'what-if'],
    createdAt: new Date().toISOString(),
  },
  // Optimization Engine
  {
    id: 'OPT-01',
    title: 'Режим A: Недопущение ПДК',
    description: 'Алгоритм экстренной корректировки параметров при приближении к ПДК',
    block: 'optimization',
    status: 'todo',
    priority: 'high',
    estimatedHours: 24,
    spentHours: 0,
    tags: ['emergency', 'pdk'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'OPT-02',
    title: 'Режим B: Стратегическая оптимизация',
    description: 'Bayesian Optimization для минимизации интегральных выбросов за период',
    block: 'optimization',
    status: 'todo',
    priority: 'high',
    estimatedHours: 40,
    spentHours: 0,
    tags: ['bayesian', 'strategy'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'OPT-03',
    title: 'Constraint handling',
    description: 'Реализация ограничений: T, p, α, качество кокса',
    block: 'optimization',
    status: 'todo',
    priority: 'medium',
    estimatedHours: 12,
    spentHours: 0,
    tags: ['constraints', 'limits'],
    createdAt: new Date().toISOString(),
  },
  // Interface Layer
  {
    id: 'UI-01',
    title: 'Дашборд оператора',
    description: 'Real-time визуализация параметров, прогнозов, алертов',
    block: 'interface',
    status: 'todo',
    priority: 'high',
    estimatedHours: 32,
    spentHours: 0,
    tags: ['dashboard', 'ui'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'UI-02',
    title: 'Интерфейс оптимизации',
    description: 'UI для запуска оптимизации, настройки целевых функций',
    block: 'interface',
    status: 'todo',
    priority: 'medium',
    estimatedHours: 24,
    spentHours: 0,
    tags: ['ui', 'optimization'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'UI-03',
    title: 'API и интеграции',
    description: 'REST API, webhook alerts, экспорт в Excel/PDF',
    block: 'interface',
    status: 'todo',
    priority: 'medium',
    estimatedHours: 20,
    spentHours: 0,
    tags: ['api', 'integration'],
    createdAt: new Date().toISOString(),
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-task',
    title: 'Первый шаг',
    description: 'Выполнить первую задачу',
    icon: '🎯',
    condition: (p) => p.tasks.filter(t => t.status === 'done').length >= 1,
  },
  {
    id: 'five-tasks',
    title: 'Моментум',
    description: 'Выполнить 5 задач',
    icon: '🚀',
    condition: (p) => p.tasks.filter(t => t.status === 'done').length >= 5,
  },
  {
    id: 'block-complete',
    title: 'Блок закрыт',
    description: 'Завершить все задачи в одном блоке',
    icon: '📦',
    condition: (p) => {
      const blocks = ['data', 'predictor', 'modeling', 'optimization', 'interface'];
      return blocks.some(block => {
        const blockTasks = p.tasks.filter(t => t.block === block);
        return blockTasks.length > 0 && blockTasks.every(t => t.status === 'done');
      });
    },
  },
  {
    id: 'hours-50',
    title: 'Полсотни',
    description: 'Потратить 50 часов на разработку',
    icon: '⏱️',
    condition: (p) => p.totalHoursSpent >= 50,
  },
  {
    id: 'hours-100',
    title: 'Сотня',
    description: 'Потратить 100 часов на разработку',
    icon: '💯',
    condition: (p) => p.totalHoursSpent >= 100,
  },
  {
    id: 'streak-7',
    title: 'Неделя без остановки',
    description: '7 дней подряд работы над проектом',
    icon: '🔥',
    condition: (p) => p.streakDays >= 7,
  },
  {
    id: 'all-critical',
    title: 'Критический путь',
    description: 'Завершить все критические задачи',
    icon: '⚡',
    condition: (p) => {
      const critical = p.tasks.filter(t => t.priority === 'critical');
      return critical.length > 0 && critical.every(t => t.status === 'done');
    },
  },
];

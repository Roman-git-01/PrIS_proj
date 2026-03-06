import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useProgress } from '@/context/ProgressContext';
import type { Task } from '@/types';
import { 
  Flame, LogOut, CheckCircle2, Circle, AlertCircle, 
  Calendar, Award, Timer, Plus,
  ChevronDown, ChevronUp, Play, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const STATUS_CONFIG = {
  todo: { label: 'To Do', color: 'bg-slate-500', icon: Circle },
  progress: { label: 'In Progress', color: 'bg-amber-500', icon: Play },
  done: { label: 'Done', color: 'bg-green-500', icon: CheckCircle2 },
  blocked: { label: 'Blocked', color: 'bg-red-500', icon: AlertCircle },
};

const PRIORITY_CONFIG = {
  low: { label: 'Low', color: 'bg-slate-400' },
  medium: { label: 'Medium', color: 'bg-blue-400' },
  high: { label: 'High', color: 'bg-orange-400' },
  critical: { label: 'Critical', color: 'bg-red-500' },
};

const BLOCK_COLORS: Record<string, string> = {
  data: '#3b82f6',
  predictor: '#10b981',
  modeling: '#8b5cf6',
  optimization: '#f59e0b',
  interface: '#ef4444',
};

const BLOCK_NAMES: Record<string, string> = {
  data: 'Data Pipeline',
  predictor: 'Predictor Engine',
  modeling: 'Modeling Engine',
  optimization: 'Optimization Engine',
  interface: 'Interface Layer',
};

export default function Dashboard() {
  const { logout } = useAuth();
  const { 
    tasks, 
    updateTaskStatus, 
    updateTaskHours,
    addTask,
    deleteTask,
    getBlockProgress, 
    getOverallProgress,
    unlockedAchievements,
    totalHoursSpent,
    streakDays,
  } = useProgress();

  const [selectedBlock, setSelectedBlock] = useState<string | 'all'>('all');
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [showAddTask, setShowAddTask] = useState(false);

  const overall = getOverallProgress();
  const blocks = getBlockProgress();

  const filteredTasks = selectedBlock === 'all' 
    ? tasks 
    : tasks.filter(t => t.block === selectedBlock);

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    const statusOrder = { blocked: 0, progress: 1, todo: 2, done: 3 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return statusOrder[a.status] - statusOrder[b.status];
  });

  const handleHoursChange = (taskId: string, value: string) => {
    const hours = parseFloat(value) || 0;
    updateTaskHours(taskId, hours);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-slate-900">ПрИС Dashboard</h1>
                <p className="text-xs text-slate-500">Предиктивная Информационная Система</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Stats */}
              <div className="hidden md:flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">{totalHoursSpent}ч</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">{streakDays} дней streak</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span className="text-sm text-slate-600">{unlockedAchievements.length} достижений</span>
                </div>
              </div>

              <Button variant="ghost" size="sm" onClick={logout} className="text-slate-500">
                <LogOut className="w-4 h-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Progress */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Общий прогресс проекта</h2>
            <span className="text-2xl font-bold">{overall.percentage.toFixed(1)}%</span>
          </div>
          <Progress value={overall.percentage} className="h-3 bg-white/20" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold">{overall.completed}</div>
              <div className="text-sm text-slate-300">Выполнено задач</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold">{overall.inProgress}</div>
              <div className="text-sm text-slate-300">В работе</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold">{overall.totalHours}ч</div>
              <div className="text-sm text-slate-300">Запланировано</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold">{overall.spentHours}ч</div>
              <div className="text-sm text-slate-300">Потрачено</div>
            </div>
          </div>
        </div>

        {/* Block Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <button
            onClick={() => setSelectedBlock('all')}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              selectedBlock === 'all' 
                ? 'border-slate-900 bg-slate-100' 
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="font-semibold text-slate-900 mb-2">Все блоки</div>
            <Progress value={overall.percentage} className="h-2" />
            <div className="text-sm text-slate-500 mt-2">{overall.completed}/{overall.total} задач</div>
          </button>

          {blocks.map(block => (
            <button
              key={block.blockId}
              onClick={() => setSelectedBlock(block.blockId)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedBlock === block.blockId 
                  ? 'border-slate-900 bg-slate-100' 
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: block.color }} />
                <div className="font-semibold text-slate-900 text-sm">{block.blockName}</div>
              </div>
              <Progress value={block.progress} className="h-2" />
              <div className="text-sm text-slate-500 mt-2">{block.completed}/{block.total} задач</div>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tasks List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Задачи {selectedBlock !== 'all' && `— ${BLOCK_NAMES[selectedBlock]}`}
              </h3>
              <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить задачу
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Новая задача</DialogTitle>
                  </DialogHeader>
                  <AddTaskForm onAdd={(task) => { addTask(task); setShowAddTask(false); }} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-3">
              {sortedTasks.map(task => {
                const status = STATUS_CONFIG[task.status];
                const priority = PRIORITY_CONFIG[task.priority];
                const isExpanded = expandedTask === task.id;
                const StatusIcon = status.icon;

                return (
                  <div 
                    key={task.id} 
                    className={`bg-white rounded-xl border-2 transition-all ${
                      task.status === 'done' ? 'border-green-200 opacity-75' : 'border-slate-200'
                    }`}
                  >
                    <div 
                      className="p-4 cursor-pointer"
                      onClick={() => setExpandedTask(isExpanded ? null : task.id)}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const nextStatus = task.status === 'done' ? 'todo' : 'done';
                            updateTaskStatus(task.id, nextStatus);
                          }}
                          className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                            task.status === 'done' ? 'bg-green-500 text-white' : 'bg-slate-200 hover:bg-slate-300'
                          }`}
                        >
                          {task.status === 'done' && <CheckCircle2 className="w-4 h-4" />}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-mono text-slate-400">{task.id}</span>
                            <Badge className={`${priority.color} text-white text-xs`}>
                              {priority.label}
                            </Badge>
                            <div 
                              className="w-2 h-2 rounded-full" 
                              style={{ backgroundColor: BLOCK_COLORS[task.block] }}
                            />
                          </div>
                          <h4 className={`font-medium mt-1 ${task.status === 'done' ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                            {task.title}
                          </h4>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {status.label}
                          </Badge>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-slate-100 pt-4">
                        <p className="text-sm text-slate-600 mb-4">{task.description}</p>
                        
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-500">Статус:</span>
                            <Select 
                              value={task.status} 
                              onValueChange={(v) => updateTaskStatus(task.id, v as Task['status'])}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="todo">To Do</SelectItem>
                                <SelectItem value="progress">In Progress</SelectItem>
                                <SelectItem value="done">Done</SelectItem>
                                <SelectItem value="blocked">Blocked</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-500">Потрачено часов:</span>
                            <Input
                              type="number"
                              value={task.spentHours}
                              onChange={(e) => handleHoursChange(task.id, e.target.value)}
                              className="w-20"
                              min={0}
                              step={0.5}
                            />
                            <span className="text-sm text-slate-400">/ {task.estimatedHours}ч</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {task.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="mt-4 flex justify-end">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-600"
                            onClick={() => deleteTask(task.id)}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Удалить
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                Достижения
              </h3>
              <div className="space-y-3">
                {unlockedAchievements.length === 0 ? (
                  <p className="text-sm text-slate-500">Пока нет достижений. Продолжай работать!</p>
                ) : (
                  unlockedAchievements.map(achievement => (
                    <div key={achievement.id} className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <div className="font-medium text-slate-900">{achievement.title}</div>
                        <div className="text-xs text-slate-500">{achievement.description}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Motivation */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-2">Мотивация дня</h3>
              <p className="text-sm opacity-90">
                {overall.percentage < 25 && "Каждое большое путешествие начинается с первого шага. Ты на правильном пути!"}
                {overall.percentage >= 25 && overall.percentage < 50 && "Отличный прогресс! Первые 25% — это уже серьезное достижение."}
                {overall.percentage >= 50 && overall.percentage < 75 && "Половина пути пройдена! Осталось совсем немного до финиша."}
                {overall.percentage >= 75 && overall.percentage < 100 && "Финишная прямая! Ты почти у цели, не останавливайся!"}
                {overall.percentage === 100 && "Поздравляем! Проект завершен. Ты сделал невозможное!"}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Статистика</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Эффективность</span>
                  <span className="text-sm font-medium">
                    {overall.totalHours > 0 ? ((overall.spentHours / overall.totalHours) * 100).toFixed(0) : 0}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Осталось задач</span>
                  <span className="text-sm font-medium">{overall.total - overall.completed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">В работе</span>
                  <span className="text-sm font-medium">{overall.inProgress}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function AddTaskForm({ onAdd }: { onAdd: (task: any) => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [block, setBlock] = useState('data');
  const [priority, setPriority] = useState('medium');
  const [hours, setHours] = useState('8');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      title,
      description,
      block,
      status: 'todo',
      priority,
      estimatedHours: parseInt(hours),
      spentHours: 0,
      tags: [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Название</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label className="text-sm font-medium">Описание</label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label className="text-sm font-medium">Блок</label>
        <Select value={block} onValueChange={setBlock}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="data">Data Pipeline</SelectItem>
            <SelectItem value="predictor">Predictor Engine</SelectItem>
            <SelectItem value="modeling">Modeling Engine</SelectItem>
            <SelectItem value="optimization">Optimization Engine</SelectItem>
            <SelectItem value="interface">Interface Layer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium">Приоритет</label>
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium">Оценка (часов)</label>
        <Input type="number" value={hours} onChange={(e) => setHours(e.target.value)} min={1} />
      </div>
      <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
        Добавить задачу
      </Button>
    </form>
  );
}

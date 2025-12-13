import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface EngagementChartProps {
  timeRange: string;
  darkMode?: boolean;
}

export function EngagementChart({ timeRange, darkMode }: EngagementChartProps) {
  // Dados dinâmicos baseados no timeRange
  const getChartData = () => {
    switch (timeRange) {
      case '7d':
        return [
          { date: 'Seg', active: 425, completed: 89, enrolled: 45 },
          { date: 'Ter', active: 478, completed: 102, enrolled: 52 },
          { date: 'Qua', active: 512, completed: 95, enrolled: 38 },
          { date: 'Qui', active: 489, completed: 118, enrolled: 61 },
          { date: 'Sex', active: 534, completed: 125, enrolled: 48 },
          { date: 'Sáb', active: 387, completed: 87, enrolled: 29 },
          { date: 'Dom', active: 298, completed: 72, enrolled: 31 },
        ];
      case '30d':
        return [
          { date: 'Sem 1', active: 3125, completed: 678, enrolled: 312 },
          { date: 'Sem 2', active: 3456, completed: 723, enrolled: 289 },
          { date: 'Sem 3', active: 3298, completed: 695, enrolled: 345 },
          { date: 'Sem 4', active: 3587, completed: 756, enrolled: 398 },
        ];
      case '90d':
        return [
          { date: 'Mês 1', active: 12456, completed: 2678, enrolled: 1234 },
          { date: 'Mês 2', active: 13234, completed: 2845, enrolled: 1156 },
          { date: 'Mês 3', active: 14123, completed: 3012, enrolled: 1398 },
        ];
      case '1y':
        return [
          { date: 'T1', active: 38456, completed: 8234, enrolled: 3678 },
          { date: 'T2', active: 41234, completed: 8956, enrolled: 3912 },
          { date: 'T3', active: 43567, completed: 9345, enrolled: 4234 },
          { date: 'T4', active: 45789, completed: 9876, enrolled: 4567 },
        ];
      default:
        return [
          { date: 'Seg', active: 425, completed: 89, enrolled: 45 },
          { date: 'Ter', active: 478, completed: 102, enrolled: 52 },
          { date: 'Qua', active: 512, completed: 95, enrolled: 38 },
          { date: 'Qui', active: 489, completed: 118, enrolled: 61 },
          { date: 'Sex', active: 534, completed: 125, enrolled: 48 },
          { date: 'Sáb', active: 387, completed: 87, enrolled: 29 },
          { date: 'Dom', active: 298, completed: 72, enrolled: 31 },
        ];
    }
  };

  const data = getChartData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assiduidade dos estudantes</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">Métricas de atividades diárias</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#f0f0f0'} />
            <XAxis 
              dataKey="date" 
              stroke={darkMode ? '#9ca3af' : '#9ca3af'}
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke={darkMode ? '#9ca3af' : '#9ca3af'}
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: darkMode ? '#1f2937' : '#fff',
                border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
                color: darkMode ? '#fff' : '#000',
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="active" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Usuários ativos"
            />
            <Line 
              type="monotone" 
              dataKey="completed" 
              stroke="#10b981" 
              strokeWidth={2}
              name="Concluídos"
            />
            <Line 
              type="monotone" 
              dataKey="enrolled" 
              stroke="#f59e0b" 
              strokeWidth={2}
              name="Tentativa realizada"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
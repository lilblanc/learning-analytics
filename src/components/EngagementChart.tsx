import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DashboardService, EngagementData } from '../services/api';

interface EngagementChartProps { timeRange: string; darkMode?: boolean; }

export function EngagementChart({ timeRange, darkMode }: EngagementChartProps) {
  const [data, setData] = useState<EngagementData[]>([
    { data: 'Seg', ativos: 425, concluidos: 89, tentativas: 45 },
    { data: 'Ter', ativos: 478, concluidos: 102, tentativas: 52 },
    { data: 'Qua', ativos: 512, concluidos: 95, tentativas: 38 },
    { data: 'Qui', ativos: 489, concluidos: 118, tentativas: 61 },
    { data: 'Sex', ativos: 534, concluidos: 125, tentativas: 48 },
    { data: 'Sáb', ativos: 387, concluidos: 87, tentativas: 29 },
    { data: 'Dom', ativos: 298, concluidos: 72, tentativas: 31 },
  ]);

  useEffect(() => {
    DashboardService.getEngajamento(timeRange)
      .then(apiData => setData(apiData))
      .catch(err => console.log(`Usando mock para engajamento (${timeRange}).`, err));
  }, [timeRange]);

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
              dataKey="data" 
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
            <Line type="monotone" dataKey="ativos" stroke="#3b82f6" strokeWidth={2} name="Usuários ativos" />
            <Line type="monotone" dataKey="concluidos" stroke="#10b981" strokeWidth={2} name="Concluídos" />
            <Line type="monotone" dataKey="tentativas" stroke="#f59e0b" strokeWidth={2} name="Tentativa realizada" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
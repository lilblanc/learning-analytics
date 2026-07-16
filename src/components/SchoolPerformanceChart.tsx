import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DashboardService, SchoolData } from '../services/api';

interface SchoolPerformanceChartProps { darkMode?: boolean; timeRange: string; }

export function SchoolPerformanceChart({ darkMode, timeRange }: SchoolPerformanceChartProps) {
  const [data, setData] = useState<SchoolData[]>([]);

  useEffect(() => {
    DashboardService.getDesempenhoEscolas(timeRange)
      .then(apiData => setData(apiData))
      .catch(err => console.log("Erro ao carregar desempenho por escola", err));
  }, [timeRange]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Desempenho por Escola</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">Comparativo de métricas entre instituições</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#f0f0f0'} />
            <XAxis type="number" stroke={darkMode ? '#9ca3af' : '#9ca3af'} style={{ fontSize: '12px' }} />
            <YAxis type="category" dataKey="escola" width={130} stroke={darkMode ? '#9ca3af' : '#9ca3af'} style={{ fontSize: '12px' }} />
            <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1f2937' : '#fff', border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, borderRadius: '8px', color: darkMode ? '#fff' : '#000' }} />
            <Legend />
            <Bar dataKey="notaMedia" fill="#3b82f6" name="Nota Média (%)" radius={[0, 4, 4, 0]} />
            <Bar dataKey="taxaConclusao" fill="#10b981" name="Taxa de Conclusão (%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
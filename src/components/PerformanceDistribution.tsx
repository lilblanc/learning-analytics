import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DashboardService, PerformanceData } from '../services/api';

interface PerformanceDistributionProps { darkMode?: boolean; timeRange: string; }

export function PerformanceDistribution({ darkMode, timeRange }: PerformanceDistributionProps) {
  const [data, setData] = useState<PerformanceData[]>([
    { nome: 'Excelente (90–100%)', valor: 0, cor: '#10b981' },
    { nome: 'Bom (80–89%)', valor: 0, cor: '#3b82f6' },
    { nome: 'Mediano (70–79%)', valor: 0, cor: '#f59e0b' },
    { nome: 'Abaixo da média (<70%)', valor: 0, cor: '#ef4444' },
  ]);

  useEffect(() => {
    const loadData = () => {
      DashboardService.getDistribuicaoPerformance(timeRange)
        .then(apiData => setData(apiData))
        .catch(err => console.log("Erro ao carregar distribuição de performance", err));
    };
    
    loadData();
    const intervalId = setInterval(loadData, 3000);
    return () => clearInterval(intervalId);
  }, [timeRange]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de performance</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">Variação de pontuação</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="nome" interval={0} angle={-20} textAnchor="end" height={80} tick={{ fill: darkMode ? '#d1d5db' : '#374151', fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: darkMode ? '#d1d5db' : '#374151', fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip formatter={(value: number) => [`${value} alunos`, '']} contentStyle={{ backgroundColor: darkMode ? '#1f2937' : '#fff', border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, borderRadius: '8px', color: darkMode ? '#fff' : '#000' }} />
            <Bar dataKey="valor" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.cor} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DashboardService, CityData } from '../services/api';

interface CityPerformanceChartProps { darkMode?: boolean; }

export function CityPerformanceChart({ darkMode }: CityPerformanceChartProps) {
  const [data, setData] = useState<CityData[]>([]);

  useEffect(() => {
    DashboardService.getDesempenhoCidades()
      .then(apiData => setData(apiData))
      .catch(err => console.log("Erro ao carregar desempenho por cidade", err));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Desempenho por Cidade</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">Análise regional - Mato Grosso</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} barGap={8} barCategoryGap="25%">
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#f0f0f0'} />
            <XAxis dataKey="cidade" stroke={darkMode ? '#9ca3af' : '#9ca3af'} style={{ fontSize: '12px' }} />
            <YAxis stroke={darkMode ? '#9ca3af' : '#9ca3af'} style={{ fontSize: '12px' }} />
            <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1f2937' : '#fff', border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, borderRadius: '8px', color: darkMode ? '#fff' : '#000' }} />
            <Legend />
            <Bar dataKey="notaMedia" fill="#3b82f6" name="Nota Média (%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="engajamento" fill="#f59e0b" name="Engajamento (%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="taxaConclusao" fill="#10b981" name="Conclusão (%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
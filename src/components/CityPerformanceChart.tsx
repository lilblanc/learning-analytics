import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface CityPerformanceChartProps {
  darkMode?: boolean;
}

export function CityPerformanceChart({ darkMode }: CityPerformanceChartProps) {
  const data = [
    { city: 'Cuiabá', students: 1847, avgScore: 86.4, engagement: 78, completion: 89 },
    { city: 'Várzea Grande', students: 1523, avgScore: 84.1, engagement: 75, completion: 87 },
    { city: 'Sinop', students: 892, avgScore: 88.7, engagement: 82, completion: 92 },
    { city: 'Santo Antônio', students: 645, avgScore: 82.3, engagement: 71, completion: 84 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Desempenho por Cidade</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">Análise regional - Mato Grosso</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#f0f0f0'} />
            <XAxis 
              dataKey="city"
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
            <Bar 
              dataKey="avgScore" 
              fill="#3b82f6" 
              name="Nota Média (%)"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="engagement" 
              fill="#f59e0b" 
              name="Engajamento (%)"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="completion" 
              fill="#10b981" 
              name="Conclusão (%)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

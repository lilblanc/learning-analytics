import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SchoolPerformanceChartProps {
  darkMode?: boolean;
}

export function SchoolPerformanceChart({ darkMode }: SchoolPerformanceChartProps) {
  const data = [
    { school: 'Escola Santa Maria', students: 485, avgScore: 87.5, completion: 92 },
    { school: 'Colégio Dom Bosco', students: 612, avgScore: 84.2, completion: 88 },
    { school: 'CEFET-MT', students: 523, avgScore: 89.3, completion: 95 },
    { school: 'Escola Técnica', students: 398, avgScore: 81.7, completion: 85 },
    { school: 'Instituto Federal', students: 556, avgScore: 90.1, completion: 94 },
    { school: 'Colégio Militar', students: 445, avgScore: 88.6, completion: 91 },
  ];

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
            <XAxis 
              type="number"
              stroke={darkMode ? '#9ca3af' : '#9ca3af'}
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              type="category"
              dataKey="school" 
              width={130}
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
              radius={[0, 4, 4, 0]}
            />
            <Bar 
              dataKey="completion" 
              fill="#10b981" 
              name="Taxa de Conclusão (%)"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

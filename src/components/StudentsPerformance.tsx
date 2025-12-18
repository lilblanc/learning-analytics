import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface PerformanceDistributionProps {
  darkMode?: boolean;
}

interface ChartDataItem {
  name: string;
  value: number;
  color: string;
  [key: string]: any;
}

export function PerformanceDistribution({ darkMode }: PerformanceDistributionProps) {
  const data: ChartDataItem[] = [
    { name: 'Excelente (90-100%)', value: 412, color: '#10b981' },
    { name: 'Bom(80-89%)', value: 687, color: '#3b82f6' },
    { name: 'Mediano (70-79%)', value: 534, color: '#f59e0b' },
    { name: 'Abaixo da média (<70%)', value: 298, color: '#ef4444' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance dos Estudantes</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">Variação de pontuação</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#f0f0f0'} />
            <XAxis 
              dataKey="name"
              stroke={darkMode ? '#9ca3af' : '#9ca3af'}
              style={{ fontSize: '16px' }}
              angle={-15}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke={darkMode ? '#9ca3af' : '#9ca3af'}
              style={{ fontSize: '12px' }}
              label={{ value: 'Estudantes', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: darkMode ? '#1f2937' : '#fff',
                border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
                color: darkMode ? '#fff' : '#000',
              }}
              formatter={(value: number) => [`${value} estudantes`, 'Quantidade']}
            />
            <Bar 
              dataKey="value" 
              radius={[8, 8, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
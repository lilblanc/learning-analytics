import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

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
        <CardTitle>Distribuição de performance</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">Variação de pontuação</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry: any) => `${((entry.percent || 0) * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: darkMode ? '#1f2937' : '#fff',
                border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
                color: darkMode ? '#fff' : '#000',
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
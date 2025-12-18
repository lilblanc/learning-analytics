import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ContentPerformanceChartProps {
  darkMode?: boolean;
}

interface ActivityData {
  [key: string]: {
    tema: string;
    acertos: number;
    erros: number;
  }[];
}

export function ContentPerformanceChart({ darkMode }: ContentPerformanceChartProps) {
  const [selectedActivity, setSelectedActivity] = useState('pequeno-grande-cidadao');

  const activityData: ActivityData = {
    'pequeno-grande-cidadao': [
      { tema: 'ICMS', acertos: 342, erros: 89 },
      { tema: 'ISS', acertos: 298, erros: 112 },
      { tema: 'IPTU', acertos: 387, erros: 67 },
      { tema: 'IPVA', acertos: 315, erros: 95 },
      { tema: 'Nota Fiscal', acertos: 425, erros: 54 },
    ],
    'aventura-fiscal': [
      { tema: 'ICMS', acertos: 412, erros: 73 },
      { tema: 'Tributos Estaduais', acertos: 356, erros: 98 },
      { tema: 'Tributos Municipais', acertos: 289, erros: 125 },
      { tema: 'Cidadania Fiscal', acertos: 445, erros: 42 },
      { tema: 'Orçamento Público', acertos: 378, erros: 87 },
    ],
    'palavras-magicas': [
      { tema: 'ICMS', acertos: 256, erros: 134 },
      { tema: 'ISS', acertos: 223, erros: 156 },
      { tema: 'IPTU', acertos: 289, erros: 98 },
      { tema: 'IPVA', acertos: 267, erros: 121 },
      { tema: 'Outros Tributos', acertos: 198, erros: 167 },
    ],
    'palavras-cruzadas': [
      { tema: 'Direitos e Deveres', acertos: 478, erros: 56 },
      { tema: 'Arrecadação', acertos: 423, erros: 89 },
      { tema: 'Aplicação de Recursos', acertos: 389, erros: 102 },
      { tema: 'Transparência', acertos: 456, erros: 67 },
      { tema: 'Participação Social', acertos: 412, erros: 78 },
    ],
  };

  const data = activityData[selectedActivity];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const total = payload[0].payload.acertos + payload[0].payload.erros;
      const taxaAcerto = ((payload[0].payload.acertos / total) * 100).toFixed(1);
      
      return (
        <div
          className="rounded-lg p-3 shadow-lg border"
          style={{
            backgroundColor: darkMode ? '#1f2937' : '#fff',
            borderColor: darkMode ? '#374151' : '#e5e7eb',
          }}
        >
          <p className="font-semibold mb-2" style={{ color: darkMode ? '#fff' : '#000' }}>
            {payload[0].payload.tema}
          </p>
          <p style={{ color: '#10b981' }}>
            Acertos: {payload[0].payload.acertos}
          </p>
          <p style={{ color: '#ef4444' }}>
            Erros: {payload[0].payload.erros}
          </p>
          <p className="mt-1 pt-1 border-t" style={{ 
            color: darkMode ? '#9ca3af' : '#6b7280',
            borderColor: darkMode ? '#374151' : '#e5e7eb'
          }}>
            Taxa de Acerto: {taxaAcerto}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Desempenho de Conteúdo por Atividade</CardTitle>
            <p className="text-gray-600 dark:text-gray-400">Erros e acertos por tema em cada jogo</p>
          </div>
          <Select value={selectedActivity} onValueChange={setSelectedActivity}>
            <SelectTrigger className="w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pequeno-grande-cidadao">Pequeno Grande Cidadão</SelectItem>
              <SelectItem value="aventura-fiscal">Aventura Fiscal</SelectItem>
              <SelectItem value="palavras-magicas">Palavras Mágicas</SelectItem>
              <SelectItem value="palavras-cruzadas">Palavras Cruzadas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#f0f0f0'} />
            <XAxis 
              dataKey="tema"
              stroke={darkMode ? '#9ca3af' : '#9ca3af'}
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke={darkMode ? '#9ca3af' : '#9ca3af'}
              style={{ fontSize: '12px' }}
              label={{ 
                value: 'Quantidade', 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: darkMode ? '#9ca3af' : '#9ca3af', fontSize: '12px' }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="acertos" 
              fill="#10b981" 
              name="Acertos"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="erros" 
              fill="#ef4444" 
              name="Erros"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { DashboardService, RecentActivity } from '../services/api';

interface RecentActivityTableProps { darkMode?: boolean; timeRange: string; }

export function RecentActivityTable({ darkMode, timeRange }: RecentActivityTableProps) {
  const [activities, setActivities] = useState<RecentActivity[]>([
    { estudante: 'Sarah Fernandes', iniciais: 'SF', acao: 'Atividade concluída', aplicacao: 'Aventura fiscal', tempo: '5 minutos atrás', status: 'concluido' },
    { estudante: 'Michael Oliveira', iniciais: 'MO', acao: 'Iniciou atividade', aplicacao: 'Palavras cruzadas', tempo: '12 minutos atrás', status: 'em-progresso' },
    { estudante: 'Emily Rodrigues', iniciais: 'ER', acao: 'Múltiplas tentativas', aplicacao: 'Pequeno Grande Cidadão', tempo: '23 minutos atrás', status: 'em-progresso' },
    { estudante: 'David Fonseca', iniciais: 'DF', acao: 'Atividade concluída', aplicacao: 'Palavras mágicas', tempo: '45 minutos atrás', status: 'concluido' },
  ]);

  useEffect(() => {
    const loadData = () => {
      DashboardService.getAtividadeRecente(timeRange)
        .then(data => setActivities(data))
        .catch(err => console.log("Usando mock para atividades recentes.", err));
    };

    loadData();
    const intervalId = setInterval(loadData, 3000);
    return () => clearInterval(intervalId);
  }, [timeRange]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluido': return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
      case 'em-progresso': return darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800';
      case 'multiplas tentativas': return darkMode ? 'bg-orange-900 text-orange-300' : 'bg-orange-100 text-orange-800';
      default: return '';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">Últimas interações dos alunos</p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Estudante</TableHead>
              <TableHead>Atividade</TableHead>
              <TableHead>Tempo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {activity.iniciais}
                      </AvatarFallback>
                    </Avatar>
                    <span>{activity.estudante}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>{activity.acao}</div>
                    <Badge className={getStatusColor(activity.status)}>
                      {activity.aplicacao}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400">
                  {activity.tempo}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
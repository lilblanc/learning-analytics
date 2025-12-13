import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from './ui/table';
  import { Badge } from './ui/badge';
  import { Avatar, AvatarFallback } from './ui/avatar';
  
  interface RecentActivityTableProps {
    darkMode?: boolean;
  }
  
  export function RecentActivityTable({ darkMode }: RecentActivityTableProps) {
    const activities = [
      { 
        student: 'Sarah Fernandes', 
        initials: 'SF',
        action: 'Atividade concluída',
        application: 'Aventura fiscal',
        time: '5 minutos atrás',
        status: 'concluido'
      },
      { 
        student: 'Michael Oliveira', 
        initials: 'MO',
        action: 'Iniciou atividade',
        application: 'Palavras cruzadas',
        time: '12 minutos atrás',
        status: 'em-progresso'
      },
      { 
        student: 'Emily Rodrigues', 
        initials: 'ER',
        action: 'Múltiplas tentativas',
        application: 'Pequeno Grande Cidadão',
        time: '23 minutos atrás',
        status: 'em-progresso'
      },
      { 
        student: 'David Fonseca', 
        initials: 'DF',
        action: 'Atividade concluída',
        application: 'Palavras mágicas',
        time: '45 minutos atrás',
        status: 'concluido'
      },
    ];
  
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'concluido':
          return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
        case 'em-progresso':
          return darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800';
        case 'multiplas tentativas':
          return darkMode ? 'bg-orange-900 text-orange-300' : 'bg-orange-100 text-orange-800';
        default:
          return '';
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
                          {activity.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span>{activity.student}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div>{activity.action}</div>
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.application}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">
                    {activity.time}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
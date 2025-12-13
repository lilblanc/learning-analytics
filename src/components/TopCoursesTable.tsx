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
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TopCoursesTableProps {
  darkMode?: boolean;
}

export function TopCoursesTable({ darkMode }: TopCoursesTableProps) {
  const courses = [
    { 
      name: 'Pequeno Grande Cidadão', 
      students: 342, 
      rating: 4.8, 
      completion: 84,
      trend: 'up',
      change: 12
    },
    { 
      name: 'Aventura Fiscal', 
      students: 298, 
      rating: 4.6, 
      completion: 67,
      trend: 'up',
      change: 8
    },
    { 
      name: 'Palvras Cruzadas', 
      students: 267, 
      rating: 4.9, 
      completion: 88,
      trend: 'up',
      change: 15
    },
    { 
      name: 'Palavras mágicas', 
      students: 234, 
      rating: 4.5, 
      completion: 71,
      trend: 'down',
      change: 3
    },

  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Melhores </CardTitle>
        <p className="text-gray-600 dark:text-gray-400">Mais populares e bem avaliados</p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Curso</TableHead>
              <TableHead>Estudantes</TableHead>
              <TableHead>Avaliação</TableHead>
              <TableHead>Conclusão</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {course.name}
                    {course.trend === 'up' ? (
                      <TrendingUp className={`h-3 w-3 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    ) : (
                      <TrendingDown className={`h-3 w-3 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                    )}
                  </div>
                </TableCell>
                <TableCell>{course.students}</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    ⭐ {course.rating}
                  </Badge>
                </TableCell>
                <TableCell>{course.completion}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
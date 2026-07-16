import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { DashboardService, CourseData } from '../services/api';

interface TopCoursesTableProps { darkMode?: boolean; timeRange: string; }

export function TopCoursesTable({ darkMode, timeRange }: TopCoursesTableProps) {
  const [courses, setCourses] = useState<CourseData[]>([]);

  useEffect(() => {
    const loadData = () => {
      DashboardService.getTopCursos(timeRange)
        .then(apiData => setCourses(apiData))
        .catch(err => console.log("Erro ao carregar cursos", err));
    };

    loadData();
    const intervalId = setInterval(loadData, 3000);
    return () => clearInterval(intervalId);
  }, [timeRange]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Melhores</CardTitle>
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
                    {course.nome}
                    {course.tendencia === 'up' ? (
                      <TrendingUp className={`h-3 w-3 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    ) : (
                      <TrendingDown className={`h-3 w-3 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                    )}
                  </div>
                </TableCell>
                <TableCell>{course.estudantes}</TableCell>
                <TableCell><Badge variant="secondary">⭐ {course.avaliacao}</Badge></TableCell>
                <TableCell>{course.taxaConclusao}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
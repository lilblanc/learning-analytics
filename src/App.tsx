import { useState } from 'react';
import { MetricsOverview } from './components/MetricsOverview';
import { EngagementChart } from './components/EngagementChart';
import { ApplicationCompletionChart } from './components/ApplicationCompletitionChart';
import { RecentActivityTable } from './components/RecentActivityTable';
import { TopCoursesTable } from './components/TopCoursesTable';
import { StudentsPerformance } from './components/StudentsPerformance';
import { SchoolPerformanceChart } from './components/SchoolPerformanceChart';
import { CityPerformanceChart } from './components/CityPerformanceChart';
import { Button } from './components/ui/button';
import { Calendar, Download, Moon, Sun } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';

export default function App() {
  const [timeRange, setTimeRange] = useState('7d');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-gray-900 dark:text-white">Learning Analytics Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Meça a performance do estudante e a taxa de conclusão</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Últimos 7 dias</SelectItem>
                  <SelectItem value="30d">Últimos 30 dias</SelectItem>
                  <SelectItem value="90d">Últimos 90 dias</SelectItem>
                  <SelectItem value="1y">Último ano</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar Relatório
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <MetricsOverview timeRange={timeRange} darkMode={darkMode} />

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EngagementChart timeRange={timeRange} darkMode={darkMode} />
            <StudentsPerformance darkMode={darkMode} />
          </div>

          {/* Course Completion */}
          <ApplicationCompletionChart darkMode={darkMode} />

                    {/* City Performance */}
          <CityPerformanceChart darkMode={darkMode} />

          {/* School Performance */}
          <SchoolPerformanceChart darkMode={darkMode} />


          {/* Tables Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopCoursesTable darkMode={darkMode} />
            <RecentActivityTable darkMode={darkMode} />
          </div>


        </div>
      </div>
    </div>
  );
}
import { Card, CardContent } from "./ui/card";
import {
  Users,
  BookOpen,
  Award,
  TrendingUp,
} from "lucide-react";

interface MetricsOverviewProps {
  timeRange: string;
  darkMode?: boolean;
}

export function MetricsOverview({
  timeRange,
  darkMode,
}: MetricsOverviewProps) {
  // Dados dinâmicos baseados no timeRange selecionado
  const getMetricsData = () => {
    switch (timeRange) {
      case '7d':
        return {
          students: { value: '2,847', change: '+12.5%' },
          courses: { value: '48', change: '+3' },
          completion: { value: '74.2%', change: '+5.4%' },
          engagement: { value: '8.4/10', change: '+0.8' },
        };
      case '30d':
        return {
          students: { value: '2,652', change: '+8.3%' },
          courses: { value: '45', change: '+2' },
          completion: { value: '72.8%', change: '+3.2%' },
          engagement: { value: '8.1/10', change: '+0.5' },
        };
      case '90d':
        return {
          students: { value: '2,415', change: '+15.7%' },
          courses: { value: '42', change: '+5' },
          completion: { value: '71.5%', change: '+7.8%' },
          engagement: { value: '7.9/10', change: '+1.2' },
        };
      case '1y':
        return {
          students: { value: '2,156', change: '+24.3%' },
          courses: { value: '38', change: '+8' },
          completion: { value: '68.9%', change: '+12.1%' },
          engagement: { value: '7.5/10', change: '+1.8' },
        };
      default:
        return {
          students: { value: '2,847', change: '+12.5%' },
          courses: { value: '48', change: '+3' },
          completion: { value: '74.2%', change: '+5.4%' },
          engagement: { value: '8.4/10', change: '+0.8' },
        };
    }
  };

  const data = getMetricsData();

  const metrics = [
    {
      title: "Total de Estudantes",
      value: data.students.value,
      change: data.students.change,
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: darkMode ? "bg-blue-950" : "bg-blue-50",
      darkColor: "dark:text-blue-400",
    },
    {
      title: "Ferramentas ativas",
      value: data.courses.value,
      change: data.courses.change,
      trend: "up",
      icon: BookOpen,
      color: "text-green-600",
      bgColor: darkMode ? "bg-green-950" : "bg-green-50",
      darkColor: "dark:text-green-400",
    },
    {
      title: "Taxa média de conclusão",
      value: data.completion.value,
      change: data.completion.change,
      trend: "up",
      icon: Award,
      color: "text-purple-600",
      bgColor: darkMode ? "bg-purple-950" : "bg-purple-50",
      darkColor: "dark:text-purple-400",
    },
    {
      title: "Taxa de engajamento",
      value: data.engagement.value,
      change: data.engagement.change,
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: darkMode ? "bg-orange-950" : "bg-orange-50",
      darkColor: "dark:text-orange-400",
    },
    
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-400">
                    {metric.title}
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {metric.value}
                  </p>
                  <p className={`text-green-600 dark:text-green-400`}>
                    {metric.change} do último período
                  </p>
                </div>
                <div
                  className={`${metric.bgColor} ${metric.color} ${metric.darkColor} p-3 rounded-lg transition-colors`}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
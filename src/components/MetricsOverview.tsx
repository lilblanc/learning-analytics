import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Users, BookOpen, Award } from "lucide-react";
import { DashboardService, MetricsData } from "../services/api";

interface MetricsOverviewProps { timeRange: string; darkMode?: boolean; }

export function MetricsOverview({ timeRange, darkMode }: MetricsOverviewProps) {
  const [data, setData] = useState<MetricsData>({
    estudantes: { valor: '2.847', mudanca: '+12.5%' },
    ferramentas: { valor: '48', mudanca: '+3' },
    conclusao: { valor: '74.2%', mudanca: '+5.4%' },
  });

  useEffect(() => {
    const loadData = () => {
      DashboardService.getMetricasGerais(timeRange)
        .then(apiData => setData(apiData))
        .catch(err => console.log(`Usando mock para métricas (${timeRange}).`, err));
    };

    loadData();
    const intervalId = setInterval(loadData, 3000);
    return () => clearInterval(intervalId);
  }, [timeRange]);

  const metrics = [
    { title: "Total de Estudantes", value: data.estudantes.valor, change: data.estudantes.mudanca, icon: Users, color: "text-blue-600", bgColor: darkMode ? "bg-blue-950" : "bg-blue-50", darkColor: "dark:text-blue-400" },
    { title: "Ferramentas ativas", value: data.ferramentas.valor, change: data.ferramentas.mudanca, icon: BookOpen, color: "text-green-600", bgColor: darkMode ? "bg-green-950" : "bg-green-50", darkColor: "dark:text-green-400" },
    { title: "Taxa média de conclusão", value: data.conclusao.valor, change: data.conclusao.mudanca, icon: Award, color: "text-purple-600", bgColor: darkMode ? "bg-purple-950" : "bg-purple-50", darkColor: "dark:text-purple-400" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className="w-full">
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-400">{metric.title}</p>
                  <p className="text-gray-900 dark:text-white">{metric.value}</p>
                  <p className="text-green-600 dark:text-green-400">{metric.change} do último período</p>
                </div>
                <div className={`${metric.bgColor} ${metric.color} ${metric.darkColor} p-3 rounded-lg`}>
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
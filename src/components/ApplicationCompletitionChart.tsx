import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { DashboardService, ApplicationData, TaxData } from "../services/api";

interface ApplicationCompletionChartProps {
  darkMode?: boolean;
  timeRange: string;
}

export function ApplicationCompletionChart({ darkMode, timeRange }: ApplicationCompletionChartProps) {
  const [appData, setAppData] = useState<ApplicationData[]>([]);
  const [taxData, setTaxData] = useState<TaxData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAllData() {
      try {
        setLoading(true);
        const [apps, taxes] = await Promise.all([
          DashboardService.getConclusaoAtividades(timeRange),
          DashboardService.getDesempenhoTributos(timeRange)
        ]);
        setAppData(apps);
        setTaxData(taxes);
      } catch (error) {
        console.error("Falha na sincronização com o banco:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAllData();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 opacity-50">
        <Card className="h-[450px] flex items-center justify-center">Sincronizando com o banco...</Card>
        <Card className="h-[450px] flex items-center justify-center">Sincronizando com o banco...</Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Visão Geral da conclusão das atividades</CardTitle>
          <p className="text-gray-600 dark:text-gray-400">Números de usuários vs conclusão de por atividade</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={appData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#f0f0f0"} />
              <XAxis type="number" stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <YAxis dataKey="aplicacao" type="category" width={180} stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <Tooltip contentStyle={{ backgroundColor: darkMode ? "#1f2937" : "#fff", borderRadius: "8px" }} />
              <Legend />
              <Bar dataKey="completado" fill="#10b981" name="Concluído" />
              <Bar dataKey="emProgresso" fill="#f59e0b" name="Em progresso" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Desempenho por conteúdo trabalhado</CardTitle>
          <p className="text-gray-600 dark:text-gray-400">Acertos e erros por conteúdo trabalhado</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={taxData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#f0f0f0"} />
              <XAxis dataKey="tributo" stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <Tooltip contentStyle={{ backgroundColor: darkMode ? "#1f2937" : "#fff", borderRadius: "8px" }} />
              <Legend />
              <Bar dataKey="acerto" fill="#3b82f6" name="Acertos" />
              <Bar dataKey="erro" fill="#ef4444" name="Erros" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
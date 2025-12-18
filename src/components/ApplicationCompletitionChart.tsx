import {Card,CardContent,CardHeader,CardTitle} from "../components/ui/card";
  import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
  } from "recharts";
  
  interface ApplicationCompletionChartProps {
    darkMode?: boolean;
  }
  
  export function ApplicationCompletionChart({
    darkMode,
  }: ApplicationCompletionChartProps) {
  
    // DADOS POR ATIVIDADE
    const data = [
      {
        application: "Pequeno Grande Cidadão",
        enrolled: 342,
        completed: 289,
        inProgress: 53,
      },
      {
        application: "Aventura Fiscal",
        enrolled: 298,
        completed: 201,
        inProgress: 97,
      },
      {
        application: "Palavras Cruzadas",
        enrolled: 267,
        completed: 234,
        inProgress: 33,
      },
      {
        application: "Palavras mágicas",
        enrolled: 234,
        completed: 167,
        inProgress: 67,
      },
    ];
  
    // DADOS POR TIPO DE TRIBUTO
    const taxData = [
      {
        tax: "ICMS",
        correct: 420,
        incorrect: 120,
      },
      {
        tax: "IPTU",
        correct: 310,
        incorrect: 90,
      },
      {
        tax: "IPVA",
        correct: 280,
        incorrect: 70,
      },
    ];
  
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  
        {/* GRAFICO 1 - CONCLUSÃO POR ATIVIDADE */}
        <Card>
          <CardHeader>
            <CardTitle>
              Visão Geral da conclusão das atividades
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400">
              Número de usuários vs conclusão por atividade
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={darkMode ? "#374151" : "#f0f0f0"}
                />
                <XAxis
                  type="number"
                  stroke={darkMode ? "#9ca3af" : "#9ca3af"}
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  dataKey="application"
                  type="category"
                  width={180}
                  stroke={darkMode ? "#9ca3af" : "#9ca3af"}
                  style={{ fontSize: "12px" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#1f2937" : "#fff",
                    border: `1px solid ${darkMode ? "#374151" : "#e5e7eb"}`,
                    borderRadius: "8px",
                    color: darkMode ? "#fff" : "#000",
                  }}
                />
                <Legend />
                <Bar dataKey="completed" fill="#10b981" name="Concluído" />
                <Bar dataKey="inProgress" fill="#f59e0b" name="Não finalizadas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
  
        {/* GRAFICO 2 - DESEMPENHO POR TIPO DE TRIBUTO */}
        <Card>
          <CardHeader>
            <CardTitle>
              Desempenho por conteúdo trabalhado
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400">
              Acertos e erros por conteúdo trabalhado
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={taxData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={darkMode ? "#374151" : "#f0f0f0"}
                />
                <XAxis
                  dataKey="tax"
                  stroke={darkMode ? "#9ca3af" : "#9ca3af"}
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  stroke={darkMode ? "#9ca3af" : "#9ca3af"}
                  style={{ fontSize: "12px" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#1f2937" : "#fff",
                    border: `1px solid ${darkMode ? "#374151" : "#e5e7eb"}`,
                    borderRadius: "8px",
                    color: darkMode ? "#fff" : "#000",
                  }}
                />
                <Legend />
                <Bar dataKey="correct" fill="#3b82f6" name="Acertos" />
                <Bar dataKey="incorrect" fill="#ef4444" name="Erros" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
  
      </div>
    );
  }
  
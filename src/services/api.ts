

const API_BASE_URL = "https://api-la-production.up.railway.app/api";
// const API_BASE_URL = "http://localhost:8000/api";

export interface ApplicationData { aplicacao: string; matriculados: number; completado: number; emProgresso: number; }
export interface TaxData { tributo: string; acerto: number; erro: number; }
export interface RecentActivity { estudante: string; iniciais: string; acao: string; aplicacao: string; tempo: string; status: string; }
export interface SchoolData { escola: string; estudantes: number; notaMedia: number; taxaConclusao: number; }
export interface CourseData { nome: string; estudantes: number; avaliacao: number; taxaConclusao: number; tendencia: 'up' | 'down'; mudanca: number; }
export interface CityData { cidade: string; estudantes: number; notaMedia: number; engajamento: number; taxaConclusao: number; }
export interface EngagementData { data: string; ativos: number; concluidos: number; tentativas: number; }
export interface MetricDetail { valor: string; mudanca: string; }
export interface MetricsData { estudantes: MetricDetail; ferramentas: MetricDetail; conclusao: MetricDetail; }
export interface PerformanceData { nome: string; valor: number; cor: string; }

export const DashboardService = {
  async getConclusaoAtividades(timeRange: string): Promise<ApplicationData[]> {
    const res = await fetch(`${API_BASE_URL}/dashboard/conclusao-atividades?range=${timeRange}`);
    if (!res.ok) throw new Error("Erro API"); return res.json();
  },
  async getDesempenhoTributos(timeRange: string): Promise<TaxData[]> {
    const res = await fetch(`${API_BASE_URL}/dashboard/tributos?range=${timeRange}`);
    if (!res.ok) throw new Error("Erro API"); return res.json();
  },
  async getAtividadeRecente(timeRange: string): Promise<RecentActivity[]> {
    const res = await fetch(`${API_BASE_URL}/dashboard/atividade-recente?range=${timeRange}`);
    if (!res.ok) throw new Error("Erro API"); return res.json();
  },
  async getDesempenhoEscolas(timeRange: string): Promise<SchoolData[]> {
    const res = await fetch(`${API_BASE_URL}/dashboard/escolas?range=${timeRange}`);
    if (!res.ok) throw new Error("Erro API"); return res.json();
  },
  async getTopCursos(timeRange: string): Promise<CourseData[]> {
    const res = await fetch(`${API_BASE_URL}/dashboard/top-cursos?range=${timeRange}`);
    if (!res.ok) throw new Error("Erro API"); return res.json();
  },
  async getDesempenhoCidades(timeRange: string): Promise<CityData[]> {
    const res = await fetch(`${API_BASE_URL}/dashboard/cidades?range=${timeRange}`);
    if (!res.ok) throw new Error("Erro API"); return res.json();
  },
  async getEngajamento(timeRange: string): Promise<EngagementData[]> {
    const res = await fetch(`${API_BASE_URL}/dashboard/engajamento?range=${timeRange}`);
    if (!res.ok) throw new Error("Erro API"); return res.json();
  },
  async getMetricasGerais(timeRange: string): Promise<MetricsData> {
    const res = await fetch(`${API_BASE_URL}/dashboard/metricas-gerais?range=${timeRange}`);
    if (!res.ok) throw new Error("Erro API"); return res.json();
  },
  async getDistribuicaoPerformance(timeRange: string): Promise<PerformanceData[]> {
    const res = await fetch(`${API_BASE_URL}/dashboard/performance?range=${timeRange}`);
    if (!res.ok) throw new Error("Erro API"); return res.json();
  }
};
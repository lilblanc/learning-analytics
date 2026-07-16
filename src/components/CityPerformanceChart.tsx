import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { DashboardService, CityData } from '../services/api';
import geojsonData from '../assets/mato-grosso-geojson.json';

interface CityPerformanceChartProps { darkMode?: boolean; timeRange: string; }

// Função para normalizar nome de cidade
const normalizeCityName = (name: string) => {
  return name.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export function CityPerformanceChart({ darkMode, timeRange }: CityPerformanceChartProps) {
  const [data, setData] = useState<CityData[]>([]);

  useEffect(() => {
    const loadData = () => {
      DashboardService.getDesempenhoCidades(timeRange)
        .then(apiData => {
          if (apiData && apiData.length > 0) {
            setData(apiData);
          } else {
            setData([
              { cidade: 'Cuiabá', estudantes: 1500, notaMedia: 88, engajamento: 92, taxaConclusao: 85 },
              { cidade: 'Várzea Grande', estudantes: 800, notaMedia: 78, engajamento: 80, taxaConclusao: 75 },
              { cidade: 'Rondonópolis', estudantes: 1200, notaMedia: 82, engajamento: 85, taxaConclusao: 80 },
              { cidade: 'Sinop', estudantes: 900, notaMedia: 91, engajamento: 94, taxaConclusao: 88 },
              { cidade: 'Tangará da Serra', estudantes: 500, notaMedia: 74, engajamento: 70, taxaConclusao: 68 },
              { cidade: 'Cáceres', estudantes: 450, notaMedia: 81, engajamento: 79, taxaConclusao: 72 },
              { cidade: 'Sorriso', estudantes: 600, notaMedia: 89, engajamento: 91, taxaConclusao: 86 },
              { cidade: 'Lucas do Rio Verde', estudantes: 550, notaMedia: 90, engajamento: 88, taxaConclusao: 87 }
            ]);
          }
        })
        .catch(err => {
          console.log("Erro ao carregar desempenho por cidade", err);
        });
    };

    loadData();
    const intervalId = setInterval(loadData, 3000);
    return () => clearInterval(intervalId);
  }, [timeRange]);

  const cityDataMap = data.reduce((acc, city) => {
    acc[normalizeCityName(city.cidade)] = city;
    return acc;
  }, {} as Record<string, CityData>);

  const getColor = (municipalityName: string) => {
    const city = cityDataMap[normalizeCityName(municipalityName)];
    if (!city) return darkMode ? "#374151" : "#e5e7eb"; 
    
    if (city.notaMedia >= 85) return "#10b981"; 
    if (city.notaMedia >= 75) return "#f59e0b"; 
    return "#ef4444"; 
  };

  const style = (feature: any) => {
    const municipalityName = feature.properties.name;
    const color = getColor(municipalityName);
    return {
      fillColor: color,
      weight: 1,
      opacity: 1,
      color: darkMode ? '#1f2937' : 'white',
      dashArray: '3',
      fillOpacity: 0.9,
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    const municipalityName = feature.properties.name;
    const cityInfo = cityDataMap[normalizeCityName(municipalityName)];
    
    let tooltipContent = `<div style="font-family: inherit; padding: 4px;">`;
    tooltipContent += `<strong style="font-size: 14px;">${municipalityName}</strong><br/>`;
    
    if (cityInfo) {
      tooltipContent += `<div style="margin-top: 6px; font-size: 12px; line-height: 1.5;">`;
      tooltipContent += `<strong>Nota Média:</strong> ${cityInfo.notaMedia}%<br/>`;
      tooltipContent += `<strong>Engajamento:</strong> ${cityInfo.engajamento}%<br/>`;
      tooltipContent += `<strong>Conclusão:</strong> ${cityInfo.taxaConclusao}%<br/>`;
      tooltipContent += `<strong>Estudantes:</strong> ${cityInfo.estudantes.toLocaleString('pt-BR')}`;
      tooltipContent += `</div>`;
    } else {
      tooltipContent += `<div style="margin-top: 6px; font-size: 12px; color: #888;">Sem dados disponíveis</div>`;
    }
    tooltipContent += `</div>`;

    layer.bindTooltip(tooltipContent, {
      permanent: false,
      direction: 'top',
      offset: [0, -10],
      opacity: 0.95,
      className: darkMode ? 'custom-tooltip dark-tooltip' : 'custom-tooltip',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Desempenho por Cidade</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">Análise regional do estado de Mato Grosso</p>
      </CardHeader>
      <CardContent>
        <div style={{ height: '400px', width: '100%', borderRadius: '0.5rem', overflow: 'hidden', position: 'relative', zIndex: 0, backgroundColor: 'transparent' }}>
          <MapContainer 
            center={[-12.64, -55.42]} 
            zoom={5} 
            style={{ height: '100%', width: '100%', zIndex: 1, backgroundColor: 'transparent' }}
            scrollWheelZoom={false}
          >
            <GeoJSON
              key={data.length}
              data={geojsonData as any}
              style={style}
              onEachFeature={onEachFeature}
            />
          </MapContainer>
        </div>
        
        {/* Legenda */}
        <div className="mt-6 flex flex-wrap gap-4 text-sm justify-center items-center">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-[#10b981] rounded shadow-sm border border-black/10"></span> 
            <span className="text-gray-700 dark:text-gray-300">Excelente (≥ 85%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-[#f59e0b] rounded shadow-sm border border-black/10"></span> 
            <span className="text-gray-700 dark:text-gray-300">Bom (75% - 84%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-[#ef4444] rounded shadow-sm border border-black/10"></span> 
            <span className="text-gray-700 dark:text-gray-300">Atenção (&lt; 75%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-4 h-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded shadow-sm border border-black/10`}></span> 
            <span className="text-gray-700 dark:text-gray-300">Sem dados</span>
          </div>
        </div>

        <style>{`
          .custom-tooltip {
            border: none;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          .dark-tooltip {
            background-color: #1f2937 !important;
            color: #f3f4f6 !important;
            border: 1px solid #374151 !important;
          }
          .dark-tooltip .leaflet-tooltip-tip {
            background-color: #1f2937;
          }
          .leaflet-container {
            font-family: inherit;
            background: transparent !important;
          }
        `}</style>
      </CardContent>
    </Card>
  );
}
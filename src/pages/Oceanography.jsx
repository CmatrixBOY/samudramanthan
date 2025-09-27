import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import ApexChart from '../components/charts/ApexChart.jsx';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import ocean from '../mock/oceanography.json';

export default function Oceanography() {
  const { region } = useOutletContext();
  const data = useMemo(()=> ocean[region] || ocean['Bay of Bengal'], [region]);

  const options = {
    chart: { animations: { enabled: true } },
    xaxis: { categories: data.months },
    yaxis: [{ title: { text: 'SST (°C)' } }, { opposite: true, title: { text: 'Salinity (PSU)' } }],
    stroke: { curve: 'smooth' }
  };

  const series = [
    { name: 'Sea Surface Temp', data: data.sst },
    { name: 'Salinity', data: data.salinity },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-1">
      <Card>
        <CardHeader><CardTitle>Ocean Parameters</CardTitle></CardHeader>
        <CardContent>
          <ApexChart type="line" height={340} options={options} series={series} />
        </CardContent>
      </Card>
    </div>
  );
}

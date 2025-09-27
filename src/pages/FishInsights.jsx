import { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ApexChart from '../components/charts/ApexChart.jsx';
import FusionDonut from '../components/charts/FusionDonut.jsx';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import fish from '../mock/fish.json';

export default function FishInsights() {
  const { species, region } = useOutletContext();
  const [series, setSeries] = useState([]);

  const base = useMemo(() => {
    const key = `${species}|${region}`;
    return fish.trends[key] || Array.from({ length: 12 }, (_, i) => ({ month: i + 1, value: Math.max(10, 100 + Math.sin(i/2)*30) }));
  }, [species, region]);

  useEffect(() => {
    let t;
    function tick(i = 0) {
      const vals = base.map((p, idx) => ({ x: `M${p.month}`, y: Math.max(0, p.value + (idx % 3 === 0 ? 2 : -1) + (Math.random()*4-2)) }));
      setSeries([{ name: `${species} (${region})`, data: vals }]);
      t = setTimeout(() => tick(i + 1), 1500);
    }
    tick();
    return () => clearTimeout(t);
  }, [base, species, region]);

  const options = {
    chart: { id: 'fish', animations: { enabled: true } },
    xaxis: { type: 'category' },
    yaxis: { title: { text: 'Count (index)' } },
    stroke: { curve: 'smooth' }
  };

  const donutData = (fish.speciesBreakdown[region] || []).map(([label, value]) => ({ label, value }));

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Population Trend</CardTitle></CardHeader>
        <CardContent>
          <ApexChart type="line" height={320} options={options} series={series} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Species Distribution</CardTitle></CardHeader>
        <CardContent>
          <FusionDonut data={donutData} caption={`Species in ${region}`} />
        </CardContent>
      </Card>
    </div>
  );
}

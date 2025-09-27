import { useMemo, useRef } from 'react';
import ApexChart from '../components/charts/ApexChart.jsx';
import IndiaMap from '../components/charts/IndiaMap.jsx';
import ExportMenu from '../components/export/ExportMenu.jsx';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import states from '../mock/states.json';

const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const entityIds = { 'Kerala':'IN.KL','Gujarat':'IN.GJ','Tamil Nadu':'IN.TN','Andhra Pradesh':'IN.AP','Maharashtra':'IN.MH' };

export default function FishingRatio() {
  const categories = states.states.map(s=>s.state);
  const barSeries = [
    { name: 'Catch (tonnes)', data: states.states.map(s=>s.catch) },
    { name: 'Damage Ratio (%)', data: states.states.map(s=>s.damageRatio) },
  ];

  const barOptions = {
    chart: { stacked: false },
    xaxis: { categories },
    yaxis: [{ title: { text: 'Tonnes' } }, { opposite: true, title: { text: '%' } }],
    dataLabels: { enabled: false },
    plotOptions: { bar: { horizontal: false } },
    tooltip: { shared: true, intersect: false }
  };

  const pieSeries = states.states.map(s=>s.catch);
  const pieOptions = { labels: categories, legend: { position: 'bottom' } };

  const heatmapSeries = useMemo(() => {
    return categories.map((state,i)=>({
      name: state,
      data: monthNames.map((m,idx)=>({ x: m, y: Math.max(0, Math.round(states.states[i].catch/10 + (Math.sin(idx+i)*20))) }))
    }));
  }, [categories]);

  const lineOptions = { xaxis: { categories: monthNames }, stroke: { curve: 'smooth' } };
  const lineSeries = [
    { name: 'Avg Damage Ratio', data: monthNames.map((_,i)=> Math.round(5 + (i % 6) + (i%2?2:0))) }
  ];

  const mapData = states.states.map(s=>({ id: entityIds[s.state], value: s.catch }));

  const exportRows = states.states.map(s=>({ State: s.state, Catch: s.catch, DamageRatio: s.damageRatio }));
  const cardRef1 = useRef(null);
  const cardRef2 = useRef(null);
  const cardRef3 = useRef(null);
  const cardRef4 = useRef(null);
  const cardRef5 = useRef(null);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader right={<ExportMenu filename="catch-by-state" rows={exportRows} targetRef={cardRef1} docxTitle="Catch by State" />}>
          <CardTitle>Catch per State and Damage Ratio</CardTitle>
        </CardHeader>
        <CardContent contentRef={cardRef1}>
          <ApexChart type="bar" height={360} options={barOptions} series={barSeries} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader right={<ExportMenu filename="catch-share" rows={exportRows} targetRef={cardRef2} docxTitle="Catch Share by State" />}>
          <CardTitle>Catch Share (Pie)</CardTitle>
        </CardHeader>
        <CardContent contentRef={cardRef2}>
          <ApexChart type="pie" height={360} options={pieOptions} series={pieSeries} />
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader right={<ExportMenu filename="heatmap-catch" rows={exportRows} targetRef={cardRef3} docxTitle="Monthly Heatmap" />}>
          <CardTitle>Monthly Heatmap (Catch Index)</CardTitle>
        </CardHeader>
        <CardContent contentRef={cardRef3}>
          <ApexChart type="heatmap" height={380} options={{ dataLabels: { enabled: false } }} series={heatmapSeries} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader right={<ExportMenu filename="damage-trend" rows={exportRows} targetRef={cardRef4} docxTitle="Damage Ratio Trend" />}>
          <CardTitle>Damage Ratio Trend</CardTitle>
        </CardHeader>
        <CardContent contentRef={cardRef4}>
          <ApexChart type="line" height={320} options={lineOptions} series={lineSeries} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader right={<ExportMenu filename="india-map-catch" rows={exportRows} targetRef={cardRef5} docxTitle="India Map - Catch" />}>
          <CardTitle>India Map – Catch by State</CardTitle>
        </CardHeader>
        <CardContent contentRef={cardRef5}>
          <IndiaMap data={mapData} />
        </CardContent>
      </Card>
    </div>
  );
}

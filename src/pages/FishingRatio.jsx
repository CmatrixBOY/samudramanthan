import ApexChart from '../components/charts/ApexChart.jsx';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import states from '../mock/states.json';

export default function FishingRatio() {
  const categories = states.states.map(s=>s.state);
  const series = [
    { name: 'Catch (tonnes)', data: states.states.map(s=>s.catch) },
    { name: 'Damage Ratio (%)', data: states.states.map(s=>s.damageRatio) },
  ];

  const options = {
    chart: { stacked: false },
    xaxis: { categories },
    yaxis: [{ title: { text: 'Tonnes' } }, { opposite: true, title: { text: '%' } }],
    dataLabels: { enabled: false },
    plotOptions: { bar: { horizontal: false } }
  };

  return (
    <Card>
      <CardHeader><CardTitle>Catch per State and Damage Ratio</CardTitle></CardHeader>
      <CardContent>
        <ApexChart type="bar" height={360} options={options} series={series} />
      </CardContent>
    </Card>
  );
}

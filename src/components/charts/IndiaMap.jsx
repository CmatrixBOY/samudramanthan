import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Maps from 'fusioncharts/fusioncharts.maps';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Maps, FusionTheme);

export default function IndiaMap({ data = [], caption = 'Catch by State' }) {
  const dataSource = {
    chart: {
      caption,
      theme: 'fusion',
      entityfillhovercolor: '#cccccc',
      showentitytooltip: '1'
    },
    colorrange: {
      minvalue: '0',
      startlabel: 'Low',
      endlabel: 'High',
      code: '#E0F2FE',
      gradient: '1',
      color: [
        { minvalue: '0', maxvalue: '300', color: '#93C5FD' },
        { minvalue: '300', maxvalue: '700', color: '#2563EB' }
      ]
    },
    data
  };
  return <ReactFC type="maps/india" width="100%" height="360" dataFormat="JSON" dataSource={dataSource} />;
}

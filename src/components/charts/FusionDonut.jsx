import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

export default function FusionDonut({ data, caption = 'Distribution', subcaption = '', height = 320 }) {
  const dataSource = {
    chart: {
      caption,
      subcaption,
      showpercentvalues: '1',
      defaultcenterlabel: 'Species',
      aligncaptionwithcanvas: '0',
      captionpadding: '0',
      decimals: '1',
      theme: 'fusion'
    },
    data,
  };
  return <ReactFC type="doughnut2d" width="100%" height={height} dataFormat="JSON" dataSource={dataSource} />;
}

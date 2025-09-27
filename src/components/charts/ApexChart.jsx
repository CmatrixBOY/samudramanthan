import Chart from 'react-apexcharts';

export default function ApexChart({ type = 'line', height = 300, options, series }) {
  return <Chart type={type} height={height} options={options} series={series} />;
}

import { Line } from 'react-chartjs-2';

export default function LineChart(Data) {
  const dataArr = Data.data;
  const { axesDisplay } = Data;
  const backgroundColor = dataArr[dataArr.length - 1] < dataArr[dataArr.length - 2] ? 'rgba(254, 84, 97, 0.2)' : 'rgba(41, 204, 151, 0.2)';
  const borderColor = dataArr[dataArr.length - 1] < dataArr[dataArr.length - 2] ? 'rgba(254, 84, 97, 1)' : 'rgba(41, 204, 151, 1)';

  const data = {
    labels: Data.labels,
    datasets: [
      {
        label: 'Purchases',
        data: dataArr,
        fill: true,
        backgroundColor,
        borderWidth: 0.75,
        borderColor,
        pointHoverRadius: 6,
        tension: Data.tension,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: axesDisplay,
        //  This is not working here
        //   afterFit: (scale) => {
        //     scale.paddingLeft -= 5;
        //     scale.paddingRight -= 5;
        //   },
        grid: {
          display: axesDisplay,
        },
      },
      y: {
        display: axesDisplay,
        grid: {
          display: axesDisplay,
        },
      },
    },
    plugins: {
      legend: {
        display: axesDisplay,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}

// Yearly
// Monthly: Choose Year
// Daily: Choose Month, Choose Year

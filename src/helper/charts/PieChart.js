import { Doughnut } from 'react-chartjs-2';

function PieChart(property) {
  return (
    <div className="h-100">
      <Doughnut
        data={{
          labels: property.labels,
          datasets: [
            {
              cutout: '72%',
              label: 'no of votes',
              data: property.data,
              backgroundColor: property.backgroundColor,
            }],

        }}
        options={{
          radius: '80%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                color: '#000000',
                font: {
                  size: 14,
                  family: 'PoppinsRegular, sans-serif',
                },
              },
            },
          },
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}

export default PieChart;

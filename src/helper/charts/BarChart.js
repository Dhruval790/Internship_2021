import { Bar } from 'react-chartjs-2';

function BarChart(property) {
  const { color } = property;
  return (
    <div className="h-100">
      <Bar
        data={
                    {
                      labels: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'],
                      datasets: [
                        {
                          label: 'Products',
                          data: [12, 19, 3, 5, 2, 3],
                          backgroundColor: [color,
                            color,
                            color,
                            color,
                            color,
                            color],
                        },
                      ],
                    }
}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}

export default BarChart;

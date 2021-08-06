/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
const chart_lables = ['Order Received', 'Order Not Received'];
const chart_Bgcolor = ['#fec400', '#4c84ff'];

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
let indexedData = {};

const dailyChartDataTemp = {
  type: 'Daily',
  lines: [
    {
      color: '#FEC400',
      month: monthNames[new Date().getMonth()],
      year: new Date().getFullYear(),
    },
  ],
};

const monthlyChartDataTemp = {
  type: 'Monthly',
  lines: [
    {
      color: '#FEC400',
      year: new Date().getFullYear(),
    },
  ],
};

const yearlyChartDataTemp = {
  type: 'Yearly',
  lines: [
    {
      color: '#FEC400',
    },
  ],
};

// For Daily Analysis - Line Chart
const processDailyData = (month, year) => {
  try {
    const chartData = {};
    const { dates } = indexedData[year].months[month];
    for (let i = 1; i <= 31; i += 1) {
      chartData[i] = dates[i] !== undefined ? dates[i] : 0;
    }
    return chartData;
  } catch (e) {
    console.error(e);
    const chartData = {};
    for (let i = 1; i <= 31; i += 1) {
      chartData[i] = 0;
    }
    return chartData;
  }
};

// For Monthly Analysis - Line Chart
const processMonthlyData = (year) => {
  try {
    const chartData = {};
    const { months } = indexedData[year];
    monthNames.forEach((monthName) => {
      chartData[monthName] = months[monthName] !== undefined ? months[monthName].count : 0;
    });
    return chartData;
  } catch (e) {
    console.error(e);
    const chartData = {};
    monthNames.forEach((monthName) => {
      chartData[monthName] = 0;
    });
    return chartData;
  }
};

// For Yearly Analysis - Line Chart
const processYearlyData = () => {
  try {
    const chartData = {};
    for (const key in indexedData) {
      if (Object.hasOwnProperty.call(indexedData, key)) {
        const year = indexedData[key];
        chartData[key] = year.count;
      }
    }
    return chartData;
  } catch (e) {
    console.error(e);
    return {};
  }
};

// For Line Chart
const indexData = (year, month, date) => {
  if (indexedData.hasOwnProperty(year)) {
    indexedData[year].count += 1;
  } else {
    indexedData[year] = {};
    indexedData[year].count = 1;
    indexedData[year].months = {};
  }

  if (indexedData[year].months.hasOwnProperty(month)) {
    indexedData[year].months[month].count += 1;
  } else {
    indexedData[year].months[month] = {};
    indexedData[year].months[month].count = 1;
    indexedData[year].months[month].dates = {};
  }

  if (indexedData[year].months[month].dates.hasOwnProperty(date)) {
    indexedData[year].months[month].dates[date] += 1;
  } else {
    indexedData[year].months[month].dates[date] = 1;
  }
};

const setInitialDailyData = () => {
  const lineData = processDailyData(dailyChartDataTemp.lines[0].month, dailyChartDataTemp.lines[0].year);
  dailyChartDataTemp.lines[0].data = lineData;
};

const setInitialMonthlyData = () => {
  const lineData = processMonthlyData(monthlyChartDataTemp.lines[0].year);
  monthlyChartDataTemp.lines[0].data = lineData;
};

const setInitialYearlyData = () => {
  const lineData = processYearlyData();
  yearlyChartDataTemp.lines[0].data = lineData;
};

// To bifurcate data into active/inactive
const churnData = (intialData, basis) => {
  const activeData = [];
  const inactiveData = [];
  let minYear = 5000;
  let maxYear = -1;
  indexedData = {};

  intialData.forEach((row) => {
    if (row[basis]) {
      activeData.push(row);
    } else {
      inactiveData.push(row);
    }

    // For Line Chart
    const date = new Date(row.date);
    indexData(date.getFullYear(), monthNames[date.getMonth()], date.getDate());

    if (date.getFullYear() < minYear) {
      minYear = date.getFullYear();
    }

    if (date.getFullYear() > maxYear) {
      maxYear = date.getFullYear();
    }
  });

  setInitialDailyData();
  setInitialMonthlyData();
  setInitialYearlyData();

  return {
    activeData, inactiveData, minYear, maxYear,
  };
};

const getIndexedData = () => indexedData;

const getYears = () => Object.keys(indexedData);

export {
  chart_lables, chart_Bgcolor, dailyChartDataTemp, monthlyChartDataTemp, yearlyChartDataTemp,
  processDailyData, processMonthlyData, processYearlyData, churnData, getIndexedData, getYears,
};

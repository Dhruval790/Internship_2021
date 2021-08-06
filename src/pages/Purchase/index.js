/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from 'react';
import {
  FormControl, InputGroup, Breadcrumb,
} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { Table, ToggleButton } from '../../components';
import { LineChartModal } from '../../containers';
import { PieChart } from '../../helper';
import { UserContext } from '../../contexts/user';
import './style.css';
import {
  chart_lables, chart_Bgcolor, dailyChartDataTemp, monthlyChartDataTemp, yearlyChartDataTemp,
  processDailyData, processMonthlyData, processYearlyData, churnData,
} from './data';

const columns = [
  { name: 'Name', key: 'name' },
  { name: 'Supplier', key: 'supplier_name' },
  { name: 'Purchase Price', key: 'purchase_price' },
];
let pieChartData = [];
let initialData = {};
let years = [];
let received = true;

export default function Purchase() {
  const [user, setuser] = useContext(UserContext);
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [dailyChartData, setDailyChartData] = useState(dailyChartDataTemp);
  const [monthlyChartData, setMonthlyChartData] = useState(monthlyChartDataTemp);
  const [yearlyChartData, setYearlyChartData] = useState(yearlyChartDataTemp);
  const [type, setType] = useState('Daily');

  // Called from ToggleButton.js
  function handleProductActiveStatus(value) {
    // To handle filtering based on active status
    let filteredData = [];
    if (initialData[`received-${value}`] !== undefined && initialData[`received-${value}`].length !== 0) {
      if (value) {
        received = true;
      } else if (!value) {
        received = false;
      }
      filteredData = [...initialData[`received-${value}`]];
    }
    setData([...filteredData]);
    // setState({ data });
  }

  function getYears(minYear, maxYear) {
    years = [];
    for (let i = minYear; i <= maxYear; i += 1) {
      years.push(i);
    }
  }

  async function loadData() {
    try {
      // For now using json-server
      const response = await fetch('http://localhost:3001/purchase');
      const loadedData = await response.json();
      const {
        activeData, inactiveData, minYear, maxYear,
      } = churnData([...loadedData], 'received');
      initialData = { // Store all data (used for filter)
        'received-true': activeData,
        'received-false': inactiveData,
      };
      pieChartData = [activeData.length, inactiveData.length];
      getYears(minYear, maxYear); // To get the starting year of a user
      // By default show active products
      handleProductActiveStatus(received); // setState({ data });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleSearchOnChange(event) {
    setSearchValue(event.target.value);
  }

  // For filtering
  function handleSearchOnClick(event) {
    event.stopPropagation();
    const value = searchValue.toLowerCase().trim();
    if (value === '') {
      handleProductActiveStatus(received);
    }

    const filteredData = [];
    if (initialData[`received-${received}`] !== undefined && initialData[`received-${received}`].length !== 0) {
      initialData[`received-${received}`].forEach((row) => {
        const found = columns.find((column) => (
          row.received === received && row[column.key].toString().toLowerCase().includes(value)
        ));
        if (found !== undefined) {
          filteredData.push(row);
        }
      });
      setData([...filteredData]);
    }
  }

  const inputgrp = (
    <InputGroup className="">
      <FormControl
        className="search-bar"
        placeholder="Search"
        value={searchValue}
        onChange={handleSearchOnChange}
      />
      <InputGroup.Text
        className="cursor-pointer"
        onClick={handleSearchOnClick}
      >
        <Search />
      </InputGroup.Text>
    </InputGroup>
  );

  const ToggleBtn = <ToggleButton handleActivity={handleProductActiveStatus} label="RECIEVED" />;
  return (
    <div className="container-fluid py-5 mt-5 purchase">
      <div className="row">
        <div className="col-12">
          <Breadcrumb>
            <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item active>Purchase</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <LineChartModal
            data={
            type === 'Yearly' ? { chartData: yearlyChartData, setChartData: setYearlyChartData, processData: processYearlyData }
              : type === 'Monthly'
                ? { chartData: monthlyChartData, setChartData: setMonthlyChartData, processData: processMonthlyData }
                : type === 'Daily'
                  ? { chartData: dailyChartData, setChartData: setDailyChartData, processData: processDailyData } : undefined
            }
            years={years}
            setType={setType}
          />
        </div>
      </div>
      <div className="row gx-3 gy-3 mt-5 pb-4 p-2">
        <div className="col-md-9 ">
          <div className="purchase_table_container shadow">
            <div className="px-3 my-3">
              <Table columns={columns} data={data} caption="Purchase">
                <div className="Search_toggle_container my-3">
                  <div className="search_div"> {inputgrp} </div>
                  <div className="toggle_div">{ToggleBtn}</div>
                </div>
              </Table>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-lg-3 col-12 chart_container shadow">
          <h2 className="h2 fs-4 d-block mt-2 ms-2 dashboard-card-title">Purchases Overview</h2>
          <div className="pt-3" style={{ height: '81%' }}>
            <PieChart data={pieChartData} backgroundColor={chart_Bgcolor} labels={chart_lables} />
          </div>
        </div>
      </div>
    </div>
  );
}

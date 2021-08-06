/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import {
  DropdownButton, Dropdown, Modal, Button,
} from 'react-bootstrap';
import { DashCircle, XLg, GearFill } from 'react-bootstrap-icons';
import CustomLineChart from '../../helper/charts/CustomLineChart';
import './LineChartModal.css';
// import { getIndexedData } from '../../pages/Purchase/data';

const SelectDropdown = ({
  options, defaultValue, onSelect, index,
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleSelect = (event, eventKey) => {
    event.stopPropagation();
    setValue(eventKey);
    if (onSelect !== undefined) {
      onSelect(eventKey, index);
    }
  };

  return (
    <DropdownButton
      title={value}
      className="signup-dropdown line-chart-dropdown"
      onSelect={(eventKey, event) => handleSelect(event, eventKey)}
    >
      {
        options.map((option, idx) => (
          <Dropdown.Item
            className="signup-dropdown-item"
            eventKey={option}
            key={`option-${idx}`}
          >{option}
          </Dropdown.Item>
        ))
      }
    </DropdownButton>
  );
};

const type = ['Daily', 'Monthly', 'Yearly'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function LineChartModal({ data, setType, years }) {
  const typeName = data.chartData.type;
  const [showModal, setShowModal] = useState(false);

  function hideModal() {
    // event.stopPropagation();
    setShowModal(false);
  }

  function handleOnClickAdd(event) {
    event.stopPropagation();
    const date = new Date();
    const newData = {};
    if (typeName === 'Daily') {
      newData.color = '#F40101';
      newData.year = date.getFullYear();
      newData.month = monthNames[date.getMonth()];
      newData.data = data.processData(newData.month, newData.year);
    } else if (typeName === 'Monthly') {
      newData.color = '#F40101';
      newData.year = date.getFullYear();
      newData.data = data.processData(newData.year);
    }
    const chartData = { ...data.chartData };
    chartData.lines.push(newData);
    data.setChartData({ ...chartData });
  }

  function handleOnClickDelete(event, index) {
    event.stopPropagation();
    const chartData = { ...data.chartData };
    chartData.lines.splice(index, 1);
    data.setChartData({ ...chartData });
  }

  function handleMonthSelect(eventKey, index) {
    const chartData = { ...data.chartData };
    chartData.lines[index].month = eventKey;
    chartData.lines[index].data = data.processData(chartData.lines[index].month, chartData.lines[index].year);
    data.setChartData({ ...chartData });
  }

  function handleYearSelect(eventKey, index) {
    const chartData = { ...data.chartData };
    chartData.lines[index].year = parseInt(eventKey, 10);
    if (typeName === 'Daily') {
      chartData.lines[index].data = data.processData(chartData.lines[index].month, chartData.lines[index].year);
    } else if (typeName === 'Monthly') {
      chartData.lines[index].data = data.processData(chartData.lines[index].year);
    }
    data.setChartData({ ...chartData });
  }

  function handleColorChange(event, index) {
    const chartData = { ...data.chartData };
    chartData.lines[index].color = event.target.value;
    data.setChartData({ ...chartData });
  }

  return (
    <section className="line-chart-card-container">
      <div className="line-chart-wrapper">
        <CustomLineChart chartData={data.chartData} />
      </div>
      <GearFill onClick={() => setShowModal(true)} fontSize="24px" className="cursor-pointer line-chart-custom-settings-icon" />
      <Modal show={showModal} onHide={hideModal} className="line-chart-analysis-modal">
        <Modal.Dialog>
          <Modal.Header className="position-relative">
            <Modal.Title className="dashboard-card-title">Analysis</Modal.Title>
            <div
              className="line-chart-modal-close-icon-wrapper cursor-pointer"
            >
              <XLg onClick={hideModal} />
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="line-chart-modal-body">
              <div className="d-flex justify-content-between align-items-center line-chart-row-1 pb-2 px-2 mx-auto mb-4">
                <SelectDropdown options={type} onSelect={(eventKey) => setType(eventKey)} defaultValue={typeName} />
                {
              typeName !== 'Yearly'
                ? (
                  <Button className="line-chart-add-btn" onClick={handleOnClickAdd}>
                    Add +
                  </Button>
                )
                : (
                  <Button className="line-chart-add-btn" disabled>
                    Add +
                  </Button>
                )
            }
              </div>
              <div className="line-chart-modal-body-overflow">
                <div>
                  {
            typeName !== 'Yearly'
              ? data.chartData.lines.map((line, index) => (
                <div
                  key={`field-${index}`}
                  className="d-flex justify-content-between align-items-center pb-2 px-2 mx-auto mb-4"
                >
                  <input
                    type="color"
                    className="form-control form-control-color"
                    value={line.color}
                    onChange={(event) => handleColorChange(event, index)}
                  />
                  {
                    line.month !== undefined
                      ? (
                        <SelectDropdown
                          options={monthNames}
                          defaultValue={line.month}
                          index={index}
                          onSelect={handleMonthSelect}
                        />
                      )
                      : <></>
                  }
                  {
                    line.year !== undefined
                      ? (
                        <SelectDropdown
                          options={years}
                          defaultValue={line.year}
                          index={index}
                          onSelect={handleYearSelect}
                        />
                      )
                      : <></>
                  }
                  <div className="d-flex align-items-center justify-content-center">
                    <DashCircle
                      className="cursor-pointer"
                      fontSize="20px"
                      onClick={(event) => handleOnClickDelete(event, index)}
                    />
                  </div>
                </div>
              ))
              : <></>
            }
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </section>
  );
}

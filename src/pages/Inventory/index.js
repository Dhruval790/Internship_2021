/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from 'react';
import {
  FormControl, InputGroup, Button, Breadcrumb,
} from 'react-bootstrap';
import { Search, PlusLg } from 'react-bootstrap-icons';
import { Table, ToggleButton } from '../../components';
import { UserContext } from '../../contexts/user';
import { Modal } from '../../containers';
import './style.css';
import { bifurcateData } from './data';

let initialData = {};
let active = true;
const columns = [
  { name: 'Name', key: 'name' },
  { name: 'Company', key: 'company' },
  { name: 'Current Inventory', key: 'current_inventory' },
  { name: 'Incoming Inventory', key: 'incoming_inventory' },
  { name: 'Purchase Price', key: 'purchase_price' },
  { name: 'MSP', key: 'min_selling_price' },
  { name: 'Supplier Name', key: 'supplier_name' },
];

export default function Inventory() {
  const [user, setuser] = useContext(UserContext);
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showAddInventory, setshowAddInventory] = useState(false);
  // Called from ToggleButton.js
  function handleProductActiveStatus(value) {
    // To handle filtering based on active status
    let filteredData = [];
    if (initialData[`active-${value}`] !== undefined && initialData[`active-${value}`].length !== 0) {
      if (value) {
        active = true;
      } else if (!value) {
        active = false;
      }
      filteredData = [...initialData[`active-${value}`]];
    }
    setData([...filteredData]);
    // setState({ data });
  }

  async function loadData() {
    try {
      // For now using json-server
      const response = await fetch('http://localhost:3001/inventory');
      const loadedData = await response.json();
      const { activeData, inactiveData } = bifurcateData([...loadedData], 'active');
      initialData = { // Store all data (used for filter)
        'active-true': activeData,
        'active-false': inactiveData,
      };
      // By default show active products
      handleProductActiveStatus(active); // setState({ data });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
  // context[0] will have all the context data
  // console.log(context[0].accessToken);
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
      handleProductActiveStatus(active);
    }

    const filteredData = [];
    if (initialData[`active-${active}`] !== undefined && initialData[`active-${active}`].length !== 0) {
      initialData[`active-${active}`].forEach((row) => {
        const found = columns.find((column) => (
          row.active === active && row[column.key].toString().toLowerCase().includes(value)
        ));
        if (found !== undefined) {
          filteredData.push(row);
        }
      });
      setData([...filteredData]);
    }
  }

  const handleClickOnDelete = (event, deleteData, index) => {
    event.stopPropagation();
    // console.log(deleteData);
    // console.log(`${index}`);
    // Perform DB delete operations here
  };

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

  const ToggleBtn = <ToggleButton handleActivity={handleProductActiveStatus} />;

  const AddBtn = (
    <Button className="inventory-add-btn" onClick={() => setshowAddInventory(true)}>
      Add another inventory{' '}<PlusLg className="inventory-add-icon" />
    </Button>
  );

  return (
    <div className="container-fluid py-5 mt-5 inventory ">
      <div className="row">
        <div className="col-12">
          <Breadcrumb>
            <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item active>Inventory</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="inventory_searchAndBtn_container w-100 my-2">
        <div className="inventory_search mb-3">{inputgrp}</div>
        <div className="inventory_btn_container">
          <div className="inventory_btn_container_inside">
            <div className="toggleBtn_div">{ToggleBtn}</div>
            <div className="addbtn_div">{AddBtn}</div>
          </div>
        </div>
      </div>

      <div className="col-12 inventory_table_container shadow">
        <div className="px-3 my-3">
          <Table
            columns={columns}
            data={data}
            caption="Inventory"
            deletable
            editable
            handleDelete={handleClickOnDelete}
          />
        </div>
      </div>
      <Modal showItem={showAddInventory} setshowItem={setshowAddInventory} label="Inventory" />
    </div>
  );
}

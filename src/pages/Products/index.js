/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
  FormControl, InputGroup, Breadcrumb, ButtonGroup, Button,
} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { Table, ToggleButton } from '../../components';
import { Modal } from '../../containers';
import { BarChart } from '../../helper';
import './style.css';
import { chart_Bgcolor } from './config';

const columns = [
  { name: 'Product Name', key: 'product_name' },
  { name: 'Manufacturer', key: 'manufacturer' },
  { name: 'Supplier', key: 'supplier_name' },
];
let initialData = [];
let active = true;

export default function Products() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  // this below states sre for the modal , nothing else
  const [showAddProduct, setshowAddProduct] = useState(false);
  const [showAddSupplier, setshowAddSupplier] = useState(false);
  // ==================================================

  // Called from ToggleButton.js
  function handleProductActiveStatus(value) {
    // To handle filtering based on active status
    const filteredData = [];
    if (initialData !== undefined && initialData.length !== 0) {
      if (value) {
        active = true;
        initialData.forEach((row) => {
          if (row.active) {
            filteredData.push(row);
          }
        });
      } else if (!value) {
        active = false;
        initialData.forEach((row) => {
          if (!row.active) {
            filteredData.push(row);
          }
        });
      }
    }
    setData([...filteredData]);
    // setState({ data });
  }

  async function loadData() {
    try {
      // For now using json-server
      const response = await fetch('http://localhost:3001/products');
      const loadedData = await response.json();
      initialData = [...loadedData];// Store all data (used for filter)
      // By default show active products
      handleProductActiveStatus(active);
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
      handleProductActiveStatus(active);
    }

    const filteredData = [];
    if (initialData !== undefined && initialData.length !== 0) {
      initialData.forEach((row) => {
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
  const AddButtonGroup = (
    <ButtonGroup aria-label="Basic example">
      <Button className="AddNewProductBtn" onClick={() => setshowAddProduct(true)}>Add New Product +</Button>
      <Button className="AddSupplierBtn" onClick={() => setshowAddSupplier(true)}>Add Supplier +</Button>
    </ButtonGroup>
  );
  return (
    <div className="container-fluid py-5 mt-5 products">
      <div className="row">
        <div className="col-12">
          <Breadcrumb>
            <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item active>Products</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <div className="row gx-3 gy-3 pb-4 p-2">
        <div className="col-lg-8 col-md-8">
          <div className="purchase_table_container shadow">
            <div className="px-3 my-3">
              <Table
                columns={columns}
                data={data}
                caption="Products"
                deletable
                editable
                handleDelete={handleClickOnDelete}
              >
                <div className="Products_Search_toggle_container my-3">
                  <div> {inputgrp}</div>
                  <div className="btn_grp mt-3">
                    <div className="div_ToggleBtn">{ToggleBtn}</div>
                    <div className="AddButtonGroup_div">{AddButtonGroup}</div>
                  </div>
                </div>
              </Table>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-4 col-12 chart_container shadow">
          <h2 className="h2 fs-4 d-block mt-2 ms-2 dashboard-card-title">Products Overview</h2>
          <div className="product_barchart pt-3 mt-5">
            <BarChart color={chart_Bgcolor} />
          </div>
        </div>
      </div>
      <Modal showItem={showAddProduct} setshowItem={setshowAddProduct} label="Product" />
      <Modal showItem={showAddSupplier} setshowItem={setshowAddSupplier} label="Supplier" />
    </div>
  );
}

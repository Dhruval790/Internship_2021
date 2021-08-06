/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Table, Form,
} from 'react-bootstrap';
import {
  PencilSquare, ArrowDown, ArrowUp, TrashFill,
} from 'react-bootstrap-icons';
import './style.css';
import ChevronLeft from '../ChevronLeft/ChevronLeft';
import ChevronRight from '../ChevronRight/ChevronRight';

// For resetting sort
let lastColumnIndex;
// Stores refs for th, ArrowUp, ArrowDown for every column
let refers = [];

export default function CustomTable({
  columns, data, caption, editable, viewable, deletable, serialize, children, handleDelete,
}) {
  const [bodyData, setBodyData] = useState(data);
  const [from, setFrom] = useState(0); // For pagination
  const [rowsPerPage, setRowsPerPage] = useState(5); // For pagination

  const handleClickOnChevron = (event, direction) => {
    event.stopPropagation();
    if (direction === 'chevron-left') {
      if (from - rowsPerPage >= 0) {
        setFrom(from - rowsPerPage);
      }
    } else if (direction === 'chevron-right') {
      if (from + rowsPerPage < bodyData.length) {
        setFrom(from + rowsPerPage);
      }
    }
  };

  const displayArrows = (sort, index, lastIndex) => {
    const elementArrowUp = refers[index][`arrowup-${index}`].current;
    const elementArrowDown = refers[index][`arrowdown-${index}`].current;

    if (lastIndex !== undefined) {
      // Remove arrows from previous column
      const lastElementArrowUp = refers[lastIndex][`arrowup-${lastIndex}`].current;
      const lastElementArrowDown = refers[lastIndex][`arrowdown-${lastIndex}`].current;
      lastElementArrowUp.classList.remove('d-inline');
      lastElementArrowDown.classList.remove('d-inline');
      if (!lastElementArrowUp.classList.contains('d-none')) {
        lastElementArrowUp.classList.add('d-none');
      }
      if (!lastElementArrowDown.classList.contains('d-none')) {
        lastElementArrowDown.classList.add('d-none');
      }
    }

    if (sort === undefined || sort === 0) {
      // Ascending
      if (!elementArrowDown.classList.contains('d-none')) {
        elementArrowDown.classList.add('d-none');
      }
      elementArrowUp.classList.remove('d-none');
      elementArrowUp.classList.add('d-inline');
    } else if (sort === 1) {
      // Descending
      if (!elementArrowUp.classList.contains('d-none')) {
        elementArrowUp.classList.add('d-none');
      }
      elementArrowDown.classList.remove('d-none');
      elementArrowDown.classList.add('d-inline');
    }
  };

  const sortTable = (event, index) => {
    event.stopPropagation();
    const column = columns[index];

    // For maintaining default sort ascending
    if (lastColumnIndex !== undefined) {
      if (lastColumnIndex !== index) {
        displayArrows(column.sort, index, lastColumnIndex);
        const lastColumn = columns[lastColumnIndex];
        lastColumn.sort = 0;
        lastColumnIndex = index;
      }
      displayArrows(column.sort, index);
    } else {
      displayArrows(column.sort, index);
      lastColumnIndex = index;
    }

    if (column.sort === undefined || column.sort === 0) {
      // Sort Asc
      column.sort = 1;
      data.sort((row1, row2) => {
        if (typeof row1[column.key] === 'number') {
          return row1[column.key] - row2[column.key];
        }
        return row1[column.key].localeCompare(row2[column.key]);
      });
      refers = [];
      setBodyData([...data]);
    } else if (column.sort === 1) {
      // Sort Desc
      column.sort = 0;
      data.sort((row1, row2) => {
        if (typeof row1[column.key] === 'number') {
          return row2[column.key] - row1[column.key];
        }
        return row2[column.key].localeCompare(row1[column.key]);
      });
      refers = [];
      setBodyData([...data]);
    }
  };

  useEffect(() => {
    refers = [];
    setBodyData([...data]);
  }, [data]);

  return (
    <section>
      <Table responsive className="caption-top table">
        <caption className="fs-4 dashboard-card-title ms-2 mb-0">{caption}
          {children}
        </caption>
        <thead className="thead">
          <tr className="table-header-separator">
            {
              serialize
                ? <th className="cursor-pointer table-header text-start">Sr. No</th>
                : <></>
            }
            {
                columns.map((column, index) => {
                  // 0 - asc, 1 - desc
                  const refer = {
                    [`head-${index}`]: useRef(),
                    [`arrowup-${index}`]: useRef(),
                    [`arrowdown-${index}`]: useRef(),
                  };
                  refers.push(refer);

                  return (
                    <th
                      key={`head-${index}`}
                      ref={refer[`head-${index}`]}
                      className="cursor-pointer table-header text-start"
                      onClick={(event) => sortTable(event, index)}
                    >
                      {column.name}{' '}
                      <ArrowUp ref={refer[`arrowup-${index}`]} className="d-none" />
                      <ArrowDown ref={refer[`arrowdown-${index}`]} className="d-none" />
                    </th>
                  );
                })
            }
            {
              viewable ? <th className="cursor-pointer table-header text-start">View</th> : <></>
            }
            {
              editable ? <th className="cursor-pointer table-header text-center">Edit</th> : <></>
            }
            {
              deletable ? <th className="cursor-pointer table-header text-center">Delete</th> : <></>
            }
          </tr>
        </thead>
        <tbody className="tbody">
          {
            bodyData.length === 0 ? <></> : (
              bodyData.slice(from, from + rowsPerPage).map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`}>
                  {
                    serialize
                      ? <td className="table-cell text-start">{rowIndex + from + 1}</td>
                      : <></>
                  }
                  {
                            columns.map((column, colIndex) => (
                              <td key={`col-${colIndex}`} className="table-cell text-start">
                                { column.tag
                                  ? (
                                    <span
                                      className="p-1 text-uppercase"
                                      style={{
                                        backgroundColor: column[row[column.key].toLowerCase()].bgColor,
                                        color: column[row[column.key].toLowerCase()].color,
                                      }}
                                    >
                                      {row[column.key]}
                                    </span>
                                  )
                                  : row[column.key]}
                              </td>
                            ))
                        }
                  {
                          viewable ? (
                            <td className="table-cell text-start">
                              <Link to={{ pathname: `/details/${row.id}`, data: row, columns }} className="table-icon-color">
                                View
                              </Link>
                            </td>
                          ) : <></>
                        }
                  {
                    editable ? (
                      <td className="table-cell text-center">
                        <Link to={{ pathname: `/edit/${row.id}`, data: row, columns }} className="table-icon-color">
                          <PencilSquare />
                        </Link>
                      </td>
                    ) : <></>
                  }
                  {
                    deletable ? (
                      <td className="table-cell text-center">
                        <TrashFill
                          className="table-icon-color cursor-pointer"
                          onClick={(event) => handleDelete(event, row, rowIndex)}
                        />
                      </td>
                    ) : <></>
                  }
                </tr>
              )))
          }
        </tbody>
      </Table>
      <div className="pagination">
        <Form className="d-inline-block w-max-content">
          <Form.Group controlId="rowsPerPage">
            <Form.Label className="d-inline-block mb-0">
              Rows Per Page:
            </Form.Label>
            <Form.Control
              className="cursor-pointer pagination-select ms-3"
              onChange={(event) => { setFrom(0); setRowsPerPage(parseInt(event.target.value, 10)); }}
              as="select"
              value={rowsPerPage}
              custom
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <div className="d-inline-flex">
          <p className="w-max-content mb-0">{bodyData.length === 0 ? 0 : from + 1}
            -{from + rowsPerPage > bodyData.length ? bodyData.length : from + rowsPerPage} of {bodyData.length}
          </p>
          <div className="d-inline-flex align-items-center ms-3 w-max-content">
            <ChevronLeft
              onClick={(event) => handleClickOnChevron(event, 'chevron-left')}
              className="fa pagination-chevron cursor-pointer"
            />
            <ChevronRight
              onClick={(event) => handleClickOnChevron(event, 'chevron-right')}
              className="fa pagination-chevron cursor-pointer"
            />
          </div>
        </div>
        {/* <div className="d-inline-block p-1 ms-0 fs-5 pagination-chevron">
        </div> */}
      </div>
    </section>
  );
}

// this.props.match.params.productId // this is product id
// this.props.location.data // this is data

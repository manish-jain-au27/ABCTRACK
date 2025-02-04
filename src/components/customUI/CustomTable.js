import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';

const CustomTable = ({ 
  title = 'Task List', 
  headers, 
  rows, 
  onSearch, 
  onRowAction,
  renderStatusColumn,
  renderActionColumn
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const defaultHeaders = [
    { key: 'taskId', label: 'Task ID', sortable: true },
    { key: 'client', label: 'Client', sortable: true },
    { key: 'title', label: 'Title', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'paymentType', label: 'Payment Type', 
      selector: (row) => row.paymentType || 'Not Specified',
      style: { width: '100px' }, 
      sortable: true 
    },
    { key: 'totalCost', label: 'Assignment Value', 
      selector: (row) => {
        const totalCost = row.rows
          ? row.rows.reduce((sum, r) => sum + Number(r.totalcost || 0), 0)
          : Number(row.totalcost || 0);
        return totalCost;
      },
      style: { width: '100px' }, 
      sortable: true 
    },
    { key: 'status', label: 'Status' },
    { key: 'action', label: 'Action' }
  ];

  const mergedHeaders = headers || defaultHeaders;

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch && onSearch(value);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key) {
      // If clicking on the same column, toggle direction
      direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    }
    setSortConfig({ key, direction });
  };

  const sortedAndFilteredRows = useMemo(() => {
    let result = [...rows];

    // Filtering
    if (searchTerm) {
      result = result.filter(task => 
        Object.values(task).some(value => 
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];

        if (valueA == null) return sortConfig.direction === 'ascending' ? 1 : -1;
        if (valueB == null) return sortConfig.direction === 'ascending' ? -1 : 1;

        if (valueA < valueB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valueA > valueB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [rows, searchTerm, sortConfig]);

  const defaultRenderStatusColumn = (task) => {
    const averagePercentage = task.rows
      ? Math.round(task.rows.reduce((sum, r) => sum + (r.percentage || 0), 0) / task.rows.length)
      : 0;

    return (
      <div className="d-flex flex-column justify-content-center align-items-center w-100">
        <span 
          className="mb-1 font-weight-bold" 
          style={{ 
            fontSize: '0.7rem', 
            color: 'black' 
          }}
        >
          {averagePercentage}%
        </span>
        <ProgressBar 
          now={averagePercentage} 
          animated 
          variant={
            averagePercentage === 0 ? 'danger' : 
            averagePercentage < 99 ? 'warning' : 
            'success'
          } 
          style={{ width: '100%' }}
        />
      </div>
    );
  };

  const defaultRenderActionColumn = (task, onRowAction) => (
    <Link 
      to="#" 
      className="btn btn-outline-info mr-1" 
      onClick={() => onRowAction && onRowAction(task)}
    >
      <i className="icon-eye"></i>
    </Link>
  );

  return (
    <div className="col-lg-12">
      <div className="card product_item_list product-order-list">
        <div className="header">
          <h2>{title}</h2>
        </div>
        <div className="body">
          <form className="ng-untouched ng-dirty ng-invalid mb-2">
            <div className="row d-flex justify-content-between align-items-center" style={{ marginBottom: '-10px' }}>
              <div className="form-group col-lg-3">
                <label className="sr-only">Search</label>
                <input
                  className="form-control"
                  name="search"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search tasks..."
                />
              </div>
            </div>
          </form>
          <div className="table-responsive">
            <table className="table table-hover m-b-0">
              <thead className="thead-theme theme-bg-primary" style={{ color: 'black', backgroundColor: 'white' }}>
                <tr>
                  {mergedHeaders.map((header, index) => (
                    <th 
                      key={index} 
                      style={header.style || {}}
                      onClick={() => header.sortable && handleSort(header.key)}
                      className={`${header.sortable ? 'sortable' : ''} text-center`}
                    >
                      {header.label}
                      {header.sortable && (
                        <span style={{ 
                          marginLeft: '3px', 
                          fontSize: '0.5em',  
                          verticalAlign: 'super',  
                          opacity: 0.7  
                        }}>
                          ▲  
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedAndFilteredRows.map((task) => (
                  <tr key={task.taskId}>
                    {mergedHeaders.map((header) => {
                      switch(header.key) {
                        case 'taskId':
                          return <td key={header.key} className="text-center">{task.taskId}</td>;
                        case 'title':
                          return <td key={header.key} className="text-center">{task.title}</td>;
                        case 'client':
                          return <td key={header.key} className="text-center">{task.client}</td>;
                        case 'category':
                          return <td key={header.key} className="text-center">{task.category}</td>;
                        case 'paymentType':
                          return <td key={header.key} className="text-center">
                            {task.paymentType || 'Not Specified'}
                          </td>;
                        case 'assignmentValue':
                          return <td key={header.key} className="text-center" style={{ width: '100px' }}>
                            {task.rows 
                              ? task.rows.reduce((sum, r) => sum + Number(r.totalcost || 0), 0)
                              : Number(task.totalcost || 0)}
                          </td>;
                        case 'minutes':
                          return <td key={header.key} className="text-center" style={{ width: '100px' }}>
                            {task.rows 
                              ? task.rows.reduce((sum, r) => sum + Number(r.minutes), 0) 
                              : 0} mins
                          </td>;
                        case 'status':
                          return <td key={header.key} className="text-center">
                            {(renderStatusColumn || defaultRenderStatusColumn)(task)}
                          </td>;
                        case 'action':
                          return <td key={header.key} className="text-center">
                            {(renderActionColumn || defaultRenderActionColumn)(task, onRowAction)}
                          </td>;
                        default:
                          return <td key={header.key} className="text-center">{task[header.key] || 'N/A'}</td>;
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

CustomTable.propTypes = {
  title: PropTypes.string,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string.isRequired,
      style: PropTypes.object,
      sortable: PropTypes.bool
    })
  ),
  rows: PropTypes.array.isRequired,
  onSearch: PropTypes.func,
  onRowAction: PropTypes.func,
  renderStatusColumn: PropTypes.func,
  renderActionColumn: PropTypes.func
};

export default CustomTable;
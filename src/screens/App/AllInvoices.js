import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/customUI/CustomTable";

const AllInvoices = () => {
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [viewTaskModalOpen, setViewTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});

  // Mock data for invoices
  const mockInvoices = [
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      clientName: 'Acme Corp',
      taskTitle: 'Design',
      subcategory: 'UI Design',
      amount: 25000,
      paymentType:'Pay Per Minute',
      status: 'pending',
      reviewDate: '30/01/2025',
      taskId: 'TASK-001',
      rows: [{ 
        title: 'Initial Design', 
        minutes: 60, 
        status: 'pending',
        percentage: 50 
      }],
      client: 'Acme Corp',
      category: 'Design',
      duration: '05/01/2025',
      executionDate: '05/01/2025',
      totalMinutes: 120,
      plannedMinutes: 60,
      remark: 'Trial Done'
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-002',
      clientName: 'Tech Solutions',
      taskTitle: 'Website Development',
      subcategory: 'UI Design',
      amount: 30000,
      paymentType:'Pay Per Minute',
      status: 'paid',
      reviewDate: '25/01/2025',
      taskId: 'TASK-002',
      rows: [{ 
        title: 'Complete Development', 
        minutes: 120, 
        status: 'paid',
        percentage: 100 
      }],
      client: 'Tech Solutions',
      category: 'Development',
      duration: '05/01/2025',
      executionDate: '05/01/2025',
      totalMinutes: 120,
      plannedMinutes: 60,
      remark: 'Trial Done'
    }
  ];

  const headers = [
    { key: 'invoiceNumber', label: 'Invoice #', sortable: true },
    { key: 'clientName', label: 'Client', sortable: true },
    { key: 'taskTitle', label: 'Title', sortable: true },
    { key: 'subcategory', label: 'Category', sortable: true },
    { key: 'paymentType', label: 'Payment Type', sortable: true },
    { key: 'reviewDate', label: 'Review Date', sortable: true },
    { 
      key: 'amount', 
      label: 'Assignment Value', 
      selector: (row) => `₹${row.amount.toLocaleString()}`,
      sortable: true 
    },
    { key: 'status', label: 'Status' },
    { key: 'action', label: 'Action' }
  ];

  const renderStatusColumn = (invoice) => (
    <div>
      {invoice.status === 'paid' && (
        <button type="button" className="btn btn-success mr-1">
          Paid
        </button>
      )}
      {invoice.status === 'pending' && (
        <button type="button" className="btn btn-warning mr-1">
          Pending
        </button>
      )}
    </div>
  );

  const renderActionColumn = (invoice, onRowAction) => (
    <a 
      href="#" 
      className="btn btn-outline-info mr-1" 
      onClick={(e) => {
        e.preventDefault();
        setSelectedTask(invoice);
        setViewTaskModalOpen(true);
      }}
    >
      <i className="icon-eye"></i>
    </a>
  );

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setInvoices(mockInvoices);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
      setLoading(false);
    };

    fetchInvoices();
  }, []);

  // CSS for modal slide animation
  const modalStyles = `
    .task-details-modal-container {
      position: fixed;
      top: 0;
      right: -500px;
      width: 50vw;
      height: 100vh;
      background-color: white;
      box-shadow: -2px 0 5px rgba(0,0,0,0.1);
      transition: right 0.3s ease-in-out;
      z-index: 1050;
      overflow-y: auto;
      padding: 0px;
    }
    .task-details-modal-container.open {
      right: 0;
    }
    .task-details-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      z-index: 1040;
      display: none;
    }
    .task-details-modal-overlay.open {
      display: block;
    }
  `;

  return (
    <div>
      <style>{modalStyles}</style>
      
      <PageHeader 
        HeaderText="All Invoices"
        Breadcrumb={[
          { name: 'Payments', navigate: '#' },
          { name: 'All Invoices' }
        ]}
      />
      
      <Card>
        <Card.Body>
          <CustomTable 
            title="Invoices"
            headers={headers}
            rows={invoices}
            renderStatusColumn={renderStatusColumn}
            renderActionColumn={renderActionColumn}
          />
        </Card.Body>
      </Card>

      {viewTaskModalOpen && (
        <div 
          className={`task-details-modal-overlay ${viewTaskModalOpen ? 'open' : ''}`} 
          onClick={() => setViewTaskModalOpen(false)}
        >
          <div 
            className={`task-details-modal-container ${viewTaskModalOpen ? 'open' : ''}`} 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h5 className="modal-title ubuntu-font ubuntu-bold">View Invoice</h5>
              <div className="d-flex align-items-center justify-content-end">
                <input
                  type="text"
                  className="form-control task-id-input text-center"
                  value={selectedTask.invoiceNumber || 'N/A'}
                  readOnly
                  style={{ width: '150px' }}
                />
                <button
                  type="button"
                  className="close ml-2"
                  onClick={() => setViewTaskModalOpen(false)}
                >
                  &times;
                </button>
              </div>
            </div>

            <div className="modal-body ubuntu-font ubuntu-regular p-4">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label>Client</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedTask.client}
                    readOnly
                  />
                </div>
                <div className="col-md-6">
                  <label>Task Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedTask.taskTitle}
                    readOnly
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label>Category</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedTask.category}
                    readOnly
                  />
                </div>
                <div className="col-md-6">
                  <label>Subcategory</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedTask.subcategory}
                    readOnly
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label>Payment Type</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedTask.paymentType}
                    readOnly
                  />
                </div>
                <div className="col-md-6">
                  <label>Assignment Value</label>
                  <input
                    type="text"
                    className="form-control"
                    value={`₹${selectedTask.amount ? selectedTask.amount.toLocaleString() : 'N/A'}`}
                    readOnly
                  />
                </div>
              </div>

              <div className="row mb-3">
               
                <div className="col-md-6">
                  <label>Execution Date</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedTask.executionDate}
                    readOnly
                  />
                </div>
                <div className="col-md-6">
                  <label>Review Date</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedTask.reviewDate}
                    readOnly
                  />
                </div>
              </div>

              <div className="row mb-3">
               
                <div className="col-md-6">
                  <label>Planned Minutes</label>
                  <input
                    type="text"
                    className="form-control"
                    value={`${selectedTask.plannedMinutes || 0} mins`}
                    readOnly
                  />
                </div>
                <div className="col-md-6">
                  <label>Executed Minutes</label>
                  <input
                    type="text"
                    className="form-control"
                    value={`${selectedTask.totalMinutes || 0} mins`}
                    readOnly
                  />
                </div>
              </div>

              <div className="table-responsive mt-4">
                <table className="table table-bordered text-center">
                  <thead className="thead-white" style={{ color: 'black', backgroundColor: 'white' }}>
                    <tr>
                      <th className="text-center" style={{ width: '500px' }}>Title</th>
                      <th className="text-center">Executed Minutes</th>
                      <th className="text-center"style={{ width: '100px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTask.rows && selectedTask.rows.map((row, index) => (
                      <tr key={index} className="text-center">
                        <td>{row.title}</td>
                        <td>{selectedTask.totalMinutes || 0} mins</td>
                        <td className="text-center align-middle p-2">
                          <input
                            type="text"
                            className="form-control text-center"
                            style={{ 
                              width: '100px', 
                              margin: 'auto',
                              display: 'inline-block'
                            }}
                            value={row.status}
                            readOnly
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="row mt-4">
                <div className="col-12 d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setViewTaskModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllInvoices;
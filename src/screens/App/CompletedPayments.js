import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/customUI/CustomTable";

const CompletedPayments = () => {
  const [loading, setLoading] = useState(false);
  const [completedPayments, setCompletedPayments] = useState([]);
  const [viewTaskModalOpen, setViewTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});

  const mockCompletedPayments = [
    {
      id: 1,
      invoiceNumber: 'INV-2024-002',
      clientName: 'Tech Innovators',
      taskTitle: 'Website Development',
      subcategory: 'Frontend Design',
      amount: 30000,
      paymentType: 'Pay Per Minute',
      status: 'paid',
      reviewDate: '25/03/2024',
      taskId: 'TASK-002',
      rows: [{ 
        title: 'Initial Website Design', 
        minutes: 90, 
        status: 'paid',
        percentage: 100 
      }],
      client: 'Tech Innovators',
      category: 'Web Development',
      duration: '15/03/2024',
      executionDate: '20/03/2024',
      totalMinutes: 180,
      plannedMinutes: 120,
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN123456',
      remark: 'Completed'
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-003',
      clientName: 'Acme Corporation',
      taskTitle: 'Design',
      subcategory: 'Wireframe',
      amount: 45000,
      paymentType: 'Pay Per Minute',
      status: 'paid',
      reviewDate: '20/03/2024',
      taskId: 'TASK-003',
      rows: [{ 
        title: 'Wire Frame Development', 
        minutes: 120, 
        status: 'paid',
        percentage: 100 
      }],
      client: 'Acme Corporation',
      category: 'Design',
      duration: '10/03/2024',
      executionDate: '15/03/2024',
      totalMinutes: 240,
      plannedMinutes: 180,
      paymentMethod: 'UPI',
      transactionId: 'TXN789012',
      remark: 'Completed'
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
    { key: 'paymentMethod', label: 'Payment Method', sortable: true },
    { key: 'action', label: 'Action' }
  ];

  const renderStatusColumn = (payment) => (
    <div>
      {payment.status === 'paid' && (
        <button type="button" className="btn btn-success mr-1">
          Paid
        </button>
      )}
    </div>
  );

  const renderActionColumn = (payment, onRowAction) => (
    <a 
      href="#" 
      className="btn btn-outline-info mr-1" 
      onClick={(e) => {
        e.preventDefault();
        setSelectedTask(payment);
        setViewTaskModalOpen(true);
      }}
    >
      <i className="icon-eye"></i>
    </a>
  );

  useEffect(() => {
    const fetchCompletedPayments = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCompletedPayments(mockCompletedPayments);
      } catch (error) {
        console.error('Error fetching completed payments:', error);
      }
      setLoading(false);
    };

    fetchCompletedPayments();
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
        HeaderText="Completed Payments"
        Breadcrumb={[
          { name: 'Payments', navigate: '#' },
          { name: 'Completed Payments' }
        ]}
      />
      
      <Card>
        <Card.Body>
          <CustomTable 
            title=""
            headers={headers}
            rows={completedPayments}
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
              <h5 className="modal-title ubuntu-font ubuntu-bold">View Payment</h5>
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

              <div className="row mb-3">
                <div className="col-md-6">
                  <label>Payment Method</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedTask.paymentMethod}
                    readOnly
                  />
                </div>
                <div className="col-md-6">
                  <label>Transaction ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedTask.transactionId}
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
                      <th className="text-center" style={{ width: '100px' }}>Status</th>
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

              <div className="row mb-3">
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

export default CompletedPayments;
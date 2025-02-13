import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import PageHeader from "../../components/PageHeader";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { enUS } from 'date-fns/locale';
import { addDays } from 'date-fns';
import Select from "react-dropdown-select";
import { ProgressBar } from "react-bootstrap";
import CustomTable from '../../components/customUI/CustomTable';
import { notifyGeneralInfo } from '../../actions/UIElementsAction';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Constants (similar to CreateTask.js)
const ASSIGNMENT_CATEGORIES = [
  {
    id: 'research',
    name: 'Research',
    subcategories: [
      { id: 'market', name: 'Market Research', pricePerHour: 50 },
      { id: 'tech', name: 'Technology Research', pricePerHour: 60 },
      { id: 'competitor', name: 'Competitor Analysis', pricePerHour: 70 }
    ]
  },
  {
    id: 'consulting',
    name: 'Consulting',
    subcategories: [
      { id: 'strategy', name: 'Strategy Consulting', pricePerHour: 100 },
      { id: 'it', name: 'IT Consulting', pricePerHour: 90 },
      { id: 'management', name: 'Management Consulting', pricePerHour: 110 }
    ]
  }
];

const CLIENTS = [
  { id: 'client1', name: 'Acme Corp' },
  { id: 'client2', name: 'Tech Solutions' },
  { id: 'client3', name: 'Innovative Inc' }
];

const CreateAssignment = (props) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  // State for assignment details
  const [assignmentHeader, setAssignmentHeader] = useState({
    assignmentId: '',
    category: '',
    subcategory: '',
    client: '',
    startDate: '',
    endDate: '',
    title: ''
  });

  // Client selection state
  const [selectedClients, setSelectedClients] = useState([]);
  const [clientOptions, setClientOptions] = useState([]);

  // Fetch client options 
  useEffect(() => {
    const clientOptionsFromClients = CLIENTS.map(client => ({
      label: client.name,
      value: client.id
    }));
    setClientOptions(clientOptionsFromClients);
  }, []);

  // Handler for client selection changes
  const handleClientChange = (values) => {
    setSelectedClients(values);
  };

  // Other state and handlers similar to CreateTask.js
  const [isTaskDurationOpen, setIsTaskDurationOpen] = useState(false);
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);

  // Generate unique assignment ID
  const generateAssignmentId = () => {
    const lastAssignmentId = localStorage.getItem('lastAssignmentId');
    const newAssignmentId = lastAssignmentId ? parseInt(lastAssignmentId) + 1 : 1;

    localStorage.setItem('lastAssignmentId', newAssignmentId.toString());

    return `ASSIGN-${newAssignmentId.toString().padStart(4, '0')}`;
  };

  // Open Create Assignment Modal
  const openCreateAssignmentModal = () => {
    setAssignmentHeader({
      assignmentId: generateAssignmentId(),
      category: '',
      subcategory: '',
      client: '',
      startDate: '',
      endDate: '',
      title: ''
    });
  };

  // Render method
  return (
    <div>
      <PageHeader 
        HeaderText="Create Assignment" 
        Breadcrumb={[
          { name: "Assignments", navigate: "" },
          { name: "Create Assignment", navigate: "" }
        ]} 
      />
      <div className="container-fluid">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-12">
              <button 
                className="btn btn-primary" 
                onClick={openCreateAssignmentModal}
              >
                Create New Assignment
              </button>
            </div>
          </div>
        </div>

        {/* Modal for Creating Assignment */}
        <div className="modal fade" id="createAssignmentModal">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Create New Assignment</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body ubuntu-font ubuntu-regular">
                {/* Assignment Header Inputs */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label>Select Clients</label>
                    <Select
                      className="js-states"
                      placeholder="Select Clients"
                      options={clientOptions}
                      values={selectedClients}
                      disabled={false}
                      create={true}
                      multi={true}
                      dropdownHandle={false}
                      searchable={true}
                      onChange={handleClientChange}
                      styles={{
                        control: (base) => ({
                          ...base,
                          fontSize: '0.9rem',
                          minHeight: '38px',
                        }),
                        placeholder: (base) => ({
                          ...base,
                          color: '#6c757d',
                          fontSize: '0.9rem',
                          opacity: 0.7
                        }),
                        singleValue: (base) => ({
                          ...base,
                          fontSize: '0.9rem',
                        }),
                        option: (base) => ({
                          ...base,
                          fontSize: '0.9rem',
                        }),
                      }}
                    />
                  </div>
                  {/* Add other input fields similar to CreateTask.js */}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Create Assignment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

const mapStateToProps = ({ UIElementsReducer }) => ({});

export default connect(mapStateToProps, { notifyGeneralInfo })(CreateAssignment);
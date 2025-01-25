import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

const TaskTemplate = ({ 
  onTemplateSave, 
  isModal = true, 
  initialTemplate = null,
  isCreateModalOpen = false,
  onCloseModal = () => {}
}) => {
  const [templateName, setTemplateName] = useState('');
  const [taskRows, setTaskRows] = useState([{ title: '', minutes: '' }]);
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // Use effect to populate form if editing an existing template
  useEffect(() => {
    if (initialTemplate) {
      setTemplateName(initialTemplate.templateName || '');
      setCategory(initialTemplate.category || '');
      setSubcategory(initialTemplate.subcategory || '');
      setDescription(initialTemplate.description || '');
      setTaskRows(initialTemplate.taskRows || [{ title: '', minutes: '' }]);
    }
  }, [initialTemplate]);

  useEffect(() => {
    setIsOpen(isCreateModalOpen);
  }, [isCreateModalOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!templateName.trim()) {
      newErrors.templateName = 'Template name is required';
    }
    
    if (!category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    if (taskRows.length === 0) {
      newErrors.taskRows = 'At least one task row is required';
    }
    
    taskRows.forEach((row, index) => {
      if (!row.title.trim()) {
        newErrors[`taskRowTitle${index}`] = 'Task title is required';
      }
      
      if (!row.minutes || isNaN(Number(row.minutes)) || Number(row.minutes) <= 0) {
        newErrors[`taskRowMinutes${index}`] = 'Valid minutes are required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addTaskRow = () => {
    setTaskRows([...taskRows, { title: '', minutes: '' }]);
  };

  const updateTaskRow = (index, field, value) => {
    const updatedRows = [...taskRows];
    updatedRows[index][field] = value;
    setTaskRows(updatedRows);
  };

  const removeTaskRow = (index) => {
    const updatedRows = taskRows.filter((_, i) => i !== index);
    setTaskRows(updatedRows);
  };

  const saveTaskTemplate = () => {
    if (!validateForm()) {
      return;
    }

    const ratePerHour = 50; // Default rate, can be made dynamic
    const totalCost = taskRows.reduce((total, row) => 
      total + (Number(row.minutes) / 60 * ratePerHour), 0
    );

    const taskTemplate = {
      templateName,
      category,
      subcategory,
      description,
      taskRows,
      ratePerHour,
      totalCost: Number(totalCost.toFixed(2))
    };

    if (onTemplateSave) {
      onTemplateSave(taskTemplate);
    } else {
      console.log('Task Template:', taskTemplate);
    }

    // Close modal after saving
    if (isModal) {
      onCloseModal();
    }
  };

  const resetForm = () => {
    setTemplateName('');
    setCategory('');
    setSubcategory('');
    setDescription('');
    setTaskRows([{ title: '', minutes: '' }]);
    setErrors({});
  };

  const renderForm = () => (
    <Form>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Template Name *</Form.Label>
            <Form.Control 
              type="text" 
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Enter template name"
              isInvalid={!!errors.templateName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.templateName}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Category *</Form.Label>
            <Form.Control 
              type="text" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category"
              isInvalid={!!errors.category}
            />
            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Subcategory</Form.Label>
            <Form.Control 
              type="text" 
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              placeholder="Enter subcategory"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </Form.Group>
        </Col>
      </Row>
      
      <h5 className="mt-3">Task Rows *</h5>
      {errors.taskRows && (
        <div className="text-danger mb-2">{errors.taskRows}</div>
      )}
      {taskRows.map((row, index) => (
        <Row key={index} className="mb-2">
          <Col>
            <Form.Control 
              type="text" 
              placeholder="Task Title"
              value={row.title}
              onChange={(e) => updateTaskRow(index, 'title', e.target.value)}
              isInvalid={!!errors[`taskRowTitle${index}`]}
            />
            <Form.Control.Feedback type="invalid">
              {errors[`taskRowTitle${index}`]}
            </Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Control 
              type="number" 
              placeholder="Minutes"
              value={row.minutes}
              onChange={(e) => updateTaskRow(index, 'minutes', e.target.value)}
              isInvalid={!!errors[`taskRowMinutes${index}`]}
            />
            <Form.Control.Feedback type="invalid">
              {errors[`taskRowMinutes${index}`]}
            </Form.Control.Feedback>
          </Col>
          <Col xs={2}>
            <Button 
              variant="danger" 
              onClick={() => removeTaskRow(index)}
              disabled={taskRows.length <= 1}
            >
              Remove
            </Button>
          </Col>
        </Row>
      ))}
      
      <Button variant="secondary" onClick={addTaskRow} className="mt-2">
        Add Task Row
      </Button>
    </Form>
  );

  if (isModal) {
    return (
      <>
        <div 
          className={`sliding-panel-overlay ${isOpen ? 'open' : ''}`} 
          onClick={() => {
            onCloseModal();
            resetForm();
          }}
        >
          <div 
            className={`sliding-panel-container ${isOpen ? 'open' : ''}`} 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="panel-header d-flex justify-content-between align-items-center">
              <h5 className="panel-title">Create Task Template</h5>
              <button
                type="button"
                className="close"
                onClick={() => {
                  onCloseModal();
                  resetForm();
                }}
              >
                &times;
              </button>
            </div>

            <div className="panel-body">
              {renderForm()}
            </div>

            <div className="panel-footer">
              <Button 
                variant="secondary" 
                onClick={() => {
                  onCloseModal();
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={saveTaskTemplate}
              >
                Save Template
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return renderForm();
}

export default TaskTemplate;
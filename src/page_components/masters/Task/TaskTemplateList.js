import React, { useState, useEffect } from "react"
import PageHeader from "../../../components/PageHeader";
import { Button, Modal, Offcanvas } from "react-bootstrap";
import Notification from "../../../components/Notification";
import TaskTemplate from "./TaskTemplate";

const TaskTemplateList = () => {
    const [taskTemplates, setTaskTemplates] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [templateToDelete, setTemplateToDelete] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState(null);

    // Mock data - in a real application, this would come from an API
    useEffect(() => {
        const initialTemplates = [
            {
                id: 1,
                templateName: 'Web Development Project',
                category: 'Development',
                subcategory: 'Frontend',
                description: 'Standard web development template',
                taskRows: [
                    { title: 'Frontend Development', minutes: '240' },
                    { title: 'Backend Integration', minutes: '180' }
                ],
                ratePerHour: 50,
                totalCost: 420
            },
            {
                id: 2,
                templateName: 'Design Campaign',
                category: 'Design',
                subcategory: 'UI Design',
                description: 'UI/UX design template',
                taskRows: [
                    { title: 'Wireframing', minutes: '120' },
                    { title: 'Prototyping', minutes: '180' }
                ],
                ratePerHour: 45,
                totalCost: 270
            }
        ];
        setTaskTemplates(initialTemplates);
    }, []);

    const toggleCreateForm = () => {
        setShowCreateForm(!showCreateForm);
        setEditingTemplate(null);
    };

    const handleDelete = (template) => {
        setTemplateToDelete(template);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        const updatedTemplates = taskTemplates.filter(
            (template) => template.id !== templateToDelete.id
        );
        setTaskTemplates(updatedTemplates);
        setShowDeleteModal(false);
        setTemplateToDelete(null);
        setShowSuccess(true);
    };

    const handleTemplateSave = (newTemplate) => {
        if (editingTemplate) {
            // Update existing template
            const updatedTemplates = taskTemplates.map(template => 
                template.id === editingTemplate.id ? { ...newTemplate, id: template.id } : template
            );
            setTaskTemplates(updatedTemplates);
        } else {
            // Add new template
            const templateWithId = {
                ...newTemplate,
                id: taskTemplates.length + 1
            };
            setTaskTemplates([...taskTemplates, templateWithId]);
        }
        
        setShowCreateForm(false);
        setEditingTemplate(null);
        setShowSuccess(true);
    };

    const handleEdit = (template) => {
        setEditingTemplate(template);
        setShowCreateForm(true);
    };

    return (
        <div
            onClick={() => {
                document.body.classList.remove("offcanvas-active");
            }}
        >
            <div className="container-fluid">
                <PageHeader
                    HeaderText="Masters"
                    Breadcrumb={[
                        { name: "Masters" },
                        { name: "Task Templates" }
                    ]}
                />

                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="header d-flex justify-content-between align-items-center">
                                <h2>Task Templates</h2>
                                <Button 
                                    variant="primary" 
                                    onClick={toggleCreateForm}
                                >
                                    Create Task Template
                                </Button>
                            </div>
                            <div className="body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Template Name</th>
                                                <th>Category</th>
                                                <th>Subcategory</th>
                                                <th>Description</th>
                                                <th>Total Tasks</th>
                                                <th>Total Cost</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {taskTemplates.map((template) => (
                                                <tr key={template.id}>
                                                    <td>{template.templateName}</td>
                                                    <td>{template.category}</td>
                                                    <td>{template.subcategory}</td>
                                                    <td>{template.description}</td>
                                                    <td>{template.taskRows.length}</td>
                                                    <td>₹{template.totalCost.toFixed(2)}</td>
                                                    <td>
                                                        <Button 
                                                            variant="primary" 
                                                            size="sm" 
                                                            className="mr-2"
                                                            onClick={() => handleEdit(template)}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button 
                                                            variant="danger" 
                                                            size="sm"
                                                            onClick={() => handleDelete(template)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide-out Form */}
                <Offcanvas 
                    show={showCreateForm} 
                    onHide={toggleCreateForm} 
                    placement="end"
                    style={{ width: '50%' }}
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>
                            {editingTemplate ? 'Edit' : 'Create'} Task Template
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <TaskTemplate 
                            onTemplateSave={handleTemplateSave}
                            isModal={false}
                            initialTemplate={editingTemplate}
                        />
                    </Offcanvas.Body>
                </Offcanvas>

                {/* Delete Confirmation Modal */}
                <Modal 
                    show={showDeleteModal} 
                    onHide={() => setShowDeleteModal(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete the task template "{templateToDelete?.templateName}"?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            variant="secondary" 
                            onClick={() => setShowDeleteModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="danger" 
                            onClick={confirmDelete}
                        >
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Success Notification */}
                {showSuccess && (
                    <Notification 
                        type="success" 
                        message="Operation completed successfully!" 
                        onClose={() => setShowSuccess(false)} 
                    />
                )}
            </div>
        </div>
    );
};

export default TaskTemplateList;
// src/components/invoicing/CreateInvoiceModal.js
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

// Dummy entities data
const ENTITIES = [
  {
    id: 'ent1',
    name: 'Kalash Technologies Pvt Ltd',
    address: '123 Tech Park, Bangalore, Karnataka 560001',
    gstNumber: '07AATCA2480C1Z0',
    contactEmail: 'billing@kalashtech.com'
  },
  {
    id: 'ent2',
    name: 'ABC Innovations Inc.',
    address: '456 Innovation Drive, Silicon Valley, CA 94000',
    gstNumber: 'US-TAX-1234567',
    contactEmail: 'finance@abcinnovations.com'
  },
  {
    id: 'ent3',
    name: 'Global Solutions LLC',
    address: '789 Business Center, New York, NY 10001',
    gstNumber: 'US-TAX-7654321',
    contactEmail: 'accounts@globalsolutions.com'
  }
];

const CreateInvoiceModal = ({ task, onClose, onCreateInvoice }) => {
  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
    clientName: task.client,
    projectName: task.title,
    totalAmount: task.totalCost,
    totalHours: task.hours,
    notes: `Invoice for ${task.title} - ${task.taskId}`,
    selectedEntity: null,
    entityDropdownOpen: false,
    invoiceDate: new Date().toISOString().split('T')[0]
  });

  const handleEntitySelect = (entity) => {
    setInvoiceDetails(prev => ({
      ...prev,
      selectedEntity: entity,
      entityDropdownOpen: false
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate entity selection
    if (!invoiceDetails.selectedEntity) {
      alert('Please select an invoicing entity');
      return;
    }

    // Prepare complete invoice data
    const finalInvoiceData = {
      ...invoiceDetails,
      entityName: invoiceDetails.selectedEntity.name,
      originalTask: task
    };

    onCreateInvoice(finalInvoiceData);
    onClose();
  };

  return (
    <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Invoice</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Entity Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Invoicing Entity
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setInvoiceDetails(prev => ({
                ...prev, 
                entityDropdownOpen: !prev.entityDropdownOpen
              }))}
              className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              {invoiceDetails.selectedEntity 
                ? invoiceDetails.selectedEntity.name 
                : 'Select Entity'}
              <ChevronDown size={20} className="text-gray-400" />
            </button>
            
            {invoiceDetails.entityDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {ENTITIES.map((entity) => (
                  <div
                    key={entity.id}
                    onClick={() => handleEntitySelect(entity)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="font-medium">{entity.name}</div>
                    <div className="text-xs text-gray-500">{entity.address}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selected Entity Details */}
        {invoiceDetails.selectedEntity && (
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <h3 className="font-semibold mb-2">Entity Details</h3>
            <div className="grid grid-cols-2 gap-2">
              <p><strong>Name:</strong> {invoiceDetails.selectedEntity.name}</p>
              <p><strong>GST Number:</strong> {invoiceDetails.selectedEntity.gstNumber}</p>
              <p><strong>Address:</strong> {invoiceDetails.selectedEntity.address}</p>
              <p><strong>Contact Email:</strong> {invoiceDetails.selectedEntity.contactEmail}</p>
            </div>
          </div>
        )}

        {/* Invoice Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Invoice Number</label>
            <input
              type="text"
              value={invoiceDetails.invoiceNumber}
              readOnly
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Invoice Date</label>
            <input
              type="date"
              value={invoiceDetails.invoiceDate}
              onChange={(e) => setInvoiceDetails(prev => ({
                ...prev,
                invoiceDate: e.target.value
              }))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
        </div>

        {/* Task and Client Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Client Name</label>
            <input
              type="text"
              value={invoiceDetails.clientName}
              readOnly
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Name</label>
            <input
              type="text"
              value={invoiceDetails.projectName}
              readOnly
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
        </div>

        {/* Financial Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Hours</label>
            <input
              type="text"
              value={invoiceDetails.totalHours}
              readOnly
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Amount</label>
            <input
              type="text"
              value={`$${invoiceDetails.totalAmount.toFixed(2)}`}
              readOnly
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            value={invoiceDetails.notes}
            onChange={(e) => setInvoiceDetails(prev => ({
              ...prev,
              notes: e.target.value
            }))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            rows="3"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 mt-6">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={!invoiceDetails.selectedEntity}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Invoice
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateInvoiceModal;
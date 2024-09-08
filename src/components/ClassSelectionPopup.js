import React, { useState, useEffect } from 'react';
import './../styles/ClassSelectionPopup.css';

const ClassSelectionPopup = ({ classes, onSelectClass, onAddNewClass, onClose }) => {
  const [newClass, setNewClass] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedClass) {
      onSelectClass(selectedClass);
    } else if (newClass) {
      onAddNewClass(newClass);
    }
  };

  return (
    <div className="class-selection-popup">
      <div className="popup-content">
        <h2>Select or Add a Class</h2>
        <form onSubmit={handleSubmit}>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select an existing class</option>
            {classes.map((cls, index) => (
              <option key={index} value={cls}>{cls}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Or add a new class"
            value={newClass}
            onChange={(e) => setNewClass(e.target.value)}
          />
          <button type="submit">Confirm</button>
        </form>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ClassSelectionPopup;
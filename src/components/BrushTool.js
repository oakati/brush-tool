import React, { useState } from 'react';

const BrushTool = ({ onActivate, onDeactivate }) => {
  const [active, setActive] = useState(false);

  const handleActivate = () => {
    setActive(true);
    onActivate();
  };

  const handleDeactivate = () => {
    setActive(false);
    onDeactivate();
  };

  return (
    <div>
      <button onClick={handleActivate} disabled={active}>
        Activate Brush
      </button>
      <button onClick={handleDeactivate} disabled={!active}>
        Deactivate Brush
      </button>
    </div>
  );
};

export default BrushTool;

import React from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import { BiShapePolygon } from "react-icons/bi";
import ToolButtonBase from './ToolButtonBase';
import { ToolActivity } from '../types/ToolMode.ts';

const ToolButtonBrush = () => (
  <ToolButtonBase 
    icon={FaPaintBrush} 
    label="Brush" 
    activityType={ToolActivity.Brush} 
  />
);

const ToolButtonPolygon = () => (
  <ToolButtonBase 
    icon={BiShapePolygon} 
    label="Polygon" 
    activityType={ToolActivity.Polygon} 
  />
);

export { ToolButtonBrush, ToolButtonPolygon };

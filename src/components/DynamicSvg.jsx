// src/components/DynamicSvg.jsx
// This SVG component renders a customizable logo/banner for your quiz app.
// You can update its text, dimensions, and colors via props for brand consistency.

import React from 'react';

const DynamicSvg = ({ text = "Quiz Master", width = 250, height = 80, fill = "#3B82F6" }) => (
  <svg width={width} height={height} viewBox="0 0 250 80" xmlns="http://www.w3.org/2000/svg">
    {/* Background with a light gradient */}
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#EFF6FF" />
        <stop offset="100%" stopColor="#DBEAFE" />
      </linearGradient>
    </defs>
    <rect width="250" height="80" fill="url(#grad)" rx="10" />
    {/* Dynamic centered text */}
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fill={fill}
      fontSize="24"
      fontWeight="bold"
    >
      {text}
    </text>
  </svg>
);

export default DynamicSvg;

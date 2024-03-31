import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 100,
    label: '100+',
  },
];

function valuetext(value) {
  return `${value}`;
}

export default function DiscreteSliderLabel() {
  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        aria-label="Always visible"
        defaultValue={80}
        getAriaValueText={valuetext}
        step={10}
        marks={marks}
        sx={{
            width: 420,
            height: 10,
            
          }}
        className='h-10'
        valueLabelDisplay="on"
      />
    </Box>
  );
}
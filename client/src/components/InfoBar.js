import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FeaturesList from '../features/shapes/FeaturesList';

export default function InfoBar() {
  return (
      <Paper 
        elevation={3}
        sx={{
            display: 'flex',
            width: '300px',
            marginTop: '90px',
            marginLeft: '20px',
            minHeight: '100px',
            position: 'fixed'
        }}
      >
        <FeaturesList />
      </Paper>
  );
}

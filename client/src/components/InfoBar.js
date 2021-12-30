import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FeaturesList from '../features/shapes/FeaturesList';
import ZoomControls from './ZoomControls';

export default function InfoBar() {
  return (
      <Paper 
        elevation={3}
        sx={{
            display: 'flex',
            flexFlow: 'column nowrap',
            width: '300px',
            marginTop: '90px',
            marginLeft: '20px',
            minHeight: '100px',
            maxHeight: '500px',
            position: 'fixed',
            overflow: 'scroll'
        }}
      >
        <ZoomControls />
        <FeaturesList />
      </Paper>
  );
}

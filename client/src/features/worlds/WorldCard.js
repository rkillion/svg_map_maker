import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router';

export default function WorldCard({ world, loadWorld }) {
    const history = useHistory()

  return (
    <Card sx={{ maxWidth: 345 }} raised={true}>
      <CardMedia
        component="img"
        height="140"
        image="https://cdn.pixabay.com/photo/2016/10/20/18/35/earth-1756274_960_720.jpg"
        alt="earth"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {world.title}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Description
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button 
            size="small"
            onClick={()=>{
              loadWorld(world.id);
              history.push("/viewer")}}
        >
            View
        </Button>
        {/* <Button size="small">Edit Details</Button> */}
      </CardActions>
    </Card>
  );
}

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";

import ControlPointIcon from '@mui/icons-material/ControlPoint';

import "./CompareCard.css";

const EmptyCard = () => {
  return (
    <Card className="empty-card">
      <CardActionArea className="empty-card__button">
        <Typography variant="h5">Select Apartment to Compare</Typography>
        <ControlPointIcon fontSize="large" color="primary" />
      </CardActionArea>
    </Card>
  )
}

export default EmptyCard;
import React from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import "./Sidebar.css"

const SavedApartmentCard = ({ name, cost, addApartment, editApartment }: { name: string, cost: number, addApartment: any, editApartment: any }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Button
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="sidebar-saved-apartments__card"
      variant="outlined"
      disableRipple
    >
      {isHovered && (
        <>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            disableElevation
            onClick={editApartment}
          >
            Edit/View
          </Button>
          <div className="line-grow"></div>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            disableElevation
            onClick={addApartment}
          >
            Add to Compare
          </Button>
        </>
      )}
      {!isHovered && (
        <>
          <Typography>
            {name}
          </Typography >
          <div className="line-grow"></div>
          <Typography>
            ${cost}/mo
          </Typography >
        </>)}


    </Button>
  )
}

export default SavedApartmentCard;
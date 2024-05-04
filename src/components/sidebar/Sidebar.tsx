import React from "react";

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

import AddIcon from '@mui/icons-material/Add';

import SavedApartmentCard from "./SavedApartmentCard";
import { ApartmentData } from "../../interfaces/ApartmentInterfaces";

import "./Sidebar.css"

const Sidebar = ({ openEditPage, addApartment }: { openEditPage: any, addApartment: any }) => {

  const [savedApts, setSavedApts] = React.useState<ApartmentData[]>(() => JSON.parse(localStorage.getItem("savedApartments") as string) || []);

  React.useEffect(() => {
    const checkLocalStorage = () => {
      const apts = JSON.parse(localStorage.getItem("savedApartments") as string);

      if (apts) {
        setSavedApts(apts);
      }
    }
    window.addEventListener('storage', checkLocalStorage);

    return () => {
      window.removeEventListener('storage', checkLocalStorage)
    }
  }, [])

  return (
    <div className="sidebar">
      <Card className="sidebar__title-card">
        <h2>Apartment Compare</h2>
      </Card>
      <Card className="sidebar__saved-apartments-wrapper">

        Saved Apartments

        <div className="sidebar__saved-apartments">
          {savedApts.map((apt, index) => {
            return (
              <SavedApartmentCard
                key={index}
                name={apt.name}
                cost={apt.cost}
                addApartment={() => { addApartment(apt) }}
                editApartment={() => { openEditPage(apt) }}
              />
            )
          })}
        </div>

        <Button
          variant="contained"
          fullWidth
          onClick={() => openEditPage(undefined)}
          startIcon={<AddIcon />}
        >
          Add New Apartment
        </Button>

      </Card>
    </div>

  )
}

export default Sidebar;
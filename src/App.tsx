import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Sidebar from './components/sidebar/Sidebar'
import ComparePage from './components/comparePage/ComparePage'
import CreatePage from './components/createPage/CreatePage';

import { ApartmentData } from './interfaces/ApartmentInterfaces';

import './App.css'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });

function App() {

  const [isCreating, setIsCreating] = React.useState(false);
  const [selectedApts, setSelectedApts] = React.useState<ApartmentData[]>([])
  const [leaseLength, setLeaseLength] = React.useState(12);
  const [aptToEdit, setAptToEdit] = React.useState<ApartmentData | undefined>(undefined);

  const handleAddApartment = (apartment: ApartmentData) => {
    setSelectedApts([...selectedApts, apartment])
  }

  const handleRemoveApartment = (index: number) => {
    const tempArray = [...selectedApts];
    tempArray.splice(index, 1);
    setSelectedApts(tempArray);
  }

  const handleSwapApartment = (index: number) => {
    const tempArray = [...selectedApts];
    const removedApt = tempArray.splice(index, 1);
    setSelectedApts([...removedApt, ...tempArray]);
  }

  const handleClearApartments = () => {
    setSelectedApts([]);
  }

  const handleOpenEditPage = (apt: ApartmentData | undefined) => {
    setIsCreating(true);
    setAptToEdit(apt);
    console.log(apt);
  }

  const setTotalCost = (index: number, newCost: number) => {
    const newApts = selectedApts.map((apt, i) => {
      if (i === index) {
        apt.totalCost = newCost;
      }

      return apt;
    })
    setSelectedApts(newApts);
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <div className="app">
        <Sidebar openEditPage={handleOpenEditPage} addApartment={handleAddApartment} />
        <div className="homePage">
          {isCreating && <CreatePage setIsCreating={setIsCreating} selectedApartment={aptToEdit} />}
          {!isCreating &&
            <div className="compare-page">
              <Card className="compare-page__compare-options">
                <TextField
                  label="Lease Length"
                  value={leaseLength}
                  type="number"
                  size="small"
                  onChange={(e) => {
                    setLeaseLength(Number(e.target.value))
                  }}
                  InputProps={{ inputProps: { min: 1 } }}
                />
                <Button variant="contained" onClick={handleClearApartments} disabled={selectedApts.length === 0}>
                  Clear All
                </Button>
              </Card>
              <ComparePage
                selectedApartments={selectedApts}
                addApartment={handleAddApartment}
                removeApartment={handleRemoveApartment}
                swapApartment={handleSwapApartment}
                setTotalCost={setTotalCost}
                leaseLength={leaseLength}
              />
            </div>
          }
        </div>

      </div>
    </ThemeProvider>
  )
}

export default App
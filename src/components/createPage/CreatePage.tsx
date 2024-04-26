import React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { v4 as uuid } from 'uuid';

import CloseIcon from '@mui/icons-material/Close';

import AdditionalCostField from "./AdditionalCostField";
import DiscountField from "./DiscountField";
import { AdditionalCost, ApartmentData } from "../../interfaces/ApartmentInterfaces";

import "./CreatePage.css"

const emptyApartmentCore: ApartmentData = {
  name: "",
  cost: 0,
  notes: "",
  id: "",
  additionalCosts: [{ name: "", cost: 0 }],
  totalCost: 0,
  discountPrice: 0
};

const CreatePage = ({ setIsCreating, selectedApartment }: { setIsCreating: Function, selectedApartment?: ApartmentData }) => {
  const [aptData, setAptData] = React.useState<ApartmentData>(selectedApartment ?? emptyApartmentCore);
  const [additionalCosts, setAdditionalCosts] = React.useState<AdditionalCost[]>(aptData.additionalCosts);
  const [discountPrice, setDiscountPrice] = React.useState(aptData.discountPrice);

  const isCreating = aptData !== emptyApartmentCore;

  const handleAddNewCost = () => {
    setAdditionalCosts([...additionalCosts, { name: "", cost: 0 }])
  }

  const handleRemoveCost = (index: number) => {
    const tempArray = [...additionalCosts];
    tempArray.splice(index, 1);
    setAdditionalCosts(tempArray);
  }

  const handleUpdateCost = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.currentTarget;

    setAdditionalCosts(additionalCosts.map((item, i) => {
      if (i === index) {
        return { ...item, [name]: value };
      }

      return item;
    }))
  }

  const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setAptData({ ...aptData, [name]: value })
  }

  const calculateTotalCost = () => {
    const initialCost = Number(aptData.cost);

    return additionalCosts.reduce((accumulator, item) => accumulator + Number(item.cost), initialCost);
  }

  const handleSave = () => {
    const newAptObj: ApartmentData = {
      ...aptData,
      id: isCreating ? uuid() : aptData.id,
      additionalCosts: additionalCosts,
      totalCost: calculateTotalCost(),
      discountPrice: discountPrice
    };

    const savedApts = JSON.parse(localStorage.getItem("savedApartments") as string) || [];

    let newApts;

    if (isCreating) {
      newApts = [...savedApts, newAptObj];
    } else {
      newApts = savedApts.map((item: ApartmentData) => {
        if (item.id === newAptObj.id) {
          return newAptObj;
        }

        return item;
      })
    }

    localStorage.setItem("savedApartments", JSON.stringify(newApts));
    window.dispatchEvent(new Event("storage"));

    setIsCreating(false);
  }

  return (
    <Card className="create-page">
      <CardHeader
        title="Add New Apartment"
        action={<Button variant="outlined" onClick={() => setIsCreating(false)}><CloseIcon /></Button>}
      />
      <CardContent className="create-page__form">
        <Card className="create-page-form__card">
          <TextField
            size="small"
            label="Apartment Name"
            name="name"
            value={aptData.name}
            onChange={setValue}
          />
          <TextField
            size="small"
            label="Base Rent"
            name="cost"
            value={aptData.cost}
            type="number"
            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            onChange={setValue}
          />
          <div className="multiline-wrapper">
            <TextField
              className="multiline-wrapper"
              size="small"
              label="Additional Notes"
              name="notes"
              value={aptData.notes}
              fullWidth
              multiline
              minRows={3}
              onChange={setValue}
            />
          </div>
          <DiscountField baseRent={aptData.cost} setDiscountPrice={setDiscountPrice} />

          <Typography>
            Total Cost: ${calculateTotalCost()} per month
          </Typography>
        </Card>

        <Card className="create-page-form__card">
          <CardHeader
            className="create-page-form__title"
            title="Additional Costs"
          />
          {additionalCosts.map((item: AdditionalCost, index) => {
            return (
              <div className="create-page-form__additional-field" key={`${index}`}>
                <AdditionalCostField
                  index={index}
                  name={item?.name}
                  cost={item?.cost}
                  updateItem={handleUpdateCost}
                />
                <Button onClick={() => { handleRemoveCost(index) }}>Remove</Button>
              </div>
            )
          })}

          <Button onClick={handleAddNewCost}>
            Add New Additional Cost
          </Button>
        </Card>
      </CardContent>
      <CardActions className="create-page__actions">
        <Button variant="outlined" onClick={() => setIsCreating(false)}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </CardActions>
    </Card>
  )
}

export default CreatePage;
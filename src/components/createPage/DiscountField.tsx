import React from "react";

import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';

import "./CreatePage.css";
import { Typography } from "@mui/material";

const DiscountField = ({ baseRent, setDiscountPrice }: { baseRent: number, setDiscountPrice: Function }) => {
  const [discountType, setDiscountType] = React.useState("time");
  const [timeDiscountType, setTimeDiscountType] = React.useState("Weeks");
  const [timeOff, setTimeOff] = React.useState(0);
  const [flatRate, setFlatRate] = React.useState(0);

  const handleSetDiscountType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountType(e.currentTarget.value);
  }

  const handleTimedDiscountType = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e)
    setTimeDiscountType(e.target.value);
  }

  const handleChange = (e: any) => {
    const value = Number(e.currentTarget.value);

    if (discountType === "time") {
      setTimeOff(value);
    } else {
      setFlatRate(value);
    }
  }

  const calculateDiscountPrice = () => {
    let discount = flatRate;

    if (discountType === "time") {
      switch (timeDiscountType) {
        case "Days":
          // baserent / 30 * time off
          discount = baseRent / 30 * timeOff;
          break;
        case "Weeks":
          // baserent / 30 * 7 * time off
          discount = baseRent / 30 * 7 * timeOff;
          break;
        case "Months":
          // baserent * time off
          discount = baseRent * timeOff;
          break;
      }
    }

    return Math.ceil(discount);
  }

  React.useEffect(() => {
    setDiscountPrice(calculateDiscountPrice());
  }, [timeOff, flatRate])

  return (
    <div>
      <FormControl>
        <FormLabel>Discounts/Specials/Promotions</FormLabel>
        <RadioGroup
          row
          value={discountType}
          onChange={handleSetDiscountType}
        >
          <FormControlLabel value={"time"} control={<Radio />} label="Time Off" />
          <FormControlLabel value={"flat"} control={<Radio />} label="Flat Rate" />
        </RadioGroup>
      </FormControl>
      {
        discountType === "time" && (
          <div className="discount-field__time-row">
            <TextField
              label={`Number of ${timeDiscountType}`}
              type="number"
              size="small"
              value={timeOff}
              onChange={handleChange}
            />
            <FormControl>
              <Select
                value={timeDiscountType}
                onChange={handleTimedDiscountType}
                size="small"
              >
                <MenuItem value="Days">Days</MenuItem>
                <MenuItem value="Weeks">Weeks</MenuItem>
                <MenuItem value="Months">Months</MenuItem>
              </Select>
            </FormControl>

            <Typography>
              = ~${calculateDiscountPrice()} Off
            </Typography>
          </div>
        )
      }
      {
        discountType === "flat" && (
          <div>
            <TextField
              label="Flat Rate"
              type="number"
              size="small"
              value={flatRate}
              onChange={handleChange}
              InputProps={{ startAdornment: <InputAdornment position="start">-$</InputAdornment> }}
            />
          </div>
        )
      }
    </div>
  )
}

export default DiscountField;
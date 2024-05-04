
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import "./CreatePage.css"

const AdditionalCostField = (
  { name, cost, index, updateItem, addItem }:
    { name: String, cost: Number, index: number, updateItem: any, addItem: any }
) => {

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      addItem();
    }
  }

  return (
    <>
      <TextField
        size="small"
        label="Name"
        name="name"
        value={name}
        fullWidth
        onChange={(e) => { updateItem(e, index) }}
        autoFocus={index != 0}
      />
      <TextField
        size="small"
        label="Cost"
        name="cost"
        value={cost}
        fullWidth
        type="number"
        InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
        onChange={(e) => { updateItem(e, index) }}
        onKeyDown={handleKeyPress}
      />
    </>
  )
}

export default AdditionalCostField;
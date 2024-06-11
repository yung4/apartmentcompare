import Typography from "@mui/material/Typography";

import "./CompareCard.css"

const CompareCardRow = ({ name, cost, baseCost, children }:
  { name: string, cost: number, baseCost: number, children?: any }
) => {
  const getDifference = () => {
    if (baseCost === null || baseCost === undefined) {
      return (
        <Typography sx={{ color: "white" }}>
          --
        </Typography >
      )
    }

    const difference = cost - baseCost;

    if (difference === 0) {
      return (
        <Typography sx={{ color: "white" }}>
          --
        </Typography >
      )
    } else if (difference < 0) {
      return (
        <Typography sx={{ color: "green" }}>
          -${Math.abs(difference)}
        </Typography >
      )
    } else {
      return (
        <Typography sx={{ color: "red" }}>
          +${difference}
        </Typography >
      )
    }
  }

  return (
    <>
      <div className="compare-card__row">
        {children}
        <Typography>
          {name}
        </Typography >
        <div className="line-grow"></div>
        <Typography>
          ${cost}
        </Typography >
      </div>
      <div className="compare-card__compare-row">
        {getDifference()}
      </div>
    </>
  )
}

export default CompareCardRow;
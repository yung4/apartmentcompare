import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";

import CloseIcon from '@mui/icons-material/Close';

import CompareCardRow from "./CompareCardRow";

import { ApartmentData } from "../../../interfaces/ApartmentInterfaces";
import "./CompareCard.css"

const CompareCard = ({ apartmentData, baseApartment, closeCard, leaseLength, setTotalCost }:
  { apartmentData: ApartmentData, baseApartment: ApartmentData, closeCard: any, leaseLength: number, setTotalCost: any }
) => {

  const [enabledCosts, setEnabledCosts] = React.useState(apartmentData.additionalCosts.map(() => true));

  const baseAptAdditionalCostsMap = baseApartment.additionalCosts.reduce(
    (accumulator, item) => {
      return accumulator.set(item.name.toLowerCase(), item.cost)
    }, new Map()
  );

  //TODO: figure out how to save this so that if base is edited its correct
  const calculateTotalCost = () => {
    let cost = Number(apartmentData.cost);

    apartmentData.additionalCosts.forEach((item, index) => {
      if (enabledCosts[index]) {
        cost += Number(item.cost);
      }
    })

    return cost;
  }

  const handleToggleCost = (index: number) => {
    setEnabledCosts(enabledCosts.map((checked, i) => {
      if (i === index) {
        return !checked;
      }

      return checked;
    }));
  }

  React.useEffect(() => {
    setTotalCost(calculateTotalCost());
  }, [enabledCosts])

  return (
    <Card className={`compare-card ${apartmentData === baseApartment ? "base-card" : ""}`}>
      <CardHeader
        title={apartmentData.name}
        action={<Button variant="outlined" onClick={closeCard}><CloseIcon /></Button>}
      />
      <CardContent className="compare-card__content">
        <CompareCardRow
          name="Base Rent"
          cost={apartmentData.cost}
          baseCost={baseApartment.cost}
        />
        <div className="compare-card__additonal-costs">
          {apartmentData.additionalCosts.map((item, index) => {
            return (

              <CompareCardRow
                key={index}
                name={item.name}
                cost={item.cost}
                baseCost={baseAptAdditionalCostsMap.get(item.name.toLowerCase())}
              >
                <Checkbox
                  className="additonal-costs__checkbox"
                  checked={enabledCosts[index] ?? false}
                  onChange={() => {
                    handleToggleCost(index)
                  }}
                />
              </CompareCardRow>

            )
          })}
        </div>
        <Divider className="compare-card__divider" />
        <CompareCardRow
          name="Total Cost"
          cost={calculateTotalCost()}
          baseCost={baseApartment.totalCost}
        />
        <CompareCardRow
          name={`Total Lease Cost (TC x${leaseLength})`}
          cost={calculateTotalCost() * leaseLength}
          baseCost={baseApartment.totalCost * leaseLength}
        />
      </CardContent>
    </Card>
  )
}

export default CompareCard;
import React from "react";

import CompareCard from "./compareCards/CompareCard";
import EmptyCard from "./compareCards/EmptyCard";

import "./ComparePage.css"
import { ApartmentData } from "../../interfaces/ApartmentInterfaces";

const ComparePage = ({ selectedApartments, removeApartment, swapApartment, setTotalCost, leaseLength, setSelecting }:
  { selectedApartments: ApartmentData[], removeApartment: any, swapApartment: any, setTotalCost: any, leaseLength: number, setSelecting: any }
) => {

  const handleUpdateTotalCost = (index: number, newCost: number) => {
    setTotalCost(index, newCost);
  }

  return (
    <div className="compare-page__cards-wrapper">
      {selectedApartments.map((apt, index) => {
        return (
          <CompareCard
            key={index}
            apartmentData={apt}
            baseApartment={selectedApartments[0]}
            closeCard={() => {
              removeApartment(index)
            }}
            leaseLength={leaseLength}
            setTotalCost={(newCost: number) => { handleUpdateTotalCost(index, newCost) }}
          />
        )
      })}
      {/* <CompareCard /> */}
      {selectedApartments.length < 4 && <EmptyCard setSelecting={setSelecting} />}

    </div>
  )
}

export default ComparePage;
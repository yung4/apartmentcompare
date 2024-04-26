export interface AdditionalCost {
  name: string,
  cost: number
}

export interface ApartmentCore {
  name: string,
  cost: number,
  notes: string
}

export interface ApartmentData extends ApartmentCore {
  id: string,
  additionalCosts: AdditionalCost[],
  totalCost: number,
  discountPrice: number
}
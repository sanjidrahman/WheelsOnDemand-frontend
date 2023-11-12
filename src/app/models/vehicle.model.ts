interface Review  {
    userId: string
    review: string
    _id: string
    replay?: string
}

export interface vehicleModel  {
    _id: string
    name: string
    price: number
    model: number
    transmission: string
    brand: string
    fuel: string
    location: string
    createdBy: string
    isVerified: boolean
    images: string[]
    document: string
    review: Review
}
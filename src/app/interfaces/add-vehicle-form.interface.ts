export interface IAddVehicleFormPayload {
    name: string;
    brand: string;
    make: string | number; // Assuming 'make' can be either a string or a number
    transmission: string; // Assuming 'transmission' is a string
    fuel: string; // Assuming 'fuel' is a string
    location: string | number; // Assuming 'location' can be either a string or a number
    price: string | number; // Assuming 'price' can be either a string or a number
    files: File[]; // Assuming 'files' is an array of File objects
}

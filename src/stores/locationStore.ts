import { create } from "zustand";

export interface Country {
    ID: number;
    Name: string;
    Iso: string;
    Iso3: string;
    Code: number;
    PhoneCode: number;
}

interface LocationState {
    countries: Country[];
    setCountries: (countries: Country[]) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
    countries: [],
    setCountries: (countries) => set({ countries }),
}));

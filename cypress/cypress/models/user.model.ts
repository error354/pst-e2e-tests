export type User = {
  email: string;
  password: string;
  name?: string;
};

export enum Country {
  US = "US",
  SW = "SW",
  PL = "PL",
}

export type Account = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  postcode: string;
  city: string;
  state: string;
  country: Country;
  phone: string;
  email: string;
  password: string;
};

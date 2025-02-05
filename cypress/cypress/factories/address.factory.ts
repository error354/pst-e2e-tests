import { faker } from "@faker-js/faker/locale/en";
import { Address } from "../models/address.model";

export function prepareRandomAddress(): Address {
  const address: Address = {
    street: faker.location.streetAddress(true),
    city: faker.location.city(),
    country: faker.location.country(),
    state: faker.location.state(),
    postalcode: faker.location.zipCode(),
  };
  return address;
}

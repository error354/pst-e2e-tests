import { faker } from '@faker-js/faker/locale/en';
import { Account, Country } from '../models/user.model';

export function prepareRandomAccount(): Account {
  const registerUserData: Account = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: 'Playwright1!',
    address: faker.location.streetAddress(true),
    city: faker.location.city(),
    country: Country.US,
    dateOfBirth: '30-04-1991',
    phone: faker.string.numeric({ length: 9 }),
    postcode: faker.location.zipCode(),
    state: faker.location.state(),
  };
  return registerUserData;
}

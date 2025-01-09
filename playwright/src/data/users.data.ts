import { User } from '../models/user.model';

export const customer: User = {
  email: 'customer@practicesoftwaretesting.com',
  password: 'welcome01',
  name: 'Jane Doe',
};

export const invalid: User = {
  email: 'customer@practicesoftwaretesting.com',
  password: 'welcome00',
};

import { faker } from '@faker-js/faker/locale/en';
import { Card } from '../models/card.model';

export function prepareRandomCard(): Card {
  const today = new Date();
  const oneMonthFromToday = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  );
  const date = faker.date.future({ refDate: oneMonthFromToday });
  const formattedDate = `${date.toLocaleString('default', { month: '2-digit' })}/${date.getFullYear()}`;

  const card: Card = {
    cardNumber: faker.finance.creditCardNumber({
      issuer: '####-####-####-####',
    }),
    expiryDate: formattedDate,
    cvv: faker.finance.creditCardCVV(),
    holderName: faker.person.fullName().replace(/[-.']/g, ''),
  };
  return card;
}

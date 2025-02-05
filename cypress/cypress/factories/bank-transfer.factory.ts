import { faker } from "@faker-js/faker/locale/en";
import { BankTransfer } from "../models/bank-transfer.model";

export function prepareRandomBankTransfer(): BankTransfer {
  const bankTransfer: BankTransfer = {
    bankName: "Test Bank",
    accountName: faker.finance.accountName(),
    accountNumber: faker.finance.accountNumber(),
  };
  return bankTransfer;
}

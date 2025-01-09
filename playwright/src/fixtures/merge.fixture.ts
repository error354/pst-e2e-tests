import { pageObjectTest } from './page-object.fixture';
import { cartTest } from './cart.fixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(pageObjectTest, cartTest);

export { expect } from '@playwright/test';

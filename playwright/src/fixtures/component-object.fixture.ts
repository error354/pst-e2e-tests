import { test as baseTest } from '@playwright/test';
import { AlertComponent } from '../components/alert.component';
import { NavbarComponent } from '../components/navbar.component';

interface Pages {
  alertComponent: AlertComponent;
  navbarComponent: NavbarComponent;
}

export const componentObjectTest = baseTest.extend<Pages>({
  alertComponent: async ({ page }, use) => {
    const alertComponent = new AlertComponent(page);
    await use(alertComponent);
  },
  navbarComponent: async ({ page }, use) => {
    const navbarComponent = new NavbarComponent(page);
    await use(navbarComponent);
  },
});

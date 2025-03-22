import {
  // ForgetPassword,
  // Login,
  // ResetOtp,
  // SignUp,
  Category,
  Reporting,
  Inventory,
  Pricing,
  Settings,
  Payment,
  // PageNotFound,
} from './LazyPath';
import { path } from './Path';

interface RouteTemplate {
  path: string;
  Component: any;
  type?: string;
  role?: string;
  roleId?: string;
}

const unsecureRoutes: RouteTemplate[] = [
  // {
  //   path: `${path.HOME}`,
  //   Component: Login,
  // },
  // {
  //   path: `${path.LOGIN}`,
  //   Component: Login,
  // },
  // {
  //   path: `${path.SIGN_UP}`,
  //   Component: SignUp,
  // },
  // {
  //   path: `${path.FORGETPASSWORD}`,
  //   Component: ForgetPassword,
  // },
  // {
  //   path: `${path.RESETOTP}`,
  //   Component: ResetOtp,
  // },
];

const securedRoutesMap: RouteTemplate[] = [
  {
    path: path.HOME,
    Component: Category,
    type: 'protected',
    role: 'admin',
  },
  {
    path: `${path.REPORTING}`,
    Component: Reporting,
    type: 'protected',
    role: 'admin',
  },
  {
    path: `${path.INVENTORY}`,
    Component: Inventory,
    type: 'protected',
    role: 'admin',
  },
  {
    path: `${path.PRICING}`,
    Component: Pricing,
    type: 'protected',
    role: 'admin',
  },
  {
    path: `${path.SETTINGS}`,
    Component: Settings,
    type: 'protected',
    role: 'admin',
  },
  {
    path: `${path.PAYMENT}`,
    Component: Payment,
    type: 'protected',
    role: 'admin',
  },
];

export { unsecureRoutes, securedRoutesMap };

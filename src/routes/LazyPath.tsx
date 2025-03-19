import { lazy } from 'react';

// Authentication Routs
// const SignUp = lazy(() => import('../pages/register/Index'));
// const Login = lazy(() => import('../pages/login/Index'));
// const ForgetPassword = lazy(() => import('../pages/login/forgotPassword'));
// const ResetOtp = lazy(() => import('../pages/login/resetOtp'));

// Lazy Loading Routes
const PageNotFound = lazy(() => import('../pages/pageNotFound/Index'));
// const Footer = lazy(() => import('../layout/mainLayout/Footer'));

// Secure Routes
const Category = lazy(() => import('../pages/dashboard/index'));
const Reporting = lazy(() => import('../pages/reporting/index'));
const Inventory = lazy(() => import('../pages/inventory/index'));
const Pricing = lazy(() => import('../pages/pricing/index'));
const Settings = lazy(() => import('../pages/settings/index'));

export { PageNotFound, Category, Reporting, Inventory, Pricing, Settings };

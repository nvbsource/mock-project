import { Register, Login, ForgotPassword } from "../pages/auth";
import { DefaultOnlyHeader } from "../components/Layout";
interface RouteState {
  path: string;
  component: React.ComponentState;
  layout?: React.ComponentState | null;
}
const publicRoutes: RouteState[] = [
  {
    path: "/login",
    component: Login,
    layout: DefaultOnlyHeader,
  },
  {
    path: "/register",
    component: Register,
    layout: DefaultOnlyHeader,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    layout: DefaultOnlyHeader,
  },
];
const privateRoutes = [
  {
    path: "/",
    component: "",
  },
];
export { publicRoutes, privateRoutes };

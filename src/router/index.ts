import { Register, Login, ForgotPassword } from "../pages/auth";
import { DefaultOnlyHeader } from "../Layout";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import Setting from "../pages/Setting";
import FavoriteArticles from "../pages/FavoriteArticles";
interface RouteState {
  path: string;
  component: React.ComponentState;
  layout?: React.ComponentState | null;
}
const publicRoutes: RouteState[] = [
  {
    path: "/",
    component: Home,
  },
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
const privateRoutes: RouteState[] = [
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/setting",
    component: Setting,
  },
  {
    path: "/favorite-articles",
    component: FavoriteArticles,
  },
];
export { publicRoutes, privateRoutes };

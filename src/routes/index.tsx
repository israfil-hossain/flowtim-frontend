import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protected.route";
import AuthRoute from "./auth.route";
import {
  authenticationRoutePaths,
  protectedRoutePaths,
} from "./common/routes";
import AppLayout from "@/layout/app.layout";
import BaseLayout from "@/layout/base.layout";
import NotFound from "@/page/errors/NotFound";
import Landing from "@/page/Landing";
import InviteUser from "@/page/invite/InviteUser";

function AppRoutes() {
  return (
    <Routes>
      {/* Auth routes - should be handled first */}
      <Route path="/" element={<AuthRoute />}>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<Landing />} />
          {authenticationRoutePaths.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Route>
      </Route>

      {/* Other base routes */}
      <Route element={<BaseLayout />}>
        <Route path="/invite/:token" element={<InviteUser />} />
      </Route>

      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          {protectedRoutePaths.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Route>
      </Route>
      
      {/* Catch-all for undefined routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;

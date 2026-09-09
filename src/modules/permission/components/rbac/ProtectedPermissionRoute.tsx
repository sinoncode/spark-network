import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuthStore } from "@/store/auth.store";
import { createPermissionChecker } from "@/lib/permissions";

interface Props {
  permissions: string[];
  children: ReactNode;
  redirectTo?: string;
}

const ProtectedPermissionRoute = ({
  permissions,
  children,
  redirectTo = "/dashboard",
}: Props) => {
  const user = useAuthStore(
    (state) => state.user
  );

  const checker = createPermissionChecker(user);

  const hasAccess =
    permissions.length === 0 ||
    checker.canAny(permissions);

  if (!hasAccess) {
    return (
      <Navigate
        to={redirectTo}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedPermissionRoute;
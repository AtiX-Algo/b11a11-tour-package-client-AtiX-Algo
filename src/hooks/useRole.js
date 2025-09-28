// src/hooks/useRole.js
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

/**
 * useRole - returns [role, isRoleLoading]
 * role: string | null  (e.g. 'user', 'guide', null)
 * isRoleLoading: boolean
 */
const useRole = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const getRole = async () => {
      if (!user?.email) {
        if (isMounted) {
          setRole(null);
          setIsRoleLoading(false);
        }
        return;
      }

      setIsRoleLoading(true);
      try {
        // Calls server endpoint: GET /users/role/:email (protected)
        const res = await axiosSecure.get(`/users/role/${user.email}`);
        if (isMounted) {
          setRole(res?.data?.role ?? null);
        }
      } catch (err) {
        console.error("useRole: failed to fetch role:", err);
        if (isMounted) setRole(null);
      } finally {
        if (isMounted) setIsRoleLoading(false);
      }
    };

    // only attempt after auth finished initial loading
    if (!authLoading) getRole();

    return () => {
      isMounted = false;
    };
  }, [user, authLoading, axiosSecure]);

  return [role, isRoleLoading];
};

export default useRole;

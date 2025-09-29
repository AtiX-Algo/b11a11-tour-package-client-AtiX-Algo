// src/hooks/useRole.js

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useAxiosSecure from './useAxiosSecure';


const useRole = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchRole = async () => {
      // Only try fetching after auth is resolved and user exists
      if (authLoading || !user?.email) {
        if (isMounted) {
          setRole(null);
          setIsRoleLoading(false);
        }
        return;
      }

      setIsRoleLoading(true);
      try {
        const res = await axiosSecure.get(`/users/role/${user.email}`);
        console.log('Server response for role:', res.data);
        if (isMounted) {
          setRole(res?.data?.role ?? null);
        }
      } catch (error) {
        console.error('useRole: failed to fetch role:', error);
        if (isMounted) setRole(null);
      } finally {
        if (isMounted) setIsRoleLoading(false);
      }
    };

    fetchRole();

    return () => {
      isMounted = false;
    };
  }, [user, authLoading, axiosSecure]);

  return [role, isRoleLoading];
};

export default useRole;

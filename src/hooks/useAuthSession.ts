import { useEffect, useState } from "react";

export function useAuthSession() {
  const [userAS, setUserAS] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      setUserAS(data.user);
      setLoading(false);
    }
    fetchSession();
  }, []);

  return { userAS, loading };
}

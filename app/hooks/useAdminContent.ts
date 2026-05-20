"use client";

import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAdminContent<T>(defaults: T, key: string): T {
  const [value, setValue] = useState<T>(defaults);

  useEffect(() => {
    fetch("/admin-content.json", { cache: "no-store" })
      .then(r => r.json())
      .then(data => {
        if (data[key]) setValue({ ...defaults, ...data[key] });
      })
      .catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return value;
}

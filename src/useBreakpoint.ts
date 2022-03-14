import { findLast } from 'lodash-es';
import { useCallback, useEffect, useMemo, useState } from 'react';

export type Config = { base: string; [key: string]: string };

export function useBreakpoint<C extends Config = Config, B extends keyof C = keyof C>(
  config: C,
  defaultBreakpoint = 'base' as B,
): B {
  const breakpoints = useMemo(() => {
    return Object.keys(config) as B[];
  }, [config]);

  const queries = useMemo(() => {
    if (typeof window === 'undefined') {
      return [];
    }
    return breakpoints.map(breakpoint => {
      return {
        breakpoint,
        list: window.matchMedia(`(min-width: ${config[breakpoint]})`),
      };
    });
  }, [config, breakpoints]);

  const getCurrentBreakpoint = useCallback(() => {
    return findLast(queries, query => query.list.matches)?.breakpoint ?? defaultBreakpoint;
  }, [queries, defaultBreakpoint]);

  const [currentBreakpoint, setCurrentBreakpoint] = useState(() => {
    return getCurrentBreakpoint();
  });

  useEffect(() => {
    const disposers = queries.map(query => {
      const listener = () => {
        setCurrentBreakpoint(getCurrentBreakpoint());
      };
      query.list.addEventListener('change', listener);
      return () => query.list.removeEventListener('change', listener);
    });
    return () => disposers.forEach(disposer => disposer());
  }, [queries, getCurrentBreakpoint]);

  return currentBreakpoint;
}

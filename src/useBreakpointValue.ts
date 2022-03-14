import { useMemo } from 'react';
import { Config, useBreakpoint } from './useBreakpoint';

export function useBreakpointValue<V, C extends Config = Config, B extends keyof C = keyof C>(
  values: { base: V } & Partial<Record<B, V>>,
  config: C,
  defaultBreakpoint = 'base' as B,
): V {
  const breakpoints = useMemo(() => {
    return Object.keys(config) as B[];
  }, [config]);

  const currentBreakpoint = useBreakpoint(config, defaultBreakpoint);

  let value = values.base;
  for (const breakpoint of breakpoints) {
    const temp = values[breakpoint];
    if (temp !== undefined) {
      value = temp as V;
    }
    if (breakpoint === currentBreakpoint) {
      break;
    }
  }
  return value;
}

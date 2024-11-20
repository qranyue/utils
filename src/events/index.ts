export const createEvents = () => {
  const es = new Map<string, Set<Function>>();
  const e = new Map<string, Function>();

  const add = (name: string, fn: Function) => {
    if (!es.has(name)) es.set(name, new Set());
    es.get(name)?.add(fn);
  };

  const set = (name: string, fn: Function) => {
    e.set(name, fn);
  };

  const del = (name: string, fn?: Function) => {
    if (fn) es.get(name)?.delete(fn);
    else es.set(name, new Set());
    if (fn && fn === e.get(name)) e.delete(name);
    else if (!fn) e.delete(name);
  };

  const run = (name: string, args: (unknown | void)[], data: unknown[]) => {
    for (const fn of es.get(name) || []) {
      const v = fn(...args);
      if (v) data.push(v);
    }
    const fn = e.get(name);
    if (!fn) return;
    const v = fn(...args);
    if (v) data.push(v);
  };

  return {
    on: (name: string, fn: Function, rest = false) => {
      if (rest) set(`on:${name}`, fn);
      else add(`on:${name}`, fn);
    },
    once: (name: string, fn: Function, rest = false) => {
      if (rest) set(`once:${name}`, fn);
      else add(`once:${name}`, fn);
    },
    off: (name: string, fn?: Function) => {
      del(`on:${name}`, fn);
      del(`once:${name}`, fn);
    },
    emit: <R extends unknown[]>(name: string, ...args: (unknown | void)[]) => {
      const result = [] as never as R;
      run(`on:${name}`, args, result);
      run(`once:${name}`, args, result);
      del(`once:${name}`);
      return result;
    },
  };
};

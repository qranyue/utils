interface SessionOption {
  prefix?: string;
}

/** 创建缓存 */
export const createSession = (option: SessionOption = {}) => {
  const opt = { prefix: "", ...option };
  const s = sessionStorage;
  return {
    /** 获取对象 */
    get: <T extends unknown>(key: string) => {
      const cache = s.getItem(`${opt.prefix}${key}`);
      if (!cache) return null;
      return JSON.parse(cache) as T;
    },
    /** 设置对象 */
    set: (key: string, value: unknown) => {
      s.setItem(`${opt.prefix}${key}`, JSON.stringify(value));
    },
    /** 移除对象 */
    rm: (key: string) => {
      s.removeItem(`${opt.prefix}${key}`);
    },
  };
};

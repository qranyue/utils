interface StorageOption {
  prefix?: string;
  expire?: number;
}

/** 创建长效缓存 */
export const createStorage = (option: StorageOption = {}) => {
  const opt = { prefix: "", expire: 0, ...option };
  const l = localStorage;
  return {
    /** 获取缓存 */
    get: <T extends unknown>(key: string) => {
      const cache = l.getItem(`${opt.prefix}${key}`);
      if (!cache) return null;
      const { expire, value } = JSON.parse(cache);
      if (expire && expire < Date.now()) {
        l.removeItem(`${opt.prefix}${key}`);
        return null;
      }
      return value as T;
    },
    /** 设置缓存 */
    set: (key: string, value: unknown, expire = opt.expire) => {
      if (expire) expire += Date.now();
      l.setItem(`${opt.prefix}${key}`, JSON.stringify({ expire, value }));
    },
    /** 移除缓存 */
    rm: (key: string) => {
      l.removeItem(`${opt.prefix}${key}`);
    },
  };
};

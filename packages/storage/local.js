/** 创建长效缓存 */
export const createStorage = (option) => {
  const opt = { prefix: "", expire: 0, ...option };
  return {
    /** 获取缓存 */
    get: (key) => {
      const cache = localStorage.getItem(`${opt.prefix}${key}`);
      if (!cache) return null;
      const { expire, value } = JSON.parse(cache);
      if (expire && expire < Date.now()) {
        localStorage.removeItem(`${opt.prefix}${key}`);
        return null;
      }
      return value;
    },
    /** 设置缓存 */
    set: (key, value, expire = opt.expire) => {
      if (expire) expire += Date.now();
      localStorage.setItem(
        `${opt.prefix}${key}`,
        JSON.stringify({ expire, value })
      );
    },
    /** 移除缓存 */
    rm: (key) => {
      localStorage.removeItem(`${opt.prefix}${key}`);
    },
  };
};

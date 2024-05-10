/** 创建缓存 */
export const createSession = (option) => {
  const opt = { prefix: "", ...option };
  return {
    /** 获取对象 */
    get: (key) => {
      const cache = sessionStorage.getItem(`${opt.prefix}${key}`);
      if (!cache) return null;
      return JSON.parse(cache);
    },
    /** 设置对象 */
    set: (key, value) => {
      sessionStorage.setItem(`${opt.prefix}${key}`, JSON.stringify(value));
    },
    /** 移除对象 */
    rm: (key) => {
      sessionStorage.removeItem(`${opt.prefix}${key}`);
    },
  };
};

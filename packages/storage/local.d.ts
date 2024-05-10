/** 创建缓存参数 */
interface QCacheOptions {
  /** 前缀 */
  prefix?: string;
  /** 过期时间，单位毫秒，默认0不过期 */
  expire?: number;
}

/** 缓存对象 */
interface QStorage {
  /** 获取对象 */
  get: <T = any>(key: string) => T | null;
  /** 设置对象 */
  set: (key: string, value: any, expire?: number) => void;
  /** 移除对象 */
  rm: (key: string) => void;
}

/** 创建长效缓存 */
export const createStorage: (option?: QCacheOptions) => QStorage;

/** 创建缓存参数 */
interface QSessOption {
  /** 缓存前缀 */
  prefix?: string;
}

/** 缓存实例 */
interface QSess {
  /** 获取对象 */
  get: <T = any>(key: string) => T | null;
  /** 设置对象 */
  set: (key: string, value: any) => void;
  /** 移除对象 */
  rm: (key: string) => void;
}

/** 创建缓存 */
export const createSession: (option?: QSessOption) => QSess;

/**
 * 工具函数
 */

/**
 * 防抖函数 - 延迟执行函数，直到最后一次调用后等待delay毫秒
 * @param {Function} fn - 要防抖的函数
 * @param {number} delay - 延迟时间(毫秒)
 * @returns {Function} - 防抖后的函数
 */
export function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * 格式化日期 - 将ISO日期字符串格式化为可读格式
 * @param {string} isoString - ISO格式日期字符串
 * @param {boolean} includeTime - 是否包含时间
 * @returns {string} - 格式化后的日期字符串
 */
export function formatDate(isoString, includeTime = false) {
  if (!isoString) return '';
  
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  if (!includeTime) {
    return `${year}-${month}-${day}`;
  }
  
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

/**
 * 过滤资源 - 根据搜索关键词过滤资源列表
 * @param {Array} resources - 资源列表
 * @param {string} query - 搜索关键词
 * @returns {Array} - 过滤后的资源列表
 */
export function filterResources(resources, query) {
  if (!query || !query.trim()) return resources;
  
  const lowerQuery = query.toLowerCase();
  return resources.filter(resource => {
    return (
      resource.name.toLowerCase().includes(lowerQuery) ||
      resource.description.toLowerCase().includes(lowerQuery) ||
      resource.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  });
}

/**
 * 按游戏版本过滤资源
 * @param {Array} resources - 资源列表
 * @param {string} version - 游戏版本 ('ALL' | 'D2' | 'D3' | 'D4')
 * @returns {Array} - 过滤后的资源列表
 */
export function filterByGameVersion(resources, version) {
  if (!version || version === 'ALL') return resources;
  return resources.filter(resource => 
    resource.gameVersion === version || resource.gameVersion === 'ALL'
  );
}

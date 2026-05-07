/**
 * 本地存储封装 - 用于收藏功能
 */

const STORAGE_KEY = 'anhei-nav-favorites';

/**
 * 获取收藏列表
 * @returns {Array<string>} - 收藏的资源ID列表
 */
export function getFavorites() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('读取收藏列表失败:', error);
    return [];
  }
}

/**
 * 保存收藏列表
 * @param {Array<string>} favorites - 收藏的资源ID列表
 */
function saveFavorites(favorites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('保存收藏列表失败:', error);
  }
}

/**
 * 切换收藏状态
 * @param {string} resourceId - 资源ID
 * @returns {boolean} - 切换后的状态（true=已收藏，false=未收藏）
 */
export function toggleFavorite(resourceId) {
  const favorites = getFavorites();
  const index = favorites.indexOf(resourceId);
  
  if (index > -1) {
    favorites.splice(index, 1);
    saveFavorites(favorites);
    return false;
  } else {
    favorites.push(resourceId);
    saveFavorites(favorites);
    return true;
  }
}

/**
 * 检查资源是否已收藏
 * @param {string} resourceId - 资源ID
 * @returns {boolean}
 */
export function isFavorite(resourceId) {
  const favorites = getFavorites();
  return favorites.includes(resourceId);
}

/**
 * 清空收藏列表
 */
export function clearFavorites() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('清空收藏列表失败:', error);
  }
}

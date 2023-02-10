/**
 * 根据不同分辨率获取合适的宽度
 * < 1280  75%
 * >= 1280  45%
 */
export function getFitWidth(): string {
  if (window.innerWidth > 1440) {
    return '45%'
  } else if (window.innerWidth <= 1440 && window.innerWidth > 1280) {
    return '65%'
  } else if (window.innerWidth <= 1280 && window.innerWidth > 768) {
    return '75%'
  }
  return '100%'
}

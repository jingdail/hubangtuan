/**
 * 缓存数据优化
 * var cache = require('utils/cache.js');
 * import cache from '../cache'
 * 使用方法 【
 *     一、设置缓存
 *         string    cache.put('k', 'string你好啊');
 *         json      cache.put('k', { "b": "3" }, 2);
 *         array     cache.put('k', [1, 2, 3]);
 *         boolean   cache.put('k', true);
 *     二、读取缓存
 *         默认值    cache.get('k')
 *         string    cache.get('k', '你好')
 *         json      cache.get('k', { "a": "1" })
 *     三、移除/清理  
 *         移除: cache.remove('k');
 *         清理：cache.clear(); 
 * 】
 * @type {String}
 */
var postfix = '_mallStore'; // 缓存前缀 

const simpleCache = {
	postfix:postfix,
}

/**
 * 设置缓存 
 * @param  {[type]} k [键名]
 * @param  {[type]} v [键值]
 * @param  {[type]} t [时间、单位秒]
 */

simpleCache.put = function(k,v,t){
    uni.setStorageSync(k, v) 
    var seconds = parseInt(t);
    if (seconds > 0) {
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000 + seconds;
        uni.setStorageSync(k + postfix, timestamp + "")
    } else {
        uni.removeStorageSync(k + postfix)
    }
}



/**
 * 获取缓存 
 * @param  {[type]} k   [键名]
 * @param  {[type]} def [获取为空时默认]
 */
simpleCache.get = function(k, def) {
    var deadtime = parseInt(uni.getStorageSync(k + postfix)) 
    if (deadtime) {
        if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
            if (def) {
                return def;
            } else {
                uni.removeStorageSync(k + postfix)
                return false;
            }
        }
    }
    var res = uni.getStorageSync(k);
    if (res) {
        return res;
    } else {
        if (def == undefined  || def == "") {
            def = false; 
            uni.removeStorageSync(k)
        }
        return def;
    }
}

simpleCache.remove = function(k) {
    uni.removeStorageSync(k);
    uni.removeStorageSync(k + postfix);
}

/**
 * 清理所有缓存
 * @return {[type]} [description]
 */
simpleCache.clear = function () {
    uni.clearStorageSync();
}

export default simpleCache

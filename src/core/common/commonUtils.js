/**
 * 是否为空字符串
 */
export function isEmptyString(value) {
    if (!value || value === undefined || value.length === 0) {
        return true
    }
    return false;
}
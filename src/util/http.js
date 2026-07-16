export function getMethod(request) {
    return request.method.toUpperCase();
}

export function isGet(request) {
    return getMethod(request) === "GET";
}

export function isPost(request) {
    return getMethod(request) === "POST";
}

export function isPut(request) {
    return getMethod(request) === "PUT";
}

export function isDelete(request) {
    return getMethod(request) === "DELETE";
}

export function getQuery(request) {
    const url = new URL(request.url);

    return Object.fromEntries(url.searchParams.entries());
}

export async function getBody(request) {
    try {
        return await request.json();
    } catch {
        return {};
    }
}

function toInt(value, fallback, min, max) {

    const parsed = Number.parseInt(value, 10);

    if (Number.isNaN(parsed)) return fallback;

    return Math.min(Math.max(parsed, min), max);

}

/**
 * limit/offset을 정규화한다.
 * 신뢰할 수 없는 쿼리 값이 그대로 SQL에 bind되지 않도록 한다.
 */
export function getPagination(query = {}, { defaultLimit = 100, maxLimit = 200 } = {}) {

    return {
        limit: toInt(query.limit, defaultLimit, 1, maxLimit),
        offset: toInt(query.offset, 0, 0, Number.MAX_SAFE_INTEGER)
    };

}
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
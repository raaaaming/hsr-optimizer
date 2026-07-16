/**
 * JSON Response
 */
export function json(data = {}, status = 200, headers = {}) {
    return new Response(
        JSON.stringify(data, null, 2),
        {
            status,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "*",
                ...headers
            }
        }
    );
}

/**
 * Success Response
 */
export function success(data = {}, message = "OK") {
    return json({
        success: true,
        message,
        data
    });
}

/**
 * Error Response
 */
export function error(message = "Error", status = 400, extra = {}) {
    return json({
        success: false,
        message,
        ...extra
    }, status);
}

/**
 * Not Found
 */
export function notFound(pathname = "") {
    return error("Not Found", 404, {
        path: pathname
    });
}

/**
 * Method Not Allowed
 */
export function methodNotAllowed(method = "") {
    return error("Method Not Allowed", 405, {
        method
    });
}

/**
 * CORS Preflight
 */
export function preflight() {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Max-Age": "86400"
        }
    });
}
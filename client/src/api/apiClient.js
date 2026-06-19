const base_url = import.meta.env.VITE_API_URL;

const request = async (endpoint, options = {}) => {
    let response = await fetch(
        `${base_url}${endpoint}`,
        {
            ...options,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            }
        }
    );

    // if (
    //     response.status === 401 &&
    //     endpoint !== "/auth/refresh"
    // ) {
    //     const refreshResponse = await fetch(
    //         `${base_url}/auth/refresh`,
    //         {
    //             method: "POST",
    //             credentials: "include"
    //         }
    //     );
    //     if (refreshResponse.ok) {
    //         response = await fetch(
    //             `${base_url}${endpoint}`,
    //             {
    //                 ...options,
    //                 credentials: "include",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     ...(options.headers || {})
    //                 }
    //             }
    //         );

    //     } else {
    //         throw new Error("Session expired");
    //     }
    // }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Request Failed");
    }

    return data;
}

export const get = (endpoint, headers = {}) => {
    return request(
        endpoint,
        {
            method: "GET",
            headers
        }
    );
}

export const post = (endpoint, body, headers = {}) => {
    return request(
        endpoint,
        {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }
    );
}
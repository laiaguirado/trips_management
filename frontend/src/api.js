const HOST = "localhost";
const PORT = 8080;
const BASE_URL = `http://${HOST}:${PORT}`;
const version = "v1";

export const login = async (userData) => {
    try {
        const response = await fetch(`${BASE_URL}/user/${version}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const result = await response.json();
        if (response.status === 200) {
            return { success: true, token: result };
        } else {
            return { success: false, error: result.error };
        }
    } catch (e) {
        return { success: false, error: e.message };
    }
};

export const register = async (userData) => {
    try {
        const response = await fetch(`${BASE_URL}/user/${version}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const result = await response.json();
        if (response.status === 200) {
            return { success: true };
        } else {
            return { success: false, error: result.error };
        }
    } catch (e) {
        return { success: false, error: e.message };
    }
};
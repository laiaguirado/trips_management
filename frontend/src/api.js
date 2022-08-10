const HOST = "localhost";
const PORT = 8080;
const BASE_URL = `http://${HOST}:${PORT}`;
const version = "v1";

const isSuccess = (httpCode) => httpCode === 200 || httpCode === 201

const apiCall = async (method, path, body, headers) => {
    try {
        const response = await fetch(`${BASE_URL}${path}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: JSON.stringify(body),
        });
        const json = await response.json();
        if (isSuccess(response.status)) {
            return { success: true, result: json };
        } else {
            return { success: false, error: json.error };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

const apiPost = (path, body) => apiCall("POST", path, body);
export const login = (userData) => apiPost(`/user/${version}/login`, userData);
export const register = (userData) => apiPost(`/user/${version}/register`, userData);

const authApiCall = (method, path, body) => {
    const { accessToken } = JSON.parse(localStorage.getItem("token"));
    return apiCall(method, path, body, { "Authorization": `Bearer ${accessToken}` });
}
export const getUserData = () => authApiCall("GET", `/user/${version}/me`);

export const getTripList = () => authApiCall("GET", `/user/${version}/me/travel`);
export const getTrip = (tripId) => authApiCall("GET", `/${version}/travel/${tripId}`);
export const addTrip = (newTripData) => authApiCall("POST", `/${version}/travel`, newTripData);
export const deleteTrip = (tripId) => authApiCall("DELETE", `/${version}/travel/${tripId}`);
//export const updateTrip = (updatedTrip) => authApiCall("PUT", `/${version}/travel/${tripId}`, updatedTrip);

export const addCreatorAsTraveler = (added) => authApiCall("POST", `/${version}/travel/${added._id}/traveller/me`);
export const getTravelerByEmail = (email) => authApiCall("GET", `/user/${version}/${email}`);
export const addTraveler = (tripId, travelerId) => authApiCall("POST", `/${version}/travel/${tripId}/traveller/${travelerId}`);
export const deleteTraveler = (tripId, email) => authApiCall("DELETE", `/${version}/travel/${tripId}/traveller/${email}`);

export const getAccommodationList = (tripId) => authApiCall("GET", `/${version}/accommodation/travel/${tripId}`);
export const addAccommodation = (tripId, newAccommodationData) => authApiCall("POST", `/${version}/accommodation/${tripId}`, newAccommodationData);
export const deleteAccommodation = (accommodationId) => authApiCall("DELETE", `/${version}/accommodation/${accommodationId}`);

export const getTransportationList = (tripId) => authApiCall("GET", `/${version}/travel/${tripId}/transportation`);
export const addTransportation = (tripId, newTransportationData) => authApiCall("POST", `/${version}/travel/${tripId}/transportation`, newTransportationData);
export const deleteTransportation = (transportationId) => authApiCall("DELETE", `/${version}/transportation/${transportationId}`);

export const getPlanList = (tripId) => authApiCall("GET", `/${version}/travel/${tripId}/plans`);
export const addPlan = (tripId, newPlanData) => authApiCall("POST", `/${version}/travel/${tripId}/plans`, newPlanData);
export const deletePlan = (planId) => authApiCall("DELETE", `/${version}/plans/${planId}`);

export const getRestorationList = (tripId) => authApiCall("GET", `/${version}/restoration/travel/${tripId}`);
export const addRestoration = (tripId, newRestorationData) => authApiCall("POST", `/${version}/restoration/${tripId}`, newRestorationData);
export const deleteRestoration = (restorationId) => authApiCall("DELETE", `/${version}/restoration/${restorationId}`);
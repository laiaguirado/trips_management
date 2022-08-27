const HOST = "localhost";
const PORT = 8080;
const BASE_URL = `http://${HOST}:${PORT}`;
const version = "v1";

const isSuccess = (httpCode) => httpCode === 200 || httpCode === 201;

const apiCall = async (method, path, body, headers, isMultipartForm) => {
  try {
    let headerCall = { ...headers };
    let bodyCall = body;

    if (!isMultipartForm) {
      headerCall["Content-type"] = "application/json";
      bodyCall = JSON.stringify(body);
    }
    const response = await fetch(`${BASE_URL}/${version}${path}`, {
      method,
      headers: headerCall,
      body: bodyCall,
    });
    const json = await response.json();
    if (isSuccess(response.status)) {
      return { success: true, result: json };
    } else if (response.status === 401) {
      // localStorage.setItem("token", null);
      return { success: false, error: json.error };
    } else {
      return { success: false, error: json.error };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const apiPost = (path, body) => apiCall("POST", path, body);
export const login = (userData) => apiPost(`/user/login`, userData);
export const register = (userData) => apiPost(`/user/register`, userData);

const authApiCall = (method, path, body, isMultipartForm) => {
  const { accessToken } = JSON.parse(localStorage.getItem("token"));
  return apiCall(
    method,
    path,
    body,
    {
      Authorization: `Bearer ${accessToken}`,
    },
    isMultipartForm
  );
};

export const authenticated = () => authApiCall("GET", `/user/authenticated`);

export const getUserData = () => authApiCall("GET", `/user/me`);

export const getTripList = () => authApiCall("GET", `/user/me/travel`);
export const getTrip = (tripId) => authApiCall("GET", `/travel/${tripId}`);
export const addTrip = (newTripData) => authApiCall("POST", `/travel`, newTripData, true);
export const deleteTrip = (tripId) => authApiCall("DELETE", `/travel/${tripId}`);
export const updateTrip = (tripId, updatedTrip) =>
  authApiCall("PUT", `/travel/${tripId}`, updatedTrip, true);

export const addCreatorAsTraveler = (added) => authApiCall("POST", `/travel/${added._id}/traveler/me`);
export const getTravelerByEmail = (email) => authApiCall("GET", `/user/${email}`);
export const addTraveler = (tripId, travelerId) => authApiCall("POST", `/travel/${tripId}/traveler/${travelerId}`);
export const deleteTraveler = (tripId, email) => authApiCall("DELETE", `/travel/${tripId}/traveler/${email}`);

export const getAccommodationList = (tripId) => authApiCall("GET", `/travel/${tripId}/accommodation`);
export const getAccommodation = (accommodationId) => authApiCall("GET", `/accommodation/${accommodationId}`);
export const addAccommodation = (tripId, newAccommodationData) => authApiCall("POST", `/travel/${tripId}/accommodation`, newAccommodationData);
export const deleteAccommodation = (accommodationId) => authApiCall("DELETE", `/accommodation/${accommodationId}`);
export const updateAccommodation = (accommodationId, accommodationData) => authApiCall("PUT", `/accommodation/${accommodationId}`, accommodationData);

export const getTransportationList = (tripId) => authApiCall("GET", `/travel/${tripId}/transportation`);
export const getTransportation = (transportationId) => authApiCall("GET", `/transportation/${transportationId}`);
export const addTransportation = (tripId, newTransportationData) => authApiCall("POST", `/travel/${tripId}/transportation`, newTransportationData);
export const deleteTransportation = (transportationId) => authApiCall("DELETE", `/transportation/${transportationId}`);
export const updateTransportation = (transportationId, transportationData) => authApiCall("PUT", `/transportation/${transportationId}`, transportationData);

export const getPlanList = (tripId) => authApiCall("GET", `/travel/${tripId}/plans`);
export const getPlan = (planId) => authApiCall("GET", `/plans/${planId}`);
export const addPlan = (tripId, newPlanData) => authApiCall("POST", `/travel/${tripId}/plans`, newPlanData);
export const deletePlan = (planId) => authApiCall("DELETE", `/plans/${planId}`);
export const updatePlan = (planId, planData) => authApiCall("PUT", `/plans/${planId}`, planData);

export const getRestorationList = (tripId) => authApiCall("GET", `/travel/${tripId}/restoration`);
export const getRestoration = (restorationId) => authApiCall("GET", `/restoration/${restorationId}`);
export const addRestoration = (tripId, newRestorationData) => authApiCall("POST", `/travel/${tripId}/restoration`, newRestorationData);
export const deleteRestoration = (restorationId) => authApiCall("DELETE", `/restoration/${restorationId}`);
export const updateRestoration = (restorationId, restorationData) => authApiCall("PUT", `/restoration/${restorationId}`, restorationData);

export const getCommentList = (tripId, componentId) => authApiCall("GET", `/comment/travel/${tripId}/component/${componentId}`);
export const addComment = (tripId, componentId, component, newCommentData) => authApiCall("POST", `/comment/travel/${tripId}/${component}/${componentId}`, newCommentData);

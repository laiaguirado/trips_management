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
    if (response.status === 201) {
      return { success: true };
    } else {
      return { success: false, error: result.error };
    }
  } catch (e) {
    return { success: false, error: e.message };
  }
};

export const getUserData = async () => {
  try {
    const { accessToken } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`${BASE_URL}/user/${version}/test`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userData = await response.json();
    if (response.status === 200) {
      return { success: true, userData: userData };
    } else {
      return { success: false, error: userData.error };
    }
  } catch (e) {
    return { success: false, error: e.message };
  }
};

export const getTripList = async () => {
  try {
    const { accessToken } = JSON.parse(localStorage.getItem("token"));
    //const response = await fetch(`${BASE_URL}/${version}/travel`, {
    const response = await fetch(`${BASE_URL}/user/${version}/me/travel`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const trips = await response.json();
    if (response.status === 200) {
      return { success: true, tripList: trips };
    } else {
      return { success: false, error: "Couldn't fetch trips" };
    }
  } catch (e) {
    return { success: false, error: `Network error: ${e.message}` };
  }
};

export const getTrip = async (tripId) => {
  try {
    const { accessToken } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`${BASE_URL}/${version}/travel/${tripId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const trip = await response.json();
    if (response.status === 200) {
      return { success: true, trip: trip[0] };
    } else {
      return { success: false, error: "Couldn't fetch trip" };
    }
  } catch (e) {
    return { success: false, error: `Network error: ${e.message}` };
  }
};

export const addTrip = async (newTripData) => {
  try {
    const { accessToken } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`${BASE_URL}/${version}/travel`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTripData),
    });
    const added = await response.json();
    if (response.status === 201) {
      return { success: true, added };
    } else {
      return { success: false, error: "Couldn't add trip" };
    }
  } catch (e) {
    return { success: false, error: `Network error: ${e.message}` };
  }
};

export const addCreatorAsMember = async (added) => {
  try {
    const { accessToken } = JSON.parse(localStorage.getItem("token"));
    const travelId = added._id;
    const response = await fetch(
      `${BASE_URL}/${version}/travel/${travelId}/traveller/me`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const addedWithTraveller = await response.json();
    if (response.status === 200) {
      return { success: true, addedWithTraveller };
    } else {
      return { success: false, error: "Couldn't add member in the trip" };
    }
  } catch (e) {
    return { success: false, error: `Network error: ${e.message}` };
  }
};

export const deleteTrip = async (tripId) => {
  try {
    const { accessToken } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`${BASE_URL}/${version}/travel/${tripId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, error: "Couldn't delete trip" };
    }
  } catch (e) {
    return { success: false, error: `Network error: ${e.message}` };
  }
};

export const getAccomodationList = async (travelId) => {
  try {
    const { accessToken } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`${BASE_URL}/${version}/accommodation/travel/${travelId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const accomodations = await response.json();
    if (response.status === 200) {
      return { success: true, accomodationList: accomodations.results };
    } else {
      return { success: false, error: "Couldn't fetch accomodations" };
    }
  } catch (e) {
    return { success: false, error: `Network error: ${e.message}` };
  }
};

export const addAccomodation = async (tripId, newAccomodationData) => {
  try {
    const { accessToken } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`${BASE_URL}/${version}/accommodation/${tripId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAccomodationData),
    });
    const added = await response.json();
    if (response.status === 200) {
      return { success: true, added };
    } else {
      return { success: false, error: "Couldn't add accomodation" };
    }
  } catch (e) {
    return { success: false, error: `Network error: ${e.message}` };
  }
};
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

//Trip

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
      return { success: true, trip };
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
    const tripId = added._id;
    const response = await fetch(
      `${BASE_URL}/${version}/travel/${tripId}/traveller/me`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const addedWithTraveler = await response.json();
    if (response.status === 200) {
      return { success: true, addedWithTraveler };
    } else {
      return { success: false, error: "Couldn't add traveler in the trip" };
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

export const getTravelerByEmail = async (email) => {
  try {
    const { accessToken } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`${BASE_URL}/user/${version}/${email}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const traveler = await response.json();
    if (response.status === 200) {
      return { success: true, traveler };
    } else {
      return { success: false, error: "Couldn't fetch traveler" };
    }
  } catch (e) {
    return { success: false, error: `Network error: ${e.message}` };
  }
};

export const addTraveler = async (tripId, travelerId) => {
  try {
    const { accessToken } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`${BASE_URL}/${version}/travel/${tripId}/traveller/${travelerId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const added = await response.json();
    if (response.status === 200) {
      return { success: true, added };
    } else {
      return { success: false, error: "Couldn't add trip" };
    }
  } catch (e) {
    return { success: false, error: `Network error: ${e.message}` };
  }
};

export const deleteTraveler = async (tripId, email) => {
  try {
    const { accessToken } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`${BASE_URL}/${version}/travel/${tripId}/traveller/${email}`, {
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

//Accommodation

export const getAccommodationList = async (tripId) => {
  try {
    const { accessToken } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`${BASE_URL}/${version}/accommodation/travel/${tripId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const accommodations = await response.json();
    if (response.status === 200) {
      return { success: true, accommodationList: accommodations.results };
    } else {
      return { success: false, error: "Couldn't fetch accommodations" };
    }
  } catch (e) {
    return { success: false, error: `Network error: ${e.message}` };
  }
};

export const addAccommodation = async (tripId, newAccommodationData) => {
  try {
    const { accessToken } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`${BASE_URL}/${version}/accommodation/${tripId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAccommodationData),
    });
    const added = await response.json();
    if (response.status === 200) {
      return { success: true, added };
    } else {
      return { success: false, error: "Couldn't add accommodation" };
    }
  } catch (e) {
    return { success: false, error: `Network error: ${e.message}` };
  }
};

export const deleteAccommodation = async (accommodationId) => {
  try {
    const { accessToken } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`${BASE_URL}/${version}/accommodation/${accommodationId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, error: "Couldn't delete accommodation" };
    }
  } catch (e) {
    return { success: false, error: `Network error: ${e.message}` };
  }
};

//Transportation
export const getTransportationList = async (tripId) => {
  try {
    const { accessToken } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`${BASE_URL}/${version}/travel/${tripId}/transportation`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const transportations = await response.json();
    if (response.status === 200) {
      return { success: true, transportationList: transportations };
    } else {
      return { success: false, error: "Couldn't fetch transportation" };
    }
  } catch (e) {
    return { success: false, error: `Network error: ${e.message}` };
  }
};

export const addTransportation = async (tripId, newTransportationData) => {
  try {
    const { accessToken } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`${BASE_URL}/${version}/travel/${tripId}/transportation`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransportationData),
    });
    const added = await response.json();
    if (response.status === 201) {
      return { success: true, added };
    } else {
      return { success: false, error: "Couldn't add transportation" };
    }
  } catch (e) {
    return { success: false, error: `Network error: ${e.message}` };
  }
};

export const deleteTransportation = async (transportationId) => {
  try {
    const { accessToken } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`${BASE_URL}/${version}/transportation/${transportationId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, error: "Couldn't delete transportation" };
    }
  } catch (e) {
    return { success: false, error: `Network error: ${e.message}` };
  }
};


//Plans
export const getPlansList = async (tripId) => {
  try {
    const { accessToken } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`${BASE_URL}/${version}/travel/${tripId}/plans`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const plans = await response.json();
    if (response.status === 200) {
      return { success: true, plansList: plans };
    } else {
      return { success: false, error: "Couldn't fetch plans" };
    }
  } catch (e) {
    return { success: false, error: `Network error: ${e.message}` };
  }
};

export const addPlan = async (tripId, newPlanData) => {
  try {
    const { accessToken } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`${BASE_URL}/${version}/travel/${tripId}/plans`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlanData),
    });
    const added = await response.json();
    if (response.status === 201) {
      return { success: true, added };
    } else {
      return { success: false, error: "Couldn't add plan" };
    }
  } catch (e) {
    return { success: false, error: `Network error: ${e.message}` };
  }
};

export const deletePlan = async (planId) => {
  try {
    const { accessToken } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`${BASE_URL}/${version}/plans/${planId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, error: "Couldn't delete plan" };
    }
  } catch (e) {
    return { success: false, error: `Network error: ${e.message}` };
  }
};
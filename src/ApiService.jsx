// src/ApiService.jsx
import axios from 'axios';

// 1) Grab your base URL from Vite
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * 2) Create a shared Axios instance
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 3) Expose all your backend calls from one service object.
 */
const ApiService = {
  /**
   * Create a new Racer in the backend.
   * @param {Object} racerData
   * @param {string} racerData.first_name
   * @param {string} racerData.last_name
   * @param {string} racerData.date_of_birth   // YYYY-MM-DD
   * @param {string} racerData.nationality
   * @param {string} racerData.email
   * @param {string} racerData.phone
   * @param {string} racerData.password
   * @param {string} [racerData.racer_type]
   * @param {string} [racerData.racing_team]
   * @returns {Promise<Object>}  Created racer record
   * @throws {Error} when the request fails
   */
  createRacer: async (racerData) => {
    try {
      const { data } = await api.post('/racers/', racerData);
      return data;
    } catch (err) {
      if (err.response?.data?.detail) {
        throw new Error(err.response.data.detail);
      }
      throw new Error('Failed to create racer');
    }
  },

  /**
   * Create a new Emergency Contact in the backend.
   * @param {Object} contactData
   * @param {string} contactData.contact_name
   * @param {string} contactData.relationship
   * @param {string} contactData.contact_phone
   * @param {number} contactData.racer_id
   * @returns {Promise<Object>}  Created contact record
   * @throws {Error} when the request fails
   */
  createContact: async (contactData) => {
    try {
      const { data } = await api.post('/contacts/', contactData);
      return data;
    } catch (err) {
      if (err.response?.data?.detail) {
        throw new Error(err.response.data.detail);
      }
      throw new Error('Failed to create contact');
    }
  },

  /**
   * Upload a document for a racer (national_id or passport)
   * @param {File} file - The document file
   * @param {number} racerId - The ID of the racer
   * @param {'national_id' | 'passport'} documentType
   * @returns {Promise<Object>} - Created document record
   * @throws {Error} when the request fails
   */
  uploadDocument: async (file, racerId, documentType) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('racer_id', racerId);
    formData.append('document_type', documentType);

    try {
      const { data } = await axios.post(`${API_BASE_URL}/documents/documents/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (err) {
      if (err.response?.data?.detail) {
        throw new Error(err.response.data.detail);
      }
      throw new Error('Failed to upload document');
    }
  },

  getRacerById: async (racerId) => {
  try {
    const { data } = await api.get(`/racers/${racerId}`);
    return data;
  } catch (err) {
    if (err.response?.data?.detail) {
      throw new Error(err.response.data.detail);
    }
    throw new Error('Failed to fetch racer details');
  }
},

  /**
   * Fetch leaderboard entries for a specific racer.
   * @param {number} racerId
   * @returns {Promise<Array>}  Array of leaderboard entries
   * @throws {Error} when the request fails
   */
  getLeaderboardByRacer: async (racerId) => {
    try {
      const { data } = await api.get(`/leaderboard/leaderboard/racer/${racerId}`);
      return data;
    } catch (err) {
      if (err.response?.data?.detail) {
        throw new Error(err.response.data.detail);
      }
      throw new Error('Failed to fetch leaderboard entries');
    }
  },

  /**
 * Get all registrations for a specific racer, including event details
 * @param {number} racerId
 * @returns {Promise<Array>} Array of registrations with nested event info
 */
getRegistrationsByRacer: async (racerId) => {
  try {
    const { data } = await api.get(`/registrations/registrations/racer/${racerId}`);
    return data;
  } catch (err) {
    if (err.response?.data?.detail) {
      throw new Error(err.response.data.detail);
    }
    throw new Error('Failed to fetch registrations');
  }
},


getEmergencyContactsByRacer: async (racerId) => {
  try {
    const { data } = await api.get(`/contacts/racer/${racerId}`);
    return data;
  } catch (err) {
    if (err.response?.data?.detail) {
      throw new Error(err.response.data.detail);
    }
    throw new Error("Failed to fetch emergency contacts");
  }
},


login: async (email, password) => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await axios.post(`${API_BASE_URL}/auth/token`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return response.data; // contains access_token, token_type, user_id
    } catch (err) {
      if (err.response?.data?.detail) {
        throw new Error(err.response.data.detail);
      }
      throw new Error('Login failed');
    }
  },


  /**
   * ✅ CREATE RACE: POST /races/races/
   * @param {Object} raceData
   * @param {string} raceData.race_name
   * @param {string} raceData.location
   * @param {string} raceData.date (e.g., "2025-05-16")
   * @param {string} raceData.category
   * @param {number} raceData.max_participants
   */
  createRace: async (raceData) => {
    try {
      const { data } = await api.post('/races/races/', raceData);
      return data;
    } catch (err) {
      if (err.response?.data?.detail) {
        throw new Error(err.response.data.detail);
      }
      throw new Error('Failed to create race');
    }
  },

   getAllRaces: async () => {
    try {
      const { data } = await api.get('/races/races/');
      return data;
    } catch (err) {
      if (err.response?.data?.detail) {
        throw new Error(err.response.data.detail);
      }
      throw new Error('Failed to fetch races');
    }
  },

    /**
   * 🔢 GET Predictions / Rankings for all snapshots
   * GET /snapshots/rankings
   * @returns {Promise<Array<{ driver_id, driver_name, predicted_finish, predicted_rank }>>}
   * @throws {Error} when the request fails
   */
  getPredictions: async () => {
    try {
      const { data } = await api.get('/snapshots/rankings');
      return data;
    } catch (err) {
      if (err.response?.data?.detail) {
        throw new Error(err.response.data.detail);
      }
      throw new Error('Failed to fetch predictions');
    }
  },


};

export default ApiService;

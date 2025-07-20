import axios from 'axios';

// The base URL for all expense-related API calls.
const API_URL = 'http://localhost:8080/api/v1/expenses';

/**
 * A helper function to create the authorization headers.
 * It retrieves the JWT from localStorage and adds it to the "Authorization" header.
 * This ensures every request is authenticated.
 * @returns {object} - The headers object.
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    return {
      'Authorization': `Bearer ${token}`
    };
  }
  return {};
};

/**
 * Fetches all expenses for the authenticated user.
 */
export const getAllExpenses = () => {
  return axios.get(API_URL, { headers: getAuthHeaders() });
};

/**
 * Adds a new expense for the authenticated user.
 * @param {object} data - The expense data to be added.
 */
export const addExpense = (data) => {
  return axios.post(API_URL, data, { headers: getAuthHeaders() });
};

/**
 * Updates an existing expense by its ID for the authenticated user.
 * @param {number} id - The ID of the expense to update.
 * @param {object} data - The new expense data.
 */
export const updateExpense = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data, { headers: getAuthHeaders() });
};

/**
 * Deletes an expense by its ID for the authenticated user.
 * @param {number} id - The ID of the expense to delete.
 */
export const deleteExpense = (id) => {
  return axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
};

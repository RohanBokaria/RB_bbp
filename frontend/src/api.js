import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

/**
 * Fetch the list of available runs from the backend.
 */
export const fetchRuns = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/runs/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching runs:", error);
        return [];
    }
};

/**
 * Fetch time-series data for a specific run ID.
 */
export const fetchRunData = async (runId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/data/${runId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data for Run ID ${runId}:`, error);
        return [];
    }
};

/**
 * Upload a CSV file along with pump choices.
 */
export const uploadFile = async (file, pump1, pump2) => {
    if (!file) {
        return { success: false, message: "No file selected." };
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("pump1_choice", pump1);
    formData.append("pump2_choice", pump2);

    try {
        const response = await axios.post(`${API_BASE_URL}/upload/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return { success: true, message: "File uploaded successfully!", data: response.data };
    } catch (error) {
        console.error("Error uploading file:", error);
        return { success: false, message: "File upload failed." };
    }
};
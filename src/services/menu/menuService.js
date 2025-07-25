import api from '../posAPI';


export const getAllMenu = async () => {
    try {
        const response = await api.post('/Menu/list/menus');
        if (response.data && Array.isArray(response.data.Data)) {
            return response.data.Data;  
        } else {
            throw new Error("Unexpected response format");
        }
    } catch (error) {
        if (error.response) {
            // You can use a toast or console.log here for user-friendly error reporting
        }
        throw new Error('Failed to fetch users. Please try again.');
    }
};


export const newMenu = async (data) => {
    try {
        const response = await api.post('/Menu/add/menu', data); // Use POST
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};


export const updateMenu = async (data) => {
    try {
        const response = await api.post('/Menu/update/menu', data); // Use POST
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

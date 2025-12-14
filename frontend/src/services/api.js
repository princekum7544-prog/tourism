const API_URL = 'https://tourism-backend-e1u0.onrender.com/api';


export const planTrip = async (data) => {
    try {
        const response = await fetch(`${API_URL}/plan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

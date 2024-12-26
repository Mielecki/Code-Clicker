import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:5000/',
});

api.interceptors.request.use(
    (config) => {
        const access_token = localStorage.getItem("access_token");
        if (access_token) {
            config.headers.Authorization = `Bearer ${access_token}`;
        }

        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refresh_token = localStorage.getItem("refresh_token");
                const response = await axios.post("http://localhost:5000/refresh", null, {
                    headers: {
                        'Authorization': `Bearer ${refresh_token}`
                    }});
                const { access_token } = response.data;

                localStorage.setItem("access_token", access_token);

                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                return axios(originalRequest);
            } catch (error){
                console.log(error);
            }
        }


        return Promise.reject(error);
    }
)

export default api
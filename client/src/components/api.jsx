import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:5000/',
});

// Add Authorization header to every request if access token was created
api.interceptors.request.use(function(config) {
        const access_token = localStorage.getItem("access_token");
        if (access_token) {
            config.headers.Authorization = `Bearer ${access_token}`;
        }

        return config
    }, function(error){
        return Promise.reject(error);
    }
)

// if respose returns an error, check if it is an Authorization error. If so, try to refresh the access token using the refresh token.
api.interceptors.response.use(function(response){ 
    return response;
    },
    function(error){
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refresh_token = localStorage.getItem("refresh_token");

            return axios
                .post("http://localhost:5000/refresh", null, {
                    headers: {
                        'Authorization': `Bearer ${refresh_token}`
                    }
                })
                .then((response) => {
                    const { access_token } = response.data;

                    localStorage.setItem("access_token", access_token);

                    originalRequest.headers.Authorization = `Bearer ${access_token}`;

                    return axios(originalRequest);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        }
    }
)

export default api
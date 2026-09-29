class ApiClient {
    constructor() {
        this.baseURL = "http://127.0.0.1:3000/api/v1";
        this.defaultHeaders = {
            "Content-Type" : "application/json",
            Accept: "application/json",
        };
    }
    
    async customFetch(endpoint, options = {}) {
        try{
            
        }
    }
}

const apiClient = new ApiClient();

export default apiClient;
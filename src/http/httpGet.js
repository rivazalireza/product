import apiClient from "./http-common";

const httpGet= async (webApi) => {
    return await apiClient.get(webApi);
}


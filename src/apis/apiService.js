import { decrypt } from "../Helpers/encryption";
import QueryParams from "../Companents/Utilities/QueryParams";

const isAuthenticated = () => {
    return !!localStorage.getItem("authToken");
};
const apiService = async (endpoint, methodType, postData) => {
    let urlString = '';
    try {
        const requestOptions = {
            method: methodType,
            headers: { 'Content-Type': 'application/json' }
        };
        if(methodType != 'get' && methodType != 'head')
        {
            urlString = QueryParams(endpoint)
            requestOptions.body = JSON.stringify(postData)
        }
        else
        {
            urlString = QueryParams(endpoint, postData)
        }
        if(isAuthenticated())
        {
            requestOptions.headers.Authorization = 'Bearer '+ decrypt(localStorage.getItem('authToken'))
        }
        console.log('API call : ' + urlString, requestOptions)
        const response = await fetch(urlString, requestOptions);
        if (!response.ok) {
            throw new Error('There is a server issue. Please try again later.');
        }
        return response.json();
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}
export default apiService
import apiService from "../../apis/apiService";

export const CommonDropdown = async (url) => {
    const response = await apiService(url, "get"),
        temp = [];
    if ((response || {}).success) {
        response.data &&
            Object.entries(response.data).map(([id, name]) => {
                temp.push({ value: id, label: name });
            });
        return temp;
    }
}
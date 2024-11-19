const QueryParams = (url, params) => {
    console.log(import.meta.env.VITE_BASE_API_URL)
    const urlObj = new URL(url, import.meta.env.VITE_BASE_API_URL);
    if(params){
        Object.keys(params).forEach(key => params[key] && urlObj.searchParams.append(key, params[key]));
    }
    return urlObj.toString();
}
export default QueryParams
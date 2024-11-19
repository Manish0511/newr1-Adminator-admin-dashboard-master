const HandleValidation = (errorData, fields, setError) => {
    if(errorData)
    {
        for (let index = 0; index < fields.length; index++) {
            const element = fields[index];
            if(errorData[element] == undefined)
            {
                continue
            }
            (errorData[element]).map((value, key) => {
                console.log(value)
                setError(element, { type: "400", message: value });
            })
        }
    }
}
export default HandleValidation
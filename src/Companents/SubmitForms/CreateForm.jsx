import { memo, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../FormInputs/TextInput"
import ControllerSelect from "../FormInputs/ControllerSelect"
import SwitchInput from "../FormInputs/SwitchInput"
import HandleValidation from "../../Companents/Utilities/HandleValidation";
import AutohideToast from "../../Companents/Utilities/AutohideToast";
import apiService from "../../../src - Copy/apis/apiService";
import { CommonDropdown } from "../Dropdowns/CommonDropdown";
import { ButtonLoader, CtButton } from "../UIs/Headers";

const generateZodSchema = (fields) => {
    const schemaObj = {};
    fields.forEach((field) => {
        if (field.validation) {
            schemaObj[field.name] = field.validation;
        }
    });
    return z.object(schemaObj);
};
const fetchFieldsName = (fields) => {
    const names = [];
    fields && fields.forEach((field) => {
        names.push(field.name);
    });
    return names;
};

const CreateForm = ({formConfig}) => {
    const [isLoading, setIsLoading] = useState(false),
        [showToast, setShowToast] = useState(false),
        [alertType, setAlertType] = useState(""),
        [toastMessage, setToastMessage] = useState(""),
        [companies, setCompanies] = useState([]),
        [details, setDetails] = useState({}),
        zodSchema = generateZodSchema(formConfig.fields),
        fieldsName = fetchFieldsName(formConfig.fields);

    

    const fetchDetails = async () => {
        const response = await apiService(formConfig.fetch_api_url, formConfig.fetch_api_method);
        if(response.data)
        {
            setDetails(response.data)
        }
    };

    useEffect(() => {
        if (formConfig.id) fetchDetails()
    }, [formConfig.id])

    const fetchCompanyOptions = async () => {
        const response = await CommonDropdown(`companies/list/dropdown`);
        setCompanies(response)
    };

    useEffect(()=>{
        fetchCompanyOptions()
        fetchFieldsName()
    },[])
    useEffect(()=>{
        reset(details)
    },[details])

    const {
        control,
        handleSubmit,
        setError,
        reset,
        formState: { isDirty, isValid }
    } = useForm({
        mode: 'onChange',
        resolver: zodResolver(zodSchema),
        defaultValues: details || null
    })

    const onSubmitForm = (data) => {
        setIsLoading(true);
        console.log('submitted data',data);
        const submitUserData = async () => {
            try {
                const response = await apiService(formConfig.api_url, formConfig.api_method, data);
                if ((response || {}).success) {
                    setIsLoading(false);
                    setToastMessage(response.message);
                    setAlertType("success");
                    setShowToast(true);
                } else {
                    HandleValidation(response.data, fieldsName, setError);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log("error", error);
                setToastMessage(error.message);
                setShowToast(true);
                setIsLoading(false);
                setAlertType("danger");
            }
        };
        submitUserData();
    };

    console.log('detailssssssssssss',details)
    return (
        <div className="mT-30">
            <AutohideToast
                show={showToast}
                setShowToast={setShowToast}
                alertType={alertType}
                message={toastMessage}
            />
            <form className='container' id={formConfig.form_name} name={formConfig.form_name} noValidate onSubmit={handleSubmit(onSubmitForm)}>
                <div className="row">
                    {formConfig.fields &&
                        formConfig.fields.map((field, index) => (
                            (
                                field.type == 'text' ? (
                                    <TextInput key={index} control={control} label={field.label} name={field.name} placeholder={field.label} />
                                )
                                :
                                field.type == 'email' ? (
                                    <TextInput key={index} type='email' control={control} label={field.label} name={field.name} placeholder={field.label} />
                                )
                                :
                                field.type == 'password' ? (
                                    <TextInput key={index} type='password' control={control} label={field.label} name={field.name} placeholder={field.label} />
                                )
                                :
                                field.type == 'number' ? (
                                    <TextInput key={index} type='number' control={control} label={field.label} name={field.name} placeholder={field.label} />
                                )
                                :
                                field.type == 'select' ? (
                                    <ControllerSelect key={index} control={control} label={field.label} name={field.name} options={field.options} isMulti={false}/>
                                )
                                :
                                field.type == 'multiselect' ? (
                                    <ControllerSelect key={index} control={control} label={field.label} name={field.name} options={companies} isMulti={true} />
                                )
                                :
                                field.type == 'boolean' && (
                                    <SwitchInput key={index} control={control} label={field.label} name={field.name} />
                                )
                            )
                    ))}
                </div>
                {
                    isLoading ?
                    <ButtonLoader>Loading...</ButtonLoader>
                    :
                    <CtButton disabled={isDirty && !isValid} type="submit">Submit</CtButton>
                }
            </form>
        </div>
    )
}

export default memo(CreateForm)
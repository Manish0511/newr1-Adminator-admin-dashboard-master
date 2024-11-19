import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import apiService from "../../../apis/apiService";
import TextInput from "../../../Companents/FormInputs/TextInput";
import SwitchInput from "../../../Companents/FormInputs/SwitchInput";
import ControllerSelect from "../../../Companents/FormInputs/ControllerSelect";
import { H4Header, H6Header } from "../../../Companents/UIs/Headers";
import HandleValidation from "../../../Companents/Utilities/HandleValidation";
import AutohideToast from "../../../Companents/Utilities/AutohideToast";

const validation = z.object({
    first_name: z.string().min(1, { message: "First name is required"}),
    last_name: z.string(),
    email: z.string().min(1, { message: "Email is required"}).email(),
    username: z.string().min(1, { message: "Username is required"}),
    password: z.string().min(4),
    role: z.string().min(1, { message: "Role is required"}),
    status: z.boolean(),
    phone_number: z.string(),
})

const Create = () => {
    const {
            control,
            register,
            handleSubmit,
            setError,
            formState: { isDirty, isValid }
        } = useForm({
            mode: "onChange",
            resolver: zodResolver(validation)
        }),
        [ companiesList, setCompaniesList ] = useState([]),
        [ isLoading, setIsLoading ] = useState(false),
        [ alertType, setAlertType ] = useState(''),
        [ message, setMessage ] = useState(''),
        [ showToast, setShowToast ] = useState(false),
        [roles, setRoles] = useState([{label:'Company Admin', value:'Company Admin'}, {label:'Admin', value:'Admin'}, {label:'Clerk', value:'Clerk'}]),
        fields = ['phone_number', 'last_name', 'first_name', 'email', 'username', 'password', 'role', 'company']
    
    console.log(companiesList)
    const onSubmitForm = (data) => {
        setIsLoading(true)
        console.log(data)
        const submitUserData = async () => {
            try {
                const response = await apiService(`users`, 'post', data)
                if((response || {}).success)
                {
                    setIsLoading(false)
                    setMessage(response.message)
                    setAlertType('success')
                    setShowToast(true)
                }else
                {
                    HandleValidation(response.data, fields, setError)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log('error',error)
                setMessage(error.message)
                setShowToast(true)
                setIsLoading(false)
                setAlertType('danger')
            }
            
        }
        submitUserData()
    }
    
    const companyDropdown = async () => {
        const response = await apiService(`companies/list/dropdown`, 'get'),
            tempCompanies = []
        if((response || {}).success)
        {
            response.data && Object.entries(response.data).map(([id, name]) => {
                tempCompanies.push({value:id,label:name})
            })
            setCompaniesList(tempCompanies)
            
        }else
        {
            // setServerErrors(response.data)
        }
    }
    useEffect(() => {
        companyDropdown()
    },[])

    return (
        <div className="row">
            <div className="masonry-item col">
                <div className="bgc-white p-20 bd">
                    <H4Header title={'Users'} />
                    <H6Header title={'Add User'} />
                    <div className="mT-30">
                        <AutohideToast showToast={showToast} setShowToast={setShowToast} alertType={alertType} message={message} />
                        <form className={`container ${isDirty ? 'was-validated': '' }`} id="user" noValidate onSubmit={handleSubmit(onSubmitForm)}>
                            <div className="row">
                                <TextInput control={control} label='First Name' name='first_name' placeholder="First name" required={true} />
                                <TextInput control={control} label='Last Name' name='last_name' placeholder="Last name" />
                                <TextInput control={control} label='Username' name='username' placeholder="Username" required={true} />
                                <TextInput type='email' control={control} label='Email' name='email' placeholder="Email" required={true} aria-describedby="emailHelp" />
                                <TextInput type='password' control={control} label='Password' name='password' placeholder="****" required={true} />
                                <TextInput type='number' control={control} label='Phone number' name='phone_number' placeholder="Phone number" />
                                <ControllerSelect control={control} label='Role' name='role' options={roles} />
                                <ControllerSelect control={control} label='Company' name='company' options={companiesList} isMulti={true} defaultValue={[{label:'Jay Brahmani Eng. New 1', value:2}]}/>
                                <SwitchInput control={control} label='Active' name='status' />
                            </div>
                            <button disabled={!isDirty || isLoading} className="btn btn-primary btn-color" type="submit">Submit</button>
                            {isDirty || 'isDirty :'}
                            {isValid || 'isValid'}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Create);
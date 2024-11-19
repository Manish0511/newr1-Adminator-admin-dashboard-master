import { memo } from "react"
import TextInput from "../FormInputs/TextInput"
import ControllerSelect from "../FormInputs/ControllerSelect"
import SwitchInput from "../FormInputs/SwitchInput"

const CreateForm = (control, handleSubmit, fields, onSubmitForm) => {
    const isDirty = true
    return (
        <form className={`container ${isDirty ? 'was-validated': '' }`} id="user" noValidate onSubmit={handleSubmit(onSubmitForm)}>
            <div className="row">
                {fields &&
                    fields.map((field) => {
                        if(field.type == 'text')
                        {
                            <TextInput control={control} label={field.label} name={field.name} placeholder={field.label} required={field.required || false} />
                        }
                    })}
            </div>
            {/* <div className="row">
                <TextInput control={control} label='First Name' name='first_name' placeholder="First name" required={true} />
                <TextInput control={control} label='Last Name' name='last_name' placeholder="Last name" />
                <TextInput control={control} label='Username' name='username' placeholder="Username" required={true} />
                <TextInput type='email' control={control} label='Email' name='email' placeholder="Email" required={true} aria-describedby="emailHelp" />
                <TextInput type='password' control={control} label='Password' name='password' placeholder="****" required={true} />
                <TextInput type='number' control={control} label='Phone number' name='phone_number' placeholder="Phone number" />
                <ControllerSelect control={control} label='Role' name='role' options={roles} />
                <ControllerSelect control={control} label='Company' name='company' options={companiesList} isMulti={true} defaultValue={[{label:'Jay Brahmani Eng. New 1', value:2}]}/>
                <SwitchInput control={control} label='Active' name='status' />
            </div> */}
            <button disabled={!isDirty || isLoading} className="btn btn-primary btn-color" type="submit">Submit</button>
            {/* {isDirty || 'isDirty :'}
            {isValid || 'isValid'} */}
        </form>
    )
}

export default memo(CreateForm)
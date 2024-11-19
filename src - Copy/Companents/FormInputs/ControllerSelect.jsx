import { Controller, useController } from "react-hook-form"
import Select from 'react-select'

const ControllerSelect = ({control, label, name, options, isMulti, defaultValue}) => {
    const { formState:{ errors } } = useController({control, name})

    return (
        <div className="col-12 col-md-6 mb-3">
            <label className="form-label">{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                <Select
                    {...field}
                    options={options}
                    placeholder={"Select a " + label}
                    isClearable
                    isMulti={isMulti}
                    defaultValue={defaultValue}
                    onChange={(option) => field.onChange(option ? option.value : '')}
                    value={options.find(option => option.value === field.value)}
                />
                )}
            />
            {errors[name] &&
                <div className="text-danger">
                    {errors[name].message}
                </div>
            }
        </div>
    )
}
export default ControllerSelect
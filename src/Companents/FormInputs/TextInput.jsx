import { useController } from "react-hook-form"

const TextInput = ({control, label, name, ...inputProps}) => {
    const { formState:{ errors } } = useController({control, name})
    return (
        <div className="col-12 col-md-6 mb-3">
            <label className="form-label" htmlFor={name}>{label}</label>
            <input type={inputProps.type || 'text' } className="form-control"
                id={name} name={name}
                {...control.register(name)}
                {...inputProps}
            />
            {errors[name] &&
                <div className="text-danger">
                    {errors[name].message}
                </div>
            }
        </div>
    )
}
export default TextInput
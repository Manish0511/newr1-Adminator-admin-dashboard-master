import { useController } from "react-hook-form"

const SwitchInput = ({control, label, name, ...inputProps}) => {
    const { formState:{ errors } } = useController({control, name})
    return (
        <div className="col-12 mb-3">
            <div className="form-check form-switch">
                <input type='checkbox' className="form-check-input" role="switch"
                    id={name} name={name}
                    {...control.register(name)}
                    {...inputProps}
                />
                <label className="form-check-label" htmlFor={name}>{label}</label>
                {errors[name] &&
                    <div className="text-danger">
                        {errors[name].message}
                    </div>
                }
            </div>
        </div>
    )
}
export default SwitchInput
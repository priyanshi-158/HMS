import PropTypes from "prop-types";

Input.propTypes = {
    field: PropTypes.shape({
      name: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      req: PropTypes.bool.isRequired,
      type: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string,
      disabled:PropTypes.bool
    }).isRequired,
  };


function Input({ field }) {
    const name = (field.name).charAt(0).toUpperCase() + (field.name).slice(1);
    const placeholder = field.placeholder;
    const required = field.req;
    const type = field.type;
    const value = field.value;
    const disabled=field.disabled;
    return (
        <div>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-white">{name}</label>
            <input type={type} name={name} id={name} disabled={disabled} className={`${disabled?'cursor-not-allowed':''} border sm:text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-600 placeholder-gray-400 text-white focus:ring-[#9F6BA0] focus:border-[#9F6BA0] outline-none`} placeholder={placeholder} required={required} value={value} onChange={field.onChange} />
        </div>
    );
}


export { Input };
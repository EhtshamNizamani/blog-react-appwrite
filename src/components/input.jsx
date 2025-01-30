import React, { forwardRef, useId } from 'react'

const Input = forwardRef(function Input({
    type = "text",
    label,
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div>
            {label && <label className='inline-block mb-1 pl-1'
                htmlFor={id}>
                {label}
            </label>}
            <input type={type} className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full `}
                ref={ref}
                {...props}
                id={id}

            />

        </div>
    )
});

export default Input
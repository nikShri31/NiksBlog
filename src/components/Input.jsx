


import React, { useId } from 'react';

// function Input() {
//     const input = useId()
//   return (
//     <div>input</div>
//   )
// } here we changed our showing method lets learn some new things..

// **IMPORTANT**
// const input = forwardRef( function Input ({},ref) { return(); } )
//const input = forwardRef((...,ref)=>{} )


const Input = React.forwardRef(
    function Input({
        lable,
        type = 'text',
        className = "",
        ...props

    }, ref) {
        const id = useId();

        return (
            <div className='w-full'>
                { lable && <label
                    htmlFor={id}
                    className='inline-block mb-1 pl-1'
                >
                    {lable}
                </label>
                }
                <input type={type}
                    className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full
                             ${className}`}
                    ref={ref}
                    {...props}
                    id={id}
                />
            </div>
        )
    });

export default Input;
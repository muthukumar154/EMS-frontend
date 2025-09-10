import React from 'react'

const Label = ({name}) => {
    return (
        <>
            <label
                className="text-xl font-semibold block mb-3"
            >
                {name}
            </label>
        </>
    )
}

export default Label
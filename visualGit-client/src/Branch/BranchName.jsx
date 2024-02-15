import React from 'react'

const BranchName = (props) => {
    return (
        <>
            <p className={`p-2 border border-solid rounded-md border-purple-900 ${props.isCurrent ? "font-bold bg-purple-900 text-white" : null}`}>{props.name}</p>
        </>
    )
}

export default BranchName
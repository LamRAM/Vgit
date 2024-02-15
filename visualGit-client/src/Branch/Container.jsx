import React from 'react'
import Branches from './Branches'

const Container = (props) => {
    const { refs } = props;

    if (refs.length <= 1 && refs[0] == "") {
        return;
    }

    return (
        <div className='flex flex-col gap-2 justify-center items-center text-center'>
            <Branches refs={refs} defaultBranch={refs[0]} isCurrent={refs[0].includes("HEAD")} />
        </div>
    )
}

export default Container
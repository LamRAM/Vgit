import React, { useState } from 'react'
import BranchName from './BranchName'

const Branches = (props) => {
  const [expand, setExpand] = useState(false);
  const { refs, defaultBranch } = props;
  let defaultBranchName = defaultBranch.includes("HEAD") ? defaultBranch.split(">").slice(-1) : defaultBranch;

  return (defaultBranch &&
    <div className={`flex flex-col gap-2 justify-center items-center text-center`}>
      {(refs.length > 1) && <button title={expand ? 'Close' : 'Expand'} className='w-fit h-fit  p-0 m-0 text-sm bg-transparent self-end' onClick={() => setExpand(!expand)}>...</button>}
      <div className='flex gap-4'>
        {expand ? refs && refs.map((branch, i) => {
          const isHead = branch.includes("HEAD");
          return <BranchName key={i} name={isHead ? branch.split(">").slice(-1) : branch} isCurrent={isHead} />
        }) : <BranchName name={defaultBranchName} isCurrent={props.isCurrent} />
        }
      </div>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker
            id="branch-arrow"
            viewBox="0 0 10 10"
            refX="10"
            refY="5"
            markerWidth="10"
            markerHeight="10"
            orient="auto-start-reverse">
            <path d="M 10 5 L 5 8 M 10 5 L 5 2  z" />
          </marker>
        </defs>
        <line x1="50" y1="50" x2="50" y2="0" stroke="black" strokeWidth={2} markerStart="url(#branch-arrow)" />
      </svg>
    </div>
  )
}

export default Branches;

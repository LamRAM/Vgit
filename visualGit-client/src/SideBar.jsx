import React,{ useState, useEffect } from 'react'

const SideBar = () => {
  const [branchData, setBranchData] = useState();

  useEffect(() => {
    fetch('http://localhost:8888/branch/all').then(res => res.json()).then((data) => setBranchData(data));
  }, []);

  return (
    <div>
      {branchData && <div>
        <p><b>Branches</b></p>
        Local:
        <ul>
          {branchData.local.map((branch, i) => <li key={i} className={`${branchData.current == branch? " text-purple-900 font-bold" : null }`}> {branch} {`(${branchData.branches[branch].commit})`}</li>)}
        </ul>
        remote:
        <ul>
          {/* Search by a branch name, if you did not find a matching branch data then do not get its commit */}
          {branchData.remote.map((branch, i) => <li key={i}> {branch} {branchData.branches[branch]?.commit && `(${branchData.branches[branch].commit})`}</li>)}
        </ul>
      </div>}
    </div>
  )
}

export default SideBar
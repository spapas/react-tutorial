import React from 'react'

export default ({isLoading}) => <div>
    {isLoading?<div className="loading">Loading&#8230;</div>:null}
</div>

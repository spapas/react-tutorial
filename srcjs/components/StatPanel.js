import React from 'react';


export default ({bookLength, authorLength}) => <div className="row">
    <div className="one-half column">
        Books number: {bookLength}
    </div>
    <div className="one-half column">
        Authors number: {authorLength}
    </div>
</div>

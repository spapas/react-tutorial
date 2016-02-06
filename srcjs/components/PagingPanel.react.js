import React from 'react';

export default ({page=1, page_size=5, count, onNextPage, onPreviousPage, ...props}) => {
    let total_pages = Math.ceil(count / page_size);
    
    return(
        <div className="row">
            {page==1?'':<button onClick={e => {
                e.preventDefault();
                onPreviousPage();
            }}>&lt;</button>}
            &nbsp; Page {page} of {total_pages} &nbsp; 
            {page==total_pages?'':<button onClick={e => {
                e.preventDefault();
                onNextPage();
            }}>&gt;</button>}
        </div>
    )
}



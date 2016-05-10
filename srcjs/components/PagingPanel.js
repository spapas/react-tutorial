import React from 'react';

export default ({page=1, page_size=5, count, onNextPage, onPreviousPage, ...props}) => {
    const total_pages = Math.ceil(count / page_size);
    
    return <div className="row">
		{page==1?null:<button onClick={e => {
			e.preventDefault();
			onPreviousPage();
		}}>&lt;</button>}
		&nbsp; Page {page} of {total_pages} &nbsp; 
		{page==total_pages?null:<button onClick={e => {
			e.preventDefault();
			onNextPage();
		}}>&gt;</button>}
	</div>
}


const FunctionalPagingPanel = ({page=1, page_size=5, count, onNextPage, onPreviousPage, ...props}) => ( 
    total_pages => <div className="row">
        {page==1?null:<button onClick={e => {
            e.preventDefault();
            onPreviousPage();
        }}>&lt;</button>}
        &nbsp; Page {page} of {total_pages} &nbsp; 
        {page==total_pages?null:<button onClick={e => {
            e.preventDefault();
            onNextPage();
        }}>&gt;</button>}
    </div>
)(Math.ceil(count / page_size))
    

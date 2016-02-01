import React from 'react'
import { connect } from 'react-redux'
import Table from './Table.react'
import { loadBooks, changePage, toggleSorting } from '../actions'
import PagingPanel from './PagingPanel.react'
import { Link } from 'react-router'


class BookPanel extends React.Component {
    render() {
        let { dispatch } = this.props;
        let { rows, count, page, sorting } = this.props.books;
        let { isLoading } = this.props.ui;
        
        const sort_method = key => () => {
            dispatch(toggleSorting(key))
            dispatch(loadBooks())
        }
        
        const cols = [
        {
            key: 'id', 
            label: 'ID', 
            format: x=><Link to={`/book_update/${x.id}/`}>{x.id}</Link>, 
            sorting: sort_method('id')
        },
        {key: 'title', label: 'Title', sorting: sort_method('title')},
        {key: 'category_name', label: 'Category', sorting: sort_method('subcategory__name')},
        {key: 'publish_date', label: 'Publish date', sorting: sort_method('publish_date')},
        {key: 'author_name', label: 'Author', sorting: sort_method('author__last_name')},
        ]
        
        return <div>
            <div className="row">
                {isLoading?<div className="loading">Loading&#8230;</div>:null}
                <div className="twelve columns">
                    <h3>Book list <Link className='button' to="/book_create/">+</Link></h3>
                    {isLoading?"...":<Table sorting={sorting} cols={cols} rows={rows} />}
                </div>
            </div>
            <PagingPanel count={count} page={page} onNextPage={() => {
                dispatch(changePage(page+1));
                dispatch(loadBooks())
            }} onPreviousPage={ () => {
                dispatch(changePage(page-1));
                dispatch(loadBooks())
            }} />
        </div>
        
    }
    
    componentDidMount() {
        if(this.props.books.rows.length==0) {
            this.props.dispatch(loadBooks());
        }
    }
}

var mapStateToProps = function(state) {
    return {
        books:state.books,
        ui:state.ui,
    } 
};

export default connect(mapStateToProps)(BookPanel);

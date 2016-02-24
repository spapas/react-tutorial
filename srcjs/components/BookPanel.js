import React from 'react'
import { connect } from 'react-redux'
import Table from './Table'
import { loadBooks, changePage, toggleSortingAndLoadBooks, changeSearchAndLoadBooks } from '../actions'
import PagingPanel from './PagingPanel'
import BookSearchPanel from './BookSearchPanel'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'

const getCols = sort_method => [
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

class BookPanel extends React.Component {
    render() {
        let { rows, count, page, sorting, search } = this.props.books;
	    let { loadBooks, changePage, toggleSortingAndLoadBooks, changeSearchAndLoadBooks  } = this.props;
        
        const onSearchChanged = query => {
            changeSearchAndLoadBooks(query)
        }
        
        const sort_method = key => () => {
            toggleSortingAndLoadBooks(key)
        }

        const cols = getCols(sort_method)

        return <div>
            <BookSearchPanel search={search} onSearchChanged={onSearchChanged} />
            <div className="row">
                <div className="twelve columns">
                    <h3>Book list <Link className='button button-primary' style={{fontSize:'1em'}} to="/book_create/">+</Link></h3>
                    <Table sorting={sorting} cols={cols} rows={rows} />
                </div>
            </div>
            <PagingPanel count={count} page={page} onNextPage={() => {
                changePage(page+1);
                loadBooks()
            }} onPreviousPage={ () => {
                changePage(page-1);
                loadBooks()
            }} />
        </div>
    }
}

const mapStateToProps = state => ({
	books:state.books,
})

const mapDispatchToProps = dispatch => bindActionCreators({ 
	loadBooks, changePage, toggleSortingAndLoadBooks, changeSearchAndLoadBooks 
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BookPanel);

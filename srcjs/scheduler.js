import store from './store'
import {loadAuthors, showSuccessNotification} from './actions';


export default () => {
    console.log("Starting scheduler")
    window.setInterval( () => {
        
        let url = 'http://127.0.0.1:8000/api/authors/get_author_number/';
        $.get(url, realAuthorNumber => {
            let authorNumber = store.getState().authors.rows.length;
            if(authorNumber!=realAuthorNumber) {
                store.dispatch(showSuccessNotification("Authors have changed - reloading ..."));
                store.dispatch(loadAuthors());
            }
        });
        
    }, 2000);
};



export const formatUrl = (state) => {
    let { search, sorting } = state;
    let u = ''
    if( search || sorting) {
        u += '?'
        if(search) {
            u+=`search=${state.search}&`
        }
        if(sorting) {
            u+=`sorting=${state.sorting}`
        }
    }
    
    return u;
}
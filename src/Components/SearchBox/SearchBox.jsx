const SearchBox = (props) => {
    return (
        <div className="col col-sm-4">
            <input 
            className="form-control"
            value={props.value} placeholder="Search for a movie..." onChange={(e) => props.setSearchMovieValue(e.target.value)} />
        </div>
    )
}

export default SearchBox;
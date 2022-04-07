import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import MovieTable from "./moviesTable";
import _ from "lodash";
class Movies extends Component {
	state = {
		movies: [],
		currentPage: 1,
		pageSize: 4,
		genres: [],
		sortcolumn: { path: "title", order: "asc" },
	};
	componentDidMount() {
		const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
		this.setState({ movies: getMovies(), genres });
	}

	handelDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies: movies });
	};

	handelLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handelPageChange = (page) => {
		this.setState({ currentPage: page });
	};
	handelGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};
	handelSort = (sortcolumn) => {
		this.setState({ sortcolumn });
	};
	getPagedData = () => {
		const {
			pageSize,
			currentPage,
			selectedGenre,
			movies: allMovies,
			sortcolumn,
		} = this.state;
		const filtered =
			selectedGenre && selectedGenre._id
				? allMovies.filter((m) => m.genre._id === selectedGenre._id)
				: allMovies;
		const sorted = _.orderBy(filtered, [sortcolumn.path], [sortcolumn.order]);
		const movies = paginate(sorted, currentPage, pageSize);
		return { totalCount: filtered.length, data: movies };
	};
	render() {
		const { length: count } = this.state.movies;
		const { pageSize, currentPage, sortcolumn } = this.state;
		if (count === 0) return <p>There is no movies in the dataBase!</p>;
		const { totalCount, data: movies } = this.getPagedData();
		return (
			<div className="row">
				<div className="col-3">
					<ListGroup
						items={this.state.genres}
						selectedItem={this.state.selectedGenre}
						onItemSelect={this.handelGenreSelect}
					></ListGroup>
				</div>
				<div className="col">
					<p>showing {totalCount} movies in dataBase.</p>
					<MovieTable
						movies={movies}
						sortcolumn={sortcolumn}
						onLike={this.handelLike}
						onDelete={this.handelDelete}
						onSort={this.handelSort}
					></MovieTable>
					<Pagination
						itscount={totalCount}
						currentPage={currentPage}
						pageSize={pageSize}
						onPageChange={this.handelPageChange}
					></Pagination>
				</div>
			</div>
		);
	}
}

export default Movies;

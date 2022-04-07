import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { paginate } from "../../utils/paginate";
const Pagination = ({ itscount, pageSize, currentPage, onPageChange }) => {
	console.log(currentPage);
	const pageCount = Math.ceil(itscount / pageSize);
	if (pageCount === 1) return null;
	const pages = _.range(1, pageCount + 1);
	return (
		<nav>
			<ul className="pagination">
				{pages.map((page) => (
					<li
						key={page}
						className={page === currentPage ? "page-item active" : "page"}
					>
						<a className="page-link" onClick={() => onPageChange(page)}>
							{page}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};
Pagination.propTypes = {
	itscount: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
};

export default Pagination;

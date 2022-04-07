import React, { Component } from "react";
class TableHeader extends Component {
	raiseSort = (path) => {
		const sortcolumn = { ...this.props.sortcolumn };
		if (sortcolumn.path === path)
			sortcolumn.order = sortcolumn.order === "asc" ? "desc" : "asc";
		else {
			sortcolumn.path = path;
			sortcolumn.order = "asc";
		}
		this.props.onSort(sortcolumn);
	};
	renderSortIcon = (column) => {
		const { sortcolumn } = this.props;
		if (column.path !== sortcolumn.path) return null;
		if (sortcolumn.order === "asc")
			return <i class="fa fa-sort-asc" aria-hidden="true"></i>;
		else return <i class="fa fa-sort-desc" aria-hidden="true"></i>;
	};

	render() {
		return (
			<thead>
				<tr>
					{this.props.columns.map((column) => (
						<th
							className="clickable"
							key={column.path || column.key}
							onClick={() => this.raiseSort(column.path)}
						>
							{column.label}
							{this.renderSortIcon(column)}
						</th>
					))}
				</tr>
			</thead>
		);
	}
}

export default TableHeader;

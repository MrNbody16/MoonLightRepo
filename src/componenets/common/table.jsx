import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
const Table = ({ columns, sortcolumn, onSort, data }) => {
	return (
		<table className="table">
			<TableHeader
				columns={columns}
				sortcolumn={sortcolumn}
				onSort={onSort}
			></TableHeader>

			<TableBody data={data} columns={columns}></TableBody>
		</table>
	);
};

export default Table;

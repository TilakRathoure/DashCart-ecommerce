import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import {
  Column,
  usePagination,
  useSortBy,
  useTable,
  TableOptions,
} from "react-table";

function TableHOC<T extends object>(
  columns: Column<T>[],
  data: T[],
  containerClassname: string,
  heading: string,
  showPagination: boolean = false
) {
  return function HOC() {
    const options: TableOptions<T> = {
      columns,
      data,
      initialState: {
        pageSize: 6,
      },
    };

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      nextPage,
      pageCount,
      state: { pageIndex },
      previousPage,
      canNextPage,
      canPreviousPage,
    } = useTable(options, useSortBy, usePagination);

    return (
      <div
        className={`${containerClassname} admin-card h-full w-full overflow-auto p-5 text-admin-text`}
      >
        <h2 className="mb-7 text-center text-2xl uppercase tracking-wide text-admin-text">
          {heading}
        </h2>

        <table className="table w-full" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                className="border-b border-admin-line"
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    className="px-3 py-3 text-center text-sm font-medium text-admin-muted"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    {column.isSorted && (
                      <span className="ml-1 inline-flex align-middle">
                        {column.isSortedDesc ? (
                          <AiOutlineSortDescending />
                        ) : (
                          <AiOutlineSortAscending />
                        )}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);

              return (
                <tr
                  className="border-b border-admin-line/60 transition-colors hover:bg-admin-elevated/40"
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => (
                    <td
                      className="p-3 text-center text-sm text-admin-text"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        {showPagination && (
          <div className="mt-5 flex w-full items-center justify-center gap-3">
            <button
              className="admin-btn-ghost px-3 py-1.5 text-sm"
              disabled={!canPreviousPage}
              onClick={previousPage}
            >
              Prev
            </button>
            <span className="text-sm text-admin-muted">{`${pageIndex + 1} of ${pageCount}`}</span>
            <button
              className="admin-btn-ghost px-3 py-1.5 text-sm"
              disabled={!canNextPage}
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };
}

export default TableHOC;

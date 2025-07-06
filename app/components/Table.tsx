"use client"

import React, { CSSProperties, useCallback, useMemo, useState } from "react"
import { FaChevronLeft, FaChevronRight, FaSort, FaSortDown, FaSortUp, FaSync } from "react-icons/fa"

type TableProps = {
  columns: columnType[],
  rows: any[],
  paginator?: boolean,
  pagination?: number,
  loading?: boolean,
  style?: CSSProperties,
}

export type columnType = {
  title: string,
  data?: any,
  style?: CSSProperties,
  command?: (row: any) => void,
  render?: (row: any) => React.ReactNode,
  sortable?: boolean
}

type sortConfigType = {
  key: string,
  direction: string
}

const Table: React.FC<TableProps> = ({columns, rows, paginator=true, pagination=paginator?15:0, loading=false, style}) => {

  const [sortConfig, setSortConfig] = useState<sortConfigType>({ key: "", direction: "asc" })
  const [page, setPage] = useState(1)

  const handleSort = (column: string) => {
    let direction = "asc"
    let key = column
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    if (sortConfig.key === key && sortConfig.direction === "desc") {
      key = ""
    }
    setSortConfig({ key, direction })
  }

  const sortedRows = useCallback(() => {
    const sortableData = [...rows]
    if (!!sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
      })
    }
    return sortableData
  }, [rows, sortConfig])

  const pageRows = useMemo(() => {
    return pagination ? sortedRows().slice((page-1)*pagination, page*pagination) : sortedRows()
  }, [page, pagination, sortedRows])

  return (
    <>
    <div className="border border-slate-200 shadow rounded" style={style}>
      <table className="w-full">
        <thead>
          <tr>
            {
              columns.map((column, index) => (
                <th className="bg-slate-200 px-2 py-1" key={index}>
                  <button onClick={() => column.sortable ? handleSort(column.data) : undefined}
                  className={"flex items-center " + (column.sortable && "hover:text-cyan-700")}>
                  {column.title}
                  {
                    column.sortable ?
                    sortConfig.key === column.data ?
                    sortConfig.direction === "asc" ?
                    <FaSortUp className="ms-1" />
                    :
                    <FaSortDown className="ms-1" />
                    : <FaSort className="text-slate-500 ms-1" />
                    : ""
                  }
                  </button>
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            loading ?
            <tr>
              <td className="border py-4" colSpan={columns.length}>
                <FaSync style={{ animation: "spin 1s infinite linear", margin: "auto" }} size={25} />
              </td>
          </tr>
            :
            rows.length ?
            pageRows.map((row, index) => (
              <tr key={index} className={index % 2 ? "bg-slate-100" : "bg-slate-50"}>
                {columns.map((column: columnType, index) => (
                  <td key={index} className="px-2 py-1" style={column.style}>
                    { column.render ? column.render(row) : column.command ? column.command(row) : row[column.data] }
                  </td>
                ))}
              </tr>
            ))
            :
            <tr>
              <td className="text-center py-4" colSpan={columns.length}>NO DATA</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
    <div className={"flex justify-center items-center mt-4 "+(!paginator && 'hidden')}>
      <button className="bg-slate-300 size-10 rounded-full hover:bg-slate-400 disabled:bg-slate-100 disabled:text-slate-500"
      onClick={() => setPage(pv => pv-1)} disabled={page <= 1}>
        <FaChevronLeft className="m-auto" />
      </button>
      <div className="w-16 text-slate-700 text-center">{page} / {Math.ceil(rows.length/pagination)}</div>
      <button className="bg-slate-300 size-10 rounded-full hover:bg-slate-400 disabled:bg-slate-100 disabled:text-slate-500"
      onClick={() => setPage(pv => pv+1)} disabled={page >= Math.ceil(rows.length/pagination) }>
        <FaChevronRight className="m-auto" />
      </button>
    </div>
    </>
  )
}

export default Table
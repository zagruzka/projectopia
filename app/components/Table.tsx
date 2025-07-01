"use client"

import React, { CSSProperties, useCallback, useMemo, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaSortDown, FaSortUp, FaSync } from 'react-icons/fa'

type TableProps = {
  columns: columnType[],
  rows: any[],
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

const Table: React.FC<TableProps> = ({columns, rows, pagination=15, loading=false, style}) => {

  const [sortConfig, setSortConfig] = useState<sortConfigType>({ key: '', direction: 'asc' })
  const [page, setPage] = useState(1)

  const handleSort = (key: string) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const sortedRows = useCallback(() => {
    const sortableData = [...rows]
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    return sortableData
  }, [rows, sortConfig])

  const pageRows = useMemo(() => {
    return sortedRows().slice((page-1)*pagination, page*pagination)
  }, [page, pagination, sortedRows])

  return (
    <>
    <table className='w-full' style={style}>
      <thead>
        <tr>
          {
            columns.map((column, index) => (
              <th className='border px-2 py-1' key={index} onClick={() => column.sortable ? handleSort(column.data) : undefined}>
                <span className={'flex items-center ' + (column.sortable && 'cursor-pointer hover:text-cyan-700')}>
                {column.title}
                {
                  sortConfig.key === column.data ? sortConfig.direction === 'asc'
                  ? <FaSortUp className='ms-1' />
                  : <FaSortDown className='ms-1' />
                  : ''
                }
                </span>
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          loading ?
          <tr>
            <td className='border py-4' colSpan={columns.length}>
              <FaSync style={{ animation: 'spin 1s infinite linear', margin: 'auto' }} size={25} />
            </td>
        </tr>
          :
          rows.length ?
          pageRows.map((row, index) => (
            <tr key={index} className={index % 2 ? '' : 'bg-slate-600'}>
              {columns.map((column: columnType, index) => (
                <td key={index} className='border px-2 py-1' style={column.style}>
                  { column.render ? column.render(row) : column.command ? column.command(row) : row[column.data] }
                </td>
              ))}
            </tr>
          ))
          :
          <tr>
            <td className='border text-center py-4' colSpan={columns.length}>NO DATA</td>
          </tr>
        }
      </tbody>
    </table>
    <div className='flex justify-center mt-4'>
      <button className='bg-slate-500 size-10 rounded-full hover:opacity-90 disabled:!opacity-50' onClick={() => setPage(pv => pv-1)} disabled={page <= 1}><FaChevronLeft /></button>
      <div className='w-16 text-center'>{page} / {Math.ceil(rows.length/pagination)}</div>
      <button className='bg-slate-500 size-10 rounded-full hover:opacity-90 disabled:!opacity-50' onClick={() => setPage(pv => pv+1)} disabled={page >= Math.ceil(rows.length/pagination) }><FaChevronRight /></button>
    </div>
    </>
  )
}

export default Table
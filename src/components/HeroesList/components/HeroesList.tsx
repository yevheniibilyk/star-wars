import React, { useEffect, useState } from 'react';
import _get from 'lodash.get';
import { DataGrid, GridCellParams, GridColDef, GridSortModel } from '@material-ui/data-grid';
import _orderBy from 'lodash.orderby';
import { Link } from 'react-router-dom';
import type { Hero } from '../../../types/Hero';
import '../styles/_heroes-list.scss';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { getHeroesPage } from '../../../store/actionCreators';
import { AppState, Pagination } from '../../../store/type';

const ITEMS_PER_PAGE = 10;
const columns: GridColDef[] = [
  { field: 'id',
    headerName: 'ID',
    width: 80,
    disableColumnMenu: true,
    sortable: false
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 2,
    disableColumnMenu: true,
    // eslint-disable-next-line react/display-name
    renderCell: (params: GridCellParams) => (
      <Link
        className="heroes-list__name"
        to={`/hero/${params.id}`}
      >
        {params.formattedValue}
      </Link>
    )
  },
  {
    field: 'gender',
    headerName: 'Gender',
    flex: 1,
    disableColumnMenu: true,
    sortable: false
  },
  {
    field: 'height',
    headerName: 'Height',
    flex: 1,
    disableColumnMenu: true,
    sortable: false
  },
  {
    field: 'mass',
    headerName: 'Mass',
    flex: 1,
    disableColumnMenu: true,
    sortable: false
  },
  {
    field: 'birth_year',
    headerName: 'Birth Year',
    flex: 1,
    disableColumnMenu: true
  }
];

function getSortedRows({ pagination, currentPage, sortModel }: {
  pagination: Pagination,
  currentPage: number,
  sortModel: GridSortModel }
) {
  const { pages } = pagination;

  const allHeroes = Object.keys(pages).reduce((allList: Array<Hero>, key: string) => {
    const heroes: Array<Hero> = _get(pages, key, []);

    return [...allList, ...heroes];
  }, []);

  const sortedHeroes = _orderBy(allHeroes, sortModel[0].field, sortModel[0].sort || false);

  const startIndex = currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  return sortedHeroes.slice(startIndex, endIndex);
}

function HeroesList() {
  const pagination: Pagination = useSelector((state: AppState) => state.pagination);
  const { pages, total, loading } = pagination;

  const dispatch: Dispatch<any> = useDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  const heroesList: Array<Hero> = _get(pages, currentPage, []);

  useEffect(() => {
    dispatch(getHeroesPage(currentPage));
  }, [dispatch, currentPage]);

  const pageItems = sortModel && sortModel.length
    ? getSortedRows({ pagination, currentPage, sortModel })
    : heroesList;

  return (
    <div className="heroes-list">
      <DataGrid
        rows={pageItems}
        columns={columns}
        pagination
        pageSize={ITEMS_PER_PAGE}
        rowCount={total}
        paginationMode="server"
        onPageChange={(newPage) => setCurrentPage(newPage + 1)}
        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        rowsPerPageOptions={[ITEMS_PER_PAGE]}
        loading={loading}
        disableSelectionOnClick
      />
    </div>
  );
}

export default HeroesList;

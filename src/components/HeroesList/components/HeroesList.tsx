import React, { Component } from 'react';
import { DataGrid, GridCellParams, GridColDef, GridSortModel } from '@material-ui/data-grid';
import _uniq from 'lodash.uniq';
import _orderBy from 'lodash.orderby';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import { axios } from '../../../utils';
import type { Hero } from '../../../types/Hero';
import getHeroIdFromUrl from '../utils/getHeroIdFromUrl';
import '../styles/_heroes-list.scss';

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

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type HeroesListProps = any;

type HeroesListState = {
  fetchedPages: Array<number>;
  heroesList: Array<Hero>;
  currentPage: number;
  heroesTotal: number;
  loading: boolean;
  sortModel: GridSortModel;
  error: string;
};

class HeroesList extends Component<HeroesListProps, HeroesListState> {
  constructor(props: HeroesListProps) {
    super(props);

    this.state = {
      fetchedPages: [],
      heroesList: [],
      currentPage: 1,
      heroesTotal: 0,
      loading: false,
      sortModel: [],
      error: ''
    }
  }

  componentDidMount() {
    this.searchHeroes();
  }

  onPageChange = async (page = 1) => {
    const { fetchedPages } = this.state;

    if (!fetchedPages.includes(page)) {
      await this.searchHeroes(page);
    }

    this.setState({ currentPage: page });
  }

  searchHeroes = async (page = 1) => {

    try {
      this.setState({ loading: true });

      const { data: { count, results = [] } }: any = await axios.get(`/heroes?page=${page}`);

      this.setState(({ fetchedPages, heroesList }) => ({
        heroesList: [
          ...heroesList,
          ...results.map((item: Hero) => ({
            ...item,
            id: getHeroIdFromUrl(item.url)
          }))
        ],
        heroesTotal: count,
        currentPage: page,
        fetchedPages: _uniq([...fetchedPages, page])
      }));
    } catch (e) {
      this.setState({ error: e.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  closeError = () => {
    this.setState({ error: '' });
  }

  sortRows = (heroesList: Array<Hero>) => {
    const { sortModel } = this.state;

    if (!sortModel || !sortModel.length) {
      return heroesList;
    }

    return _orderBy(heroesList, sortModel[0].field, sortModel[0].sort || false);
  }

  getPaginatedData = () => {
    const { currentPage, heroesList } = this.state;

    const startIndex = currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return this.sortRows(heroesList).slice(startIndex, endIndex);
  }

  onSortModelChange = (newModel: GridSortModel) => {
    this.setState({ sortModel: newModel });
  };

  render() {
    const { heroesTotal, loading, error, sortModel } = this.state;

    return (
      <div className="heroes-list">
        <DataGrid
          rows={this.getPaginatedData()}
          columns={columns}
          pagination
          pageSize={ITEMS_PER_PAGE}
          rowCount={heroesTotal}
          paginationMode="server"
          onPageChange={(newPage) => this.onPageChange(newPage + 1)}
          sortingMode="server"
          sortModel={sortModel}
          onSortModelChange={this.onSortModelChange}
          rowsPerPageOptions={[ITEMS_PER_PAGE]}
          loading={loading}
          disableSelectionOnClick
        />
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={this.closeError}
        >
          <Alert onClose={this.closeError} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default HeroesList;

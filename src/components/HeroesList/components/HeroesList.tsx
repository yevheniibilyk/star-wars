import React, { Component } from 'react';
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid';
import { axios } from '../../../utils';
import type { Hero } from '../../../types/Hero';
import getHeroIdFromUrl from '../utils/getHeroIdFromUrl';
import { Link } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import '../styles/_heroes-list.scss';

const columns: GridColDef[] = [
  { field: 'id',
    headerName: 'ID',
    width: 80,
    disableColumnMenu: true
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
    disableColumnMenu: true
  },
  {
    field: 'height',
    headerName: 'Height',
    flex: 1,
    disableColumnMenu: true
  },
  {
    field: 'mass',
    headerName: 'Mass',
    flex: 1,
    disableColumnMenu: true
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
  heroesList: Array<Hero>;
  currentPage: number;
  heroesTotal: number;
  loading: boolean;
  error: string;
};

class HeroesList extends Component<HeroesListProps, HeroesListState> {
  constructor(props: HeroesListProps) {
    super(props);

    this.state = {
      heroesList: [],
      currentPage: 1,
      heroesTotal: 0,
      loading: false,
      error: ''
    }
  }

  componentDidMount() {
    this.searchHeroes();
  }
  
  searchHeroes = async (page = 1) => {
    try {
      this.setState({ loading: true });

      const { data: { count, results = [] } }: any = await axios.get(`/heroes?page=${page}`);

      this.setState({
        heroesList: results.map((item: Hero) => ({
          ...item,
          id: getHeroIdFromUrl(item.url)
        })),
        heroesTotal: count,
        currentPage: page
      });
    } catch (e) {
      this.setState({ error: e.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  closeError = () => {
    this.setState({ error: '' });
  }

  render() {
    const { heroesList, heroesTotal, loading, error } = this.state;

    return (
      <div className="heroes-list">
        <DataGrid
          rows={heroesList}
          columns={columns}
          pagination
          pageSize={10}
          rowCount={heroesTotal}
          paginationMode="server"
          onPageChange={(newPage) => this.searchHeroes(newPage + 1)}
          rowsPerPageOptions={[10]}
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

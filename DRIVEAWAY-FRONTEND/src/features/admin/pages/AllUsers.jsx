import React, { useEffect, useMemo, useState } from 'react';
import { getAllUsers } from '../services';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TablePagination,
  TableFooter,
  Box,
  Typography,
  Alert,
  Stack,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material';
import { toast } from 'sonner';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => onPageChange(event, 0);
  const handleBackButtonClick = (event) => onPageChange(event, page - 1);
  const handleNextButtonClick = (event) => onPageChange(event, page + 1);
  const handleLastPageButtonClick = (event) =>
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));

  return (
    <Box sx={{ flexShrink: 0, ml: 1.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function AllUsers() {
  const [usersList, setUsersList] = useState([]);
  const [error, setError] = useState('');
  const [role, setRole] = useState('CUSTOMER');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredUsers = useMemo(() => usersList.filter((user) => user.role === role), [usersList, role]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;

  const paginatedUsers =
    rowsPerPage > 0
      ? filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : filteredUsers;

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const getUserList = async () => {
      try {
        const { data } = await getAllUsers();
        if (Array.isArray(data)) {
          setUsersList(data);
        } else {
          setError('Unexpected response while loading users.');
          setUsersList([]);
        }
      } catch (err) {
        const message = err?.response?.data?.message || err?.message || 'Failed to load users.';
        setError(message);
        toast.error(message);
      }
    };

    getUserList();
  }, []);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography variant="h5">User Directory</Typography>
          <Typography variant="body2" color="text.secondary">
            View and filter registered users by role.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button
            variant={role === 'CUSTOMER' ? 'contained' : 'outlined'}
            onClick={() => {
              setRole('CUSTOMER');
              setPage(0);
            }}
          >
            Customers
          </Button>
          <Button
            variant={role === 'DEALER' ? 'contained' : 'outlined'}
            onClick={() => {
              setRole('DEALER');
              setPage(0);
            }}
          >
            Dealers
          </Button>
        </Stack>
      </Stack>

      {error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : null}

      <TableContainer component={Paper} sx={{ borderRadius: 3, overflowX: 'auto' }}>
        <Table sx={{ minWidth: { xs: 420, sm: 650 } }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                S.No
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user, ind) => (
              <TableRow key={user.id || ind} hover>
                <TableCell align="center">{page * rowsPerPage + ind + 1}</TableCell>
                <TableCell>{user.userName || 'N/A'}</TableCell>
                <TableCell>{user.userPhone || 'N/A'}</TableCell>
                <TableCell>{user.userEmail || 'N/A'}</TableCell>
              </TableRow>
            ))}

            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No users found for {role.toLowerCase()} role.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : null}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 20, 40, { label: 'All', value: -1 }]}
                colSpan={4}
                count={filteredUsers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AllUsers;

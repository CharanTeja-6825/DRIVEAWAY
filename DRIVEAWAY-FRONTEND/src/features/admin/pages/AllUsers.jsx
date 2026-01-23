import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../services';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TablePagination, TableFooter, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes from "prop-types";
import { useTheme } from '@mui/material';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
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
    const [error, setError] = useState("");
    const [role, setRole] = useState("CUSTOMER");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const filteredUsers = usersList.filter(user => user.role === role);

    const emptyRows =
        page > 0
            ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length)
            : 0;



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedUsers =
        rowsPerPage > 0
            ? filteredUsers.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            )
            : filteredUsers;



    useEffect(() => {
        const getUserList = async () => {
            try {
                const { data } = await getAllUsers();
                if (data) setUsersList(data);
            } catch (err) {
                setError(err?.data?.message);
            }
        }
        getUserList();
    }, [])


    return (
        <>
            <div className='flex gap-3 p-4'>
                <Button
                    variant="contained"
                    onClick={() => {
                        setRole("CUSTOMER");
                        setPage(0);
                    }}
                >
                    Customers
                </Button>

                <Button
                    variant="contained"
                    onClick={() => {
                        setRole("DEALER");
                        setPage(0);
                    }}
                >
                    Dealers
                </Button>

            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell className="px-4 py-2 text-center">S.No</TableCell>
                            <TableCell className="px-4 py-2 text-left">Name</TableCell>
                            <TableCell className="px-4 py-2 text-left">Phone</TableCell>
                            <TableCell className="px-4 py-2 text-left">Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedUsers.map((user, ind) => (
                            <TableRow key={ind}>
                                <TableCell align="center">
                                    {page * rowsPerPage + ind + 1}
                                </TableCell>
                                <TableCell>{user.userName}</TableCell>
                                <TableCell>{user.userPhone}</TableCell>
                                <TableCell>{user.userEmail}</TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[15, 25, 40, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={usersList.length}
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
        </>
    )
}
export default AllUsers;
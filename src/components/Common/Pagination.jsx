import { Pagination as MuiPagination, Stack } from '@mui/material';

const Pagination = ({ page, totalPages, onChange }) => {
    return (
        <Stack alignItems="center">
            <MuiPagination
                count={totalPages}
                page={page}
                onChange={(_, value) => onChange(value)}
                color="primary"
            />
        </Stack>
    );
};

export default Pagination;

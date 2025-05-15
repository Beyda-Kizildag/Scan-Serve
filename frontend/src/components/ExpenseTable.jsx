// Gider Tablosu
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const expenses = [
    { kategori: 'Kira', tutar: '₺1500' },
    { kategori: 'Elektrik', tutar: '₺400' },
    { kategori: 'Su', tutar: '₺300' },
    { kategori: 'Doğalgaz', tutar: '₺1000' },
];

const ExpenseTable = () => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>Kategori</TableCell>
                <TableCell>Tutar</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {expenses.map((row, idx) => (
                <TableRow key={idx}>
                    <TableCell>{row.kategori}</TableCell>
                    <TableCell>{row.tutar}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

export default ExpenseTable;

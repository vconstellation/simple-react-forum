import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from './AxiosAPI';
import { Link } from 'react-router-dom';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const Categories = () => {

    const [categories, setCategories] = useState(null);

    let id = useParams();

    useEffect(() => {
        try {
            axiosInstance.get('/api/forum/').then((res) => {
                const data = res.data;
                setCategories(data);
            })
        } catch (e) {
            throw e;
        }
    }, [])

    return (
        <div>
            <Container maxWidth='lg' style={{ backgroundColor: '#cfe8fc'}}>
            
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell># of threads</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {categories && categories.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell component='th' scope='row'>
                                    <Link to={`/threads/${item.id}`} key={item.id}>{ item.category_name } </Link>
                                </TableCell>
                                <TableCell component='th' scope='row'>{ item.threads_count }</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                
            </Container>
            
        </div>
    )
}

export default Categories;
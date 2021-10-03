import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from './AxiosAPI';
import { Link } from 'react-router-dom';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const Categories = () => {

    // styles block

    const catStyles = {
        backgroundColor: '#E1E6F0',
        marginTop: '50px',
        paddingTop: '15px',
        paddingBottom: '15px',
    }

    const tabStyles = {
        backgroundColor: '#CFD8E7',
        
    }

    const fontStyle = {
        color: 'black',
    }



    // end of block

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
            <Container maxWidth='lg' style={catStyles}>
                
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={fontStyle}>Category</TableCell>
                                <TableCell style={fontStyle}># of threads</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {categories && categories.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell component='th' scope='row'>
                                    <Link to={`/threads/${item.id}`} key={item.id} style={fontStyle}>{ item.category_name } </Link>
                                </TableCell>
                                <TableCell component='th' scope='row' style={fontStyle}>{ item.threads_count }</TableCell>
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
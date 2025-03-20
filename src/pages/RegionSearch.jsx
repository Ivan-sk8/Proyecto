import React, { useState } from 'react';
import {
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
    Snackbar,
    AppBar,
    Toolbar,
    Grid2,
    CircularProgress,
    CardMedia,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledButton = styled(Button)({
    backgroundColor: '#e60023', // Color de Pinterest
    color: 'white',
    '&:hover': {
        backgroundColor: '#c7001a', // Color más oscuro
    },
});

const StyledTextField = styled(TextField)({
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fondo más opaco
    borderRadius: '4px',
});

const StyledCard = styled(Card)({
    backgroundColor: 'rgba(200, 200, 200, 0.9)', // Fondo gris claro y más opaco
    borderRadius: '8px',
    width: '250px', // Ancho fijo para todas las cartas
    height: '300px', // Altura fija para todas las cartas
    margin: '0 auto',
});

const RegionSearch = () => {
    const [busqueda, setBusqueda] = useState('');
    const [paises, setPaises] = useState([]);
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [cargando, setCargando] = useState(false);

    const buscarPaises = async () => {
        if (!busqueda.trim()) return;

        setCargando(true);
        setError('');

        const busquedaNormalizada = busqueda
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        try {
            const response = await axios.get(`https://restcountries.com/v3.1/region/${busquedaNormalizada.toLowerCase()}`);
            setPaises(response.data);
        } catch (err) {
            setError('No se encontraron países con esa región.');
            setOpenSnackbar(true);
        } finally {
            setCargando(false);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <AppBar position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none', textAlign: 'center' }}>
                <Toolbar>
                    <Typography variant="h6" style={{ color: '#e60023', margin: '0 auto' }}>
                        Buscador de Países por Región
                    </Typography>
                </Toolbar>
            </AppBar>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                <StyledTextField
                    label="Introduce la región"
                    variant="outlined"
                    fullWidth
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    margin="normal"
                    style={{ width: '600px', marginBottom: '10px' }} // Tamaño reducido
                />
                <StyledButton variant="contained" onClick={buscarPaises} style={{ width: '150px', marginBottom: '20px' }}>
                    Buscar
                </StyledButton>
                {cargando && <CircularProgress style={{ display: 'block', margin: '20px auto' }} />}
                {error && (
                    <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                            {error}
                        </Alert>
                    </Snackbar>
                )}
                <Grid2 container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
                {paises.map((pais) => (
                        <Grid2 item xs={12} sm={6} md={6} key={pais.cca3}> {/* Cambiado a md={6} para una columna menos */}
                            <StyledCard variant="outlined">
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={pais.flags.svg}
                                    alt={`Bandera de ${pais.name.common}`}
                                    style={{ borderRadius: '8px 8px 0 0' }} // Bordes redondeados en la parte superior
                                />
                                <CardContent style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Typography variant="h6" component="div" style={{ marginTop: '10px', color: '#333', textAlign: 'center' }}>
                                        {pais.name.common}
                                    </Typography>
                                    <div style={{ flexGrow: 1, textAlign: 'center' }}>
                                        <Typography color="text.secondary">
                                            <strong>Capital:</strong> {pais.capital ? pais.capital[0] : 'N/A'}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            <strong>Población:</strong> {pais.population.toLocaleString()}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            <strong>Región:</strong> {pais.region}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            <strong>Subregión:</strong> {pais.subregion ? pais.subregion : 'N/A'}
                                        </Typography>
                                    </div>
                                </CardContent>
                            </StyledCard>
                        </Grid2>
                    ))}
                </Grid2>
            </div>
        </>
    );
};

export default RegionSearch;

import React, { useState } from 'react';
import {
    TextField,
    Button,
    Snackbar,
    AppBar,
    Toolbar,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Grid2,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledButton = styled(Button)({
    backgroundColor: '#e60023',
    color: 'white',
    '&:hover': {
        backgroundColor: '#c7001a',
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

const NameSearch = ({ title = "Buscador de Países", buttonText = "Buscar" }) => {
    const [name, setName] = useState('');
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [cargando, setCargando] = useState(false);

    const handleSearch = async () => {
        if (!name) return;

        setCargando(true);
        setError('');

        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
            setCountries(response.data);
        } catch (err) {
            setError('No se encontraron países con ese nombre.');
            setCountries([]);
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
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                <StyledTextField
                    label="Ingresa el nombre del país"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="normal"
                    style={{ width: '600px', marginBottom: '10px' }} // Tamaño reducido
                />
                <StyledButton variant="contained" onClick={handleSearch} style={{ width: '150px', marginBottom: '20px' }}>
                    {buttonText}
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
                    {countries.map((country) => (
                                                <Grid2 item xs={12} sm={6} md={6} key={country.cca3}> {/* Cambiado a md={6} para una columna menos */}
                                                <StyledCard variant="outlined">
                                                    <CardContent style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                        <img src={country.flags.svg} alt={`Bandera de ${country.name.common}`} style={{ width: '100%', borderRadius: '8px' }} />
                                                        <Typography variant="h6" component="div" style={{ marginTop: '10px', color: '#333', textAlign: 'center' }}>
                                                            {country.name.common}
                                                        </Typography>
                                                        <div style={{ flexGrow: 1, textAlign: 'center' }}>
                                                            <Typography color="text.secondary">
                                                                <strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}
                                                            </Typography>
                                                            <Typography color="text.secondary">
                                                                <strong>Población:</strong> {country.population.toLocaleString()}
                                                            </Typography>
                                                            <Typography color="text.secondary">
                                                                <strong>Región:</strong> {country.region}
                                                            </Typography>
                                                            <Typography color="text.secondary">
                                                                <strong>Subregión:</strong> {country.subregion ? country.subregion : 'N/A'}
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
                    
                    export default NameSearch;
                    

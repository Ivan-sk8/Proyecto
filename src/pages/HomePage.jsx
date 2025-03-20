import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid2, CircularProgress, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import MapIcon from '@mui/icons-material/Map';

const BackgroundContainer = styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1, // Asegúrate de que esté detrás de otros componentes
    backgroundImage: 'url(${require(./assets/background.jpg)})', // Si está en public
    // backgroundImage: `url(${require('./assets/background.jpg')})`, // Si está en src/assets
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.8, // Ajusta la opacidad si es necesario
});

const StyledCard = styled(Card)({
  margin: '20px',
  textAlign: 'center',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const HomePage = () => {
  const [paises, setPaises] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setPaises(data);
      } catch (error) {
        console.error("Error al cargar los países:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchPaises();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndice((prevIndice) => {
        return (prevIndice + 1) % (paises.length > 4 ? paises.length - 3 : 1);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [paises.length]);

  const paisesAMostrar = paises.slice(indice, indice + 4);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', color: '#333' }}>
        Bienvenido a la Página de Búsqueda de Países
      </Typography>
      <Typography variant="body1" color="text.secondary" style={{ textAlign: 'center', marginBottom: '40px' }}>
        Explora la diversidad del mundo a través de diferentes métodos de búsqueda.
      </Typography>

      {cargando ? (
        <CircularProgress style={{ display: 'block', margin: '20px auto' }} />
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {paisesAMostrar.map((pais) => (
            <Card key={pais.cca2} style={{ margin: '20px', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', overflow: 'hidden', width: '200px', height: '300px' }}>
              <CardMedia component="img" height="140" image={pais.flags?.svg || 'https://via.placeholder.com/140'} alt={`Bandera de ${pais.name.common}`} style={{ objectFit: 'cover', backgroundColor: '#f0f0f0' }} />
              <CardContent style={{ height: '160px' }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {pais.name.common}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Código:</strong> {pais.cca2}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Capital:</strong> {pais.capital?.[0] || 'No disponible'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Región:</strong> {pais.region || 'No disponible'}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Grid2 container spacing={2} justifyContent="center">
        <Grid2 item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <LanguageIcon style={{ fontSize: '40px', color: '#e60023' }} />
              <Typography variant="h5" gutterBottom>
              Búsqueda por Idioma
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Encuentra países que hablan un idioma específico.
              </Typography>
              <Link to="/lang-search" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                  Ir a Búsqueda
                </Button>
              </Link>
            </CardContent>
          </StyledCard>
        </Grid2>
        <Grid2 item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <SearchIcon style={{ fontSize: '40px', color: '#e60023' }} />
              <Typography variant="h5" gutterBottom>
                Búsqueda por Nombre
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Busca información sobre un país ingresando su nombre.
              </Typography>
              <Link to="/name-search" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                  Ir a Búsqueda
                </Button>
              </Link>
            </CardContent>
          </StyledCard>
        </Grid2>
        <Grid2 item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <MapIcon style={{ fontSize: '40px', color: '#e60023' }} />
              <Typography variant="h5" gutterBottom>
                Búsqueda por Región
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Encuentra países en una región específica.
              </Typography>
              <Link to="/region-search" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                  Ir a Búsqueda
                </Button>
              </Link>
            </CardContent>
          </StyledCard>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default HomePage;


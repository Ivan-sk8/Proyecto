import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, CircularProgress } from '@mui/material';

const ListaDePaises = () => {
    const [paises, setPaises] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [indice, setIndice] = useState(0); // Estado para controlar el índice de los países a mostrar

    useEffect(() => {
        const fetchPaises = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                setPaises(data); // Guardar todos los países
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
            setIndice((prevIndice) => (prevIndice + 1) % (paises.length - 3)); // Cambia el índice
        }, 5000); // Cambia cada 5 segundos

        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, [paises.length]);

    // Obtener los 4 países a mostrar
    const paisesAMostrar = paises.slice(indice, indice + 4);

    return (
        <>
            <Typography variant="h4" fontWeight="bold" gutterBottom style={{ textAlign: 'center', marginTop: '50px' }}>
                🌍 Bienvenido a la Página de Países
            </Typography>
            <Typography variant="body1" color="text.secondary" marginBottom={4} style={{ textAlign: 'center' }}>
                Explora la diversidad del mundo a través de los países.
            </Typography>

            {cargando ? (
                <CircularProgress style={{ display: 'block', margin: '20px auto' }} />
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {paisesAMostrar.map((pais) => (
                        <Card
                            key={pais.cca2}
                            style={{
                                margin: '20px',
                                borderRadius: '12px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                overflow: 'hidden',
                                transition: 'transform 0.3s ease',
                                width: '200px', // Ancho fijo
                                height: '300px', // Altura fija
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="140"
                                image={pais.flags?.svg || 'https://via.placeholder.com/140'} // Usa un placeholder si no hay bandera
                                alt={`Bandera de ${pais.name.common}`}
                                style={{
                                    objectFit: 'cover',
                                    backgroundColor: '#f0f0f0',
                                }}
                            />
                            <CardContent style={{ height: '160px' }}> {/* Ajusta la altura del contenido */}
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
        </>
    );
};

export default ListaDePaises;

import React from 'react';
import './SobreNosotros.css'; // Asegúrate de crear este archivo CSS

const SobreNosotros = () => {
    return (
        <div className="sobre-nosotros">
            <div className="contenido">
                <h1>Sobre Nosotros</h1>
                <section className="mision-vision">
                    <h2>Desarrollado por:</h2>
                    <h2>Jesus Ivan Tamay Balam</h2>
                    <p>
                        Estudiante de la universidad tecnologica de la riviera maya
                    </p>
                    <p></p>
                </section>
                <section className="valores">
                    <h2>Tecnologias usadas</h2>
                    <ul>
                        <li>MATERIAL UI</li>
                        <li>APIS</li>
                        <li>VITE + REACT</li>
                        <li>Colaboración</li>
                    </ul>
                </section>
                <section className="equipo">
                    <h2>CARRERA</h2>
                    <div className="miembros-equipo">
                        <div className="miembro">
                            <h3>TI41 BIS DSM</h3>
                            <p>Desarrollo de Software Multiplataforma</p>
                        </div>
                        
                    </div>
                </section>
                <section className="historia">
                    <h2>Repositorio</h2>
                    <p>
                        Aquí puedes contar la historia de tu empresa. Por ejemplo: "Fundada en 2020, nuestra empresa ha crecido rápidamente gracias a la confianza de nuestros clientes."
                    </p>
                </section>
            </div>
        </div>
    );
};

export default SobreNosotros;

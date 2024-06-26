import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import backendUrl from '../../serverConfig';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';

//import '../../GlobalStyles/Resources.css';
//import './styleDash.css';
import './styleViewBoleta.css';

import logo from '../../GlobalStyles/images/logo.svg';
import imagen from '../../GlobalStyles/images/image1.png';

import NewMenuApplication from '../NuevoMenu/NuevoMenu';
import { FaEye, FaEdit, FaTrash, FaPlus, FaArchive, FaFile} from 'react-icons/fa';


import HeaderApp from '../Header/Header';

import CardHome from '../Home_Component/CardHome';
//importar el local 
import { useLocation } from 'react-router-dom';

const HomePsicologia = () => {

    const [isVisible, setIsVisible] = useState(false);

    const zoomWithDelay = useSpring({
        transform: 'scale(1)',
        from: { transform: 'scale(0.5)' },
        config: { delay: 2000 } // Agregar un retraso de 1000ms (1 segundo)
      });
      
      const slide = useSpring({
        from: { transform: 'translateX(-100%)' },
        to: { transform: 'translateX(0)' },
      });
      
      const fadeInUp = useSpring({
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        from: { opacity: 0, transform: 'translateY(20px)' }
      });
      
      
      const [isAnimating, setIsAnimating] = useState(false);
      


    //obetenr lo que envie en el navigate con state
    const location = useLocation();
    const { state } = location;
    //console.log(state[0].NombreCompleto);
    const navigate = useNavigate();


    const UID = localStorage.getItem('UID');
    const CID = localStorage.getItem('CID');
    const Rol = localStorage.getItem('Rol');
    const Email = localStorage.getItem('Email');






    useEffect(() => {

        //validar si estas logeado y en caso de que si, validar que eres psicologo

        if (UID === null) {
            navigate("/Login");
        }
        //console.log(Rol);
        if (Rol !== 'Psicología') {
         //navegar a pagina de falta de permisos
            navigate("/PageNotFound");
        }


    }, [backendUrl, CID]);



  


    return (
        <div className='Body-PanelSU'>
            
            <animated.div style={slide} className="container-Menu">
            <NewMenuApplication />
            </animated.div>
               
           

            <div className="container-Body">
                <div className="headerInfo">
                    <HeaderApp titulo="Home" />
                </div>
                <div className="contenido">
                    <div className="containerCardHome">
                    <CardHome
                        Email={Email}
                        Nombre={state[0].NombreCompleto}
                        Rol={Rol}
                        Label1="Centro:"
                        Value1={state[0].NombreCentro}
                        Label2="Consultas realizadas:"
                        Value2={state[0].TotalConsultas}
                        Label3="Mes más activo:"
                        Value3={state[0].MesMasActivo}
                        Label4="Último paciente atendido:"
                        Value4={state[0].UltimoPacienteAtendido}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HomePsicologia;

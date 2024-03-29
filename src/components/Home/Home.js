import React from 'react'
import '../../styles/stylesLandingPage.scss'
import { Logo } from '../logo/Logo'
import authLogo from '../../assets/authLogo.png';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';

export const Home = () => {

    const [formValues, handleInputChange, reset] = useForm({
        email:'',
    });

    const { email } = formValues;

    const contact = (e) => {
        
        e.preventDefault();

        if(!email) return false;

        Swal.fire({
            icon:'success',
            title:'Mensaje enviado',
            html:'<p>Gracias por contactar a The Golden Feather.<br/>Nos pondremos en contacto a la brevedad.</p>',
        });

        reset();
    }

  return (
    <div>

        <div className="container-fluid p-0" id='landing-container'>
            <div className="row">
                <div className="col-md-12">
                    <header className="masthead">
                        <div className="container" id='welcome'>
                            <Logo/>
                            <a className="btn btn-gold btn-xl text-uppercase" href="#about">Aprende más</a>
                        </div>
                    </header>
                </div>

                <div className='col-md-12' id='about'>
                <section className="page-section mt-5">
                        <div className="container">
                            <div className="row mt-5">
                                
                                
                                <div className="col-sm-12 col-md-7">
                                    <h2 className="section-heading text-uppercase mb-4 mt-4">¿Qué es <br/> The Golden Feather?</h2>
                                    <h3 className="section-subheading mb-4 mt-4">Te contamos todo lo que necesitas saber.</h3>
                                    <p>The Golden Feather "La Pluma Dorada" es una herramienta para turismo y hotelería orientada al servicio de los huéspedes de un hotel.</p>
                                    <p>La plataforma permite a los hoteles y hoteleros ofrecer un servicio de reservas de eventos y así poder llevar un seguimiento de las mismas.</p>
                                    <p>La plataforma es un CRM (Client Relationship Management) y parte de sus funcionalidades es ofrecer la mayor cantidad de información a los usuarios y clientes de los eventos en proceso.</p>
                                    <a className="btn btn-gold btn-xl text-uppercase" href="#services">Servicios</a>
                                </div>
                                <div className="col-sm-12 col-md-5 text-center">
                                    {/* <Logo className="big-logo"/> */}
                                    <img src={authLogo} id="gf-logo"/>
                                    
                                </div>
                            </div>
                            
                        </div>
                    </section>
                
                </div>
                
                <div className='col-md-12' id='services'>
                <section className="page-section mt-5" >
                        <div className="container">
                            <div className="row text-center" id='servicesData'>
                                <div className="text-center mb-5">
                                    <h2 className="section-heading text-uppercase mb-4 mt-4">Servicios</h2>
                                    <h3 className="section-subheading text-muted">Las reservas de tus clientes son muy importantes.</h3>
                                </div>
                                <div className="col-md-4">
                                    <span className="fa-stack fa-4x">
                                        <i className="fas fa-circle fa-stack-2x golden-text"></i>
                                        <i className="fas fa-columns fa-stack-1x fa-inverse"></i>
                                    </span>
                                    <h4 className="my-3">Eventos comisionables</h4>
                                    <p className="text-muted">Cargar eventos de agencias, empresas de turismo y más para luego venderlos y ganar una comisión de manera rápida y fácil.</p>
                                </div>
                                <div className="col-md-4">
                                    <span className="fa-stack fa-4x">
                                        <i className="fas fa-circle fa-stack-2x golden-text"></i>
                                        <i className="fas fa-book-open fa-stack-1x fa-inverse"></i>
                                    </span>
                                    <h4 className="my-3">Reservas</h4>
                                    <p className="text-muted">Ser organizado es clave para tí y tus clientes. Lleva un registro de todas las reservas, actualiza en tiempo real y notifica a tus clientes.</p>
                                </div>
                                <div className="col-md-4">
                                    <span className="fa-stack fa-4x">
                                        <i className="fas fa-circle fa-stack-2x golden-text"></i>
                                        <i className="fas fa-chart-simple fa-stack-1x fa-inverse"></i>
                                    </span>
                                    <h4 className="my-3">Reportes y estadísticas</h4>
                                    <p className="text-muted">¿Cuántas reservas tengo para mañana o cuantas comisiones gané? Los reportes nos detallan todo un panorama diario, mensual y anual de las reservas e ingresos.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                
                </div>

                

                <div className='col-md-12' id='contact'>
                    <section>
                        <div className="container">
                            <div className="row" id='contact-data'>
                                <div className="col-lg-8 mx-auto text-center">
                                    <img src={authLogo} alt="logo" className='gf-logo-img' />
                                    <h2 className="section-heading">Contactanos</h2>
                                    <hr className="my-4" />
                                    <p className="mb-5">Si queres saber más dejanos tu email para ponernos en contacto.</p>
                                </div>
                                <div className="col-lg-8 mx-auto text-center">
                                    <form name="sentMessage" id="contactForm" onSubmit={contact}>
                                        <div className="input-group mb-3">
                                        <input type="email" value={ email } name="email" className="form-control" placeholder="E-mail" aria-label="email" aria-describedby="email" onChange={handleInputChange}/>
                                        <button className="btn btn-reserve" type="submit" id="submit">Enviar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </div>
        

        

    </div>
  )
}

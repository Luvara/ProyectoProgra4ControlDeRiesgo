import CardBody from "./cardBody";

const BodyHomePage: React.FC = () => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                    <h1 className="md:text-5xl text-3xl font-bold title-font mb-2 text-white">Modulo de autoevaluación</h1>
                </div>
                <div className="justify-center flex flex-wrap -m-4">
                    <CardBody title="Autoevaluación" description="Realiza una autoevaluación de tu empresa para determinar el nivel de riesgo de contagio de COVID-19." icon={<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>}/>
                    <CardBody title="Resultados" description="Obten los resultados de la autoevaluación y descarga el certificado de cumplimiento de medidas de seguridad." icon={<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>}/>
                    <CardBody title="Reportes" description="Visualiza los reportes de autoevaluación y descarga los certificados de cumplimiento de medidas de seguridad." icon={<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>}/>
                    <CardBody title="Contacto" description="Contacta a un asesor para obtener más información sobre el modulo de autoevaluación." icon={<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>}/>
                    <CardBody title="Acerca de" description="Conoce más sobre el modulo de autoevaluación y las medidas de seguridad para prevenir el contagio de COVID-19." icon={<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>}/>
                </div>
                <div className="justify-center flex flex-wrap -m-4">
                </div>
            </div>
        </section>
    );
};

export default BodyHomePage;
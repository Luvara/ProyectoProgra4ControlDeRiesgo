import React, { useState } from "react";
import Card from "../card";
import Question from "../form/question";
import Pagination from "../form/pagination";
import Button from "../form/button";

const BodyFormMaintenance: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sections, setSections] = useState([
    {
      title: "Compromiso",
      questions: [
        {
          id: 1,
          text: "El jerarca y los titulares subordinados demuestran, en su gestión y actuaciones diarias, su apoyo y compromiso con el control interno? Ej. Promueven talleres, reuniones, unidad de divulgación de controles, etc.",
          response: null,
          observation: "",
          file: null,
        },
        {
          id: 2,
          text: "El jerarca y los titulares subordinados ejercen liderazgo en el fortalecimiento constante del sistema de control interno? Ej. Se interesan y revisan periódicamente el cumplimiento de recomendaciones de la AI y otros. Así como de la autoevaluación y SEVRI",
          response: null,
          observation: "",
          file: null,
        },
        {
          id: 3,
          text: "El jerarca y los titulares subordinados han definido a nivel institucional y en cada unidad orgánica, los alcances del sistema de control interno y las regulaciones para el funcionamiento del mismo? Existe un reglamento o circular sobre el control interno, roles y responsabilidades, u otros acuerdos o circulares.",
          response: null,
          observation: "",
          file: null,
        },
        {
          id: 4,
          text: "Se han realizado y se proyectan con frecuencia actividades para divulgar los alcances y la importancia del sistema de control interno, a todos los funcionarios de la institución?",
          response: null,
          observation: "",
          file: null,
        },
        {
          id: 5,
          text: "Se cuenta con mecanismos que permiten la evaluación y el fortalecimiento constantes del sistema de control interno institucional? Ej. Autoevaluación",
          response: null,
          observation: "",
          file: null,
        },
        {
          id: 6,
          text: "El jerarca y los titulares subordinados apoyan con acciones concretas el funcionamiento y fortalecimiento de la actividad de auditoría interna?",
          response: null,
          observation: "",
          file: null,
        },
        // Continúa agregando las preguntas restantes...
      ],
    },
    {
      title: "Ética",
      questions: [
        {
          id: 7,
          text: "Se han establecido y fortalecen permanentemente medidas, instrumentos y demás elementos en materia ética, a saber: declaración de visión, misión, valores, código de ética u otros similares; así también los referidos al clima organizacional, valores compartidos, creencias y otros factores que se dan de manera informal en la institución?",
          response: null,
          observation: "",
          file: null,
        },
        {
          id: 8,
          text: "Están contenidas las medidas éticas en un reglamento o código de ética que contenga los acuerdos, compromisos o protocolos éticos que involucre al área contable?",
          response: null,
          observation: "",
          file: null,
        },
        {
          id: 9,
          text: "Se realizan periódicamente actividades para promover la aplicación del reglamento o código de ética en la institución y en las unidades?",
          response: null,
          observation: "",
          file: null,
        },
        // Agrega más preguntas para esta y otras secciones...
      ],
    },
    {
      title: "Personal",
      questions: [
        {
          id: 20,
          text: "El personal reúne los requisitos, las competencias y valores establecidos en el manual de puestos institucionales para el desempeño de las responsabilidades encomendadas en los diversos puestos. El personal de la institución cuenta con las habilidades y conocimientos requeridos para el puesto asignado?",
          response: null,
          observation: "",
          file: null,
        },
        {
          id: 21,
          text: "Recursos humanos realiza pruebas para corroborar la fidelidad de los títulos y el currículo presentado?",
          response: null,
          observation: "",
          file: null,
        },
        {
          id: 22,
          text: "La administración del personal se ejecuta con base en las políticas y procedimientos vigentes para la: planificación, reclutamiento, selección, motivación, promoción, evaluación de desempeño, capacitación y otras relacionadas con la gestión de recursos humanos?",
          response: null,
          observation: "",
          file: null,
        },
        {
          id: 23,
          text: "Los procesos de administración de recursos humanos se evalúan y mejoran de manera continua? Autoevaluación, auditorías, etc.",
          response: null,
          observation: "",
          file: null,
        },
        {
          id: 24,
          text: "Las políticas y procedimientos vigentes en materia de recursos humanos, propician la contratación de nuevos funcionarios con los conocimientos y habilidades para los cargos respectivos? Su desempeño es evaluado y corroborado?",
          response: null,
          observation: "",
          file: null,
        },
        {
          id: 25,
          text: "Existen programas formales de inducción para los funcionarios de nuevo ingreso a la institución?",
          response: null,
          observation: "",
          file: null,
        },
        {
          id: 26,
          text: "El jerarca y los titulares subordinados, en conjunto con la unidad de apoyo a la administración de recursos humanos, han asumido sus responsabilidades respecto de la administración de recursos humanos, y promueven continuamente el mejoramiento constante de las competencias de todos los funcionarios, de acuerdo con los puestos de trabajo asignados?",
          response: null,
          observation: "",
          file: null,
        },
      ],
    },
    {
      title: "Estructura",
      questions: [
        {
          id: 27,
          text: "Existe formal y materialmente una estructura organizativa flexible y ágil para atender las demandas, necesidades y los objetivos de la institución y en particular los de la unidad o área bajo estudio, así como los riesgos que le plantea su entorno?",
          response: null,
          observation: "",
          file: null,
        },
        {
          id: 28,
          text: "Cuándo fue la última vez que se ajustó la estructura orgánica y qué riesgos presenta la organización actual y cómo podría fortalecerse?",
          response: null,
          observation: "",
          file: null,
        },
        {
          id: 29,
          text: "Se cuenta con mecanismos formales para la evaluación periódica de la estructura orgánica que posibiliten que se realicen oportunamente los ajustes pertinentes?",
          response: null,
          observation: "",
          file: null,
        },
        {
          id: 30,
          text: "El jerarca y los titulares subordinados han introducido en el periodo objeto de estudio ajustes en la estructura organizacional para armonizarla con los objetivos institucionales?",
          response: null,
          observation: "",
          file: null,
        },
        {
          id: 31,
          text: "De acuerdo con la estructura orgánica o modelo organizativo, cuáles son las principales unidades, que se relacionan con los asuntos bajo estudio (descríbaselo al entrevistado) y cuáles considera los principales riesgos y puntos clave de control?",
          response: null,
          observation: "",
          file: null,
        },
        {
          id: 32,
          text: "Como complemento a la estructura existe un manual organizativo, de procesos o algo similar que describa las funciones, actividades, responsabilidades, procedimientos y otros importantes a considerar como parte de la razón de ser de las unidades que la conforman?",
          response: null,
          observation: "",
          file: null,
        },
      ],
    },
  ]);

  const handlePageChange = (newPage: number): void => {
    if (newPage >= 0 && newPage < sections.length) {
      setCurrentPage(newPage);
    }
  };

  const updateQuestion = (sectionIndex, questionIndex, changes) => {
    const newSections = [...sections];
    const question = {
      ...newSections[sectionIndex].questions[questionIndex],
      ...changes,
    };
    newSections[sectionIndex].questions[questionIndex] = question;
    setSections(newSections);
  };

  return (
    <div className="container px-5 py-14 mx-auto rounded-lg bg-background-2 body-font">
      <div className="bg-background-3 flex flex-col justify-center items-center">
        <div className="flex justify-center items-center flex-wrap md:flex-row">
          <Card svg={"/Ambience.svg"} title="Ambience" />
          <Card svg={"/Risk.svg"} title="Risk" />
          <Card svg={"/Control.svg"} title="Control" />
          <Card svg={"/Systems.svg"} title="Systems" />
          <Card svg={"/Follow-up.svg"} title="Follow-up" />
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={sections.length}
          onPageChange={handlePageChange}
        />
        <h2 className="text-4xl font-bold m-4 text-white">
          {sections[currentPage].title}
        </h2>
        {sections[currentPage].questions.map((question, index) => (
          <Question
            key={question.id}
            question={question}
            index={index}
            sectionIndex={currentPage}
            updateQuestion={updateQuestion}
          />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={sections.length}
          onPageChange={handlePageChange}
        />
        <div className="m-5 w-full flex flex-row justify-evenly items-center">
          <Button text="Atras" color="blue" onClick={() => {}} />
          <Button text="Guardar" color="purple" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default BodyFormMaintenance;

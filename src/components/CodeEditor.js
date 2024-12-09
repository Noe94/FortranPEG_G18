import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import peggy from "peggy"; // Importar PeggyJS

// Estilos mejorados para el diseño
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    padding: "20px",
    gap: "20px",
    backgroundColor: "#2b2b2b", // Fondo oscuro para que se asemeje más a VSCode
  },
  leftPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "10px", // Reducir el espacio entre elementos
    backgroundColor: "#1e1e1e", // Fondo oscuro en el panel izquierdo
    padding: "10px",
    borderRadius: "8px",
  },
  rightPanel: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    backgroundColor: "#1e1e1e", // Fondo oscuro en el panel derecho
    padding: "10px",
    borderRadius: "8px",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px", // Espacio entre botones
    justifyContent: "flex-start", // Alinea los botones horizontalmente
  },
  button: {
    padding: "5px 10px", // Botones más pequeños
    backgroundColor: "#007acc", // Azul similar a VSCode
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "12px", // Reducir tamaño de texto de los botones
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)", // Sombra sutil
    transition: "background-color 0.2s ease-in-out",
  },
  buttonHover: {
    backgroundColor: "#005a8e", // Color más oscuro al hacer hover
  },
  editorContainer: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    overflow: "hidden", // Evitar desbordes
  },
  console: {
    height: "500px",
    backgroundColor: "#1e1e1e", // Fondo oscuro
    color: "lightgray", // Color de texto similar al de las terminales
    padding: "10px",
    borderRadius: "8px",
    fontFamily: "monospace", // Fuente de terminal
    fontSize: "14px", // Tamaño de letra más pequeño para simular una terminal
    overflowY: "auto", // Permitir scroll si hay más contenido
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
    whiteSpace: "pre-wrap", // Respetar saltos de línea y espacios
    lineHeight: "1.5", // Separación de líneas más natural
  },
};

const Editordecodigo = () => {
  const [code, setCode] = useState("// Escribe tu código aquí");
  const [output, setOutput] = useState("");

// Crear el parser con PeggyJS
// Crear el parser con PeggyJS
const createParser = (pegGrammar) => {
  try {
    // Intentamos generar el parser con la gramática proporcionada
    return peggy.generate(pegGrammar);  
  } catch (e) {
    // Si hay un error en la gramática, se captura y se muestra en la salida
    setOutput(prevOutput => prevOutput + `Error en la gramática: ${e.message}\n`);
    return null;
  }
};

const handleRunCode = () => {
  setOutput("")
  console.log("Código ingresado:", code); // Verifica qué código está siendo procesado
  
  // Crear el parser con la gramática proporcionada en el código ingresado
  const parser = createParser(code.toLowerCase()); // 'code' contiene la gramática proporcionada por el usuario

  if (!parser) {
    // Si no se puede generar el parser, la gramática es inválida
    setOutput(prevOutput => prevOutput + "Error: La gramática PEG es inválida.\n");
    return;
  }

  // Si la gramática es válida, mostrar un mensaje de éxito
  setOutput(prevOutput => prevOutput + "¡La gramática PEG es válida!\n");
};

  

  // Función para limpiar la consola de salida
  const handleClearConsole = () => {
    setOutput("");
  };

  return (
    <div style={styles.container}>
      {/* Panel izquierdo */}
      <div style={styles.leftPanel}>
        {/* Botones */}
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={handleRunCode}>
            Ejecutar Código
          </button>
          <button style={styles.button} onClick={() => setCode("")}>
            Limpiar Código
          </button>
          <button
            style={styles.button}
            onClick={() => setCode("// Escribe tu código aquí")}
          >
            Resetear
          </button>
          <button style={styles.button} onClick={handleClearConsole}>
            Limpiar Consola
          </button>
        </div>

        {/* Editor de código */}
        <div style={styles.editorContainer}>
          <MonacoEditor
            height="400px"
            language="plaintext" // Cambié de "javascript" a "plaintext"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
          />
        </div>
      </div>

      {/* Panel derecho (Consola de salida con un div simple) */}
      <div style={styles.rightPanel}>
        <div style={styles.console}>{output}</div>
      </div>
    </div>
  );
};

export default Editordecodigo;

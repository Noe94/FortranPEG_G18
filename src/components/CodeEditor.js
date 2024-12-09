import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import peggy from "peggy";

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    padding: "20px",
    gap: "20px",
    backgroundColor: "#2b2b2b", 
  },
  leftPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "10px", 
    backgroundColor: "#1e1e1e", 
    padding: "10px",
    borderRadius: "8px",
  },
  rightPanel: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    backgroundColor: "#1e1e1e",
    padding: "10px",
    borderRadius: "8px",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px", 
    justifyContent: "flex-start", 
  },
  button: {
    padding: "5px 10px",
    backgroundColor: "#007acc", 
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "12px", 
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)", 
    transition: "background-color 0.2s ease-in-out",
  },
  buttonHover: {
    backgroundColor: "#005a8e", 
  },
  editorContainer: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    overflow: "hidden", 
  },
  console: {
    height: "500px",
    backgroundColor: "#1e1e1e", 
    color: "lightgray",
    padding: "10px",
    borderRadius: "8px",
    fontFamily: "monospace", 
    fontSize: "14px", 
    overflowY: "auto", 
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
    whiteSpace: "pre-wrap", 
    lineHeight: "1.5", 
  },
};

const Editordecodigo = () => {
  const [code, setCode] = useState("// Escribe tu código aquí");
  const [output, setOutput] = useState("");

const createParser = (pegGrammar) => {
  try {
    return peggy.generate(pegGrammar);  
  } catch (e) {
    setOutput(prevOutput => prevOutput + `Error en la gramática: ${e.message}\n`);
    return null;
  }
};

const handleRunCode = () => {
  setOutput("")
  console.log("Código ingresado:", code);
  
  const parser = createParser(code.toLowerCase()); 

  if (!parser) {
    
    setOutput(prevOutput => prevOutput + "Error: La gramática PEG es inválida.\n");
    return;
  }

  
  setOutput(prevOutput => prevOutput + "¡La gramática PEG es válida!\n");
};


  const handleClearConsole = () => {
    setOutput("");
  };

  return (
    <div style={styles.container}>
      
      <div style={styles.leftPanel}>
      
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

   
        <div style={styles.editorContainer}>
          <MonacoEditor
            height="400px"
            language="plaintext" 
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
          />
        </div>
      </div>

   
      <div style={styles.rightPanel}>
        <div style={styles.console}>{output}</div>
      </div>
    </div>
  );
};

export default Editordecodigo;

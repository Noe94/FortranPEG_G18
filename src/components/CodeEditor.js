import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import Parser from "../gramaticaActualizada.js";

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
    whiteSpace: "pre-wrap",
    lineHeight: "1.5",
  },
};

const Editordecodigo = () => {
  const [code, setCode] = useState("// Escribe tu gramática aquí");
  const [output, setOutput] = useState("");

  // Función para formatear el árbol de análisis
  // const formatParseTree = (node, depth = 0) => {
  //   if (!node || (typeof node === "string" && node.trim() === "")) {
  //     return "";
  //   } 

  //   if (typeof node === "string") {
  //     return `${"  ".repeat(depth)}"${node}"`;
  //   }

  //   if (Array.isArray(node)) {
  //     const filteredChildren = node
  //       .map((child) => formatParseTree(child, depth + 1))
  //       .filter((line) => line.trim() !== "");
  //     return filteredChildren.join("\n");
  //   }

  //   if (typeof node === "object") {
  //     return Object.entries(node)
  //       .map(([key, value]) => {
  //         const formattedValue = formatParseTree(value, depth + 1);
  //         return formattedValue
  //           ? `${"  ".repeat(depth)}${key}:\n${formattedValue}`
  //           : null;
  //       })
  //       .filter((line) => line !== null)
  //       .join("\n");
  //   }

  //   return `${"  ".repeat(depth)}${String(node)}`;
  // };

  const handleRunCode = () => {
    setOutput("");
    try {
      const result = Parser.parse(code);
      // const formattedResult = formatParseTree(result);
      setOutput(`¡La gramática PEG es válida!\n\n`);
    } catch (error) {
      let errorMessage = `Error al analizar la gramática:\n${error.message}\n`;
      if (error.location) {
        const { start, end } = error.location;
        errorMessage += `Error en línea ${start.line}, columna ${start.column}.\n`;
        errorMessage += `Rango de caracteres: ${start.offset} - ${end.offset}`;
      }
      setOutput(errorMessage);
    }
  };

  const handleClearConsole = () => {
    setOutput("");
  };

  const resetConsole = () => {
    setOutput("");
    setCode("// Escribe tu gramática aquí");
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
          <button style={styles.button} onClick={resetConsole}>
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
            onChange={(value) => setCode(value || "")}
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

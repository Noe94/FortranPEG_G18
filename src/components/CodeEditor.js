import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";

const App = () => {
  const editorRef = useRef(null);
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("! Aquí aparecerá la salida.");

  const handleInputChange = (value) => {
    setInputCode(value);
  };

  const handleCompile = () => {
    /**  aqui deberian hacerse lata con la gramatica :v */
    const compiledOutput = ` por aqui se deberia mostrar el resultado del analis:\n${inputCode}`;
    setOutputCode(compiledOutput);
  };

  useEffect(() => {
    const handleResize = () => {
      if (editorRef.current) {
        editorRef.current.layout();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ height: "65vh", display: "flex", flexDirection: "column" }}>

      {/* Contenedor de editores */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", marginLeft:"5px",marginRight:"5px"}}>
        {/* Editor de entrada */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", marginRight:"5px" }}>
          <h2 style={{ textAlign: "center" }}>Entrada</h2>
          <Editor
            height="100%"
            width="100%"
            defaultLanguage="peggyJs"
            value={inputCode}
            onChange={handleInputChange}
            theme="vs-dark"
          />
        </div>

        {/* Editor de salida */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            marginleft:"5px"
            
          }}
        >
          <h2 style={{ textAlign: "center" }}>Salida</h2>
          <Editor
            height="100%"
            width="100%"
            defaultLanguage="fortran"
            value={outputCode}
            options={{ readOnly: true }}
            theme="vs-dark"
          />
        </div>
      </div>
            {/* Botón de compilación */}
            <button
        onClick={handleCompile}
        style={{
          alignSelf: "center",
          margin: "10px",
          padding: "10px 20px",
          backgroundColor: "#0078D4",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        COMPILAR
      </button>
    </div>
  );
};

export default App;
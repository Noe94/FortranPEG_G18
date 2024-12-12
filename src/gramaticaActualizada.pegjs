entrada 
  = definiciones;

definiciones 
  = definicion+;

definicion 
  = etiqueta "=" construccion (";" espacio_nueva_linea)?;

construccion 
  = concatenacion ("/" concatenacion)*;

concatenacion 
  = prefijo (_ prefijo)*;

prefijo 
  = ("&" / "!" / "^")? sufijo;

sufijo 
  = basico operador_repeticion?;

operador_repeticion 
  = "*" / "+" / "?";

basico 
  = etiqueta
  / literal
  / conjunto_caracteres
  / comodin
  / "(" construccion ")";

comodin 
  = ".";

literal 
  = '"' [^"]* '"' / "'" [^']* "'";

conjunto_caracteres 
  = "[" [^\]]+ "]";

etiqueta 
  = [_a-z][_a-z0-9]*;

espacio_nueva_linea 
  = [ \t\n\r]+;

_ 
  = [ \t]*;

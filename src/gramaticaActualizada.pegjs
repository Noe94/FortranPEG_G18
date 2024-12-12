entrada 
= definiciones;

definiciones 
= definicion+;

definicion 
= etiqueta (espacio literal)? espacio "=" espacio construccion (espacio "/" espacio construccion)* (espacio ";")? espacio_nueva_linea? / comentarios espacio_nueva_linea?;

construccion 
= concatenacion (espacio "/" espacio concatenacion)*;

concatenacion 
= prefijo (_ prefijo)*;

prefijo 
= ("&" / "!" / "^" / "$" / "@")? _ sufijo;

sufijo 
= (etiqueta ":")? basico (espacio operador_repeticion)?;

operador_repeticion 
= "*" / "+" / "?" / "|";

basico 
= etiqueta
    / literal
    / conjunto_caracteres
    / comodin
    / coma
    / agrupacion
    / "(" espacio construccion espacio ")";

comodin = ".";

coma = ",";

agrupacion 
= [0-9] / [a-zA-Z];

literal 
= ('"' [^"]* '"' [i]? / "'" [^']* "'" [i]?);

conjunto_caracteres 
= "[" [^\]]+ "]" [i]?;

etiqueta 
= [_a-zA-Z][_a-zA-Z0-9]*;

comentarios 
= comentario_linea / comentario_multilinea;

comentario_linea 
= "//" [^\n\r]*;

comentario_multilinea 
= "/*" (!"*/" .)* "*/"; // Corregido para compatibilidad con Peggy

espacio_nueva_linea 
= (espacio_blanco / nueva_linea)*;

nueva_linea 
= [\n\r]+;

_ 
= [ \t]*;

espacio 
= [ \t\n\r]*;

espacio_blanco 
= [ \t]+;

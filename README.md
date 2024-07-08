# verificacion_cliente

Cliente que permite realizar la verificación de la validez tanto de un hash de firma electrónica como también la comparación de documentos digitales para corroborar modificaciones y diferencias.

Consume métodos de la [API mid firma electrónica](https://github.com/udistrital/firma_electronica_mid) para poder tanto confirmar la existencia de la firma y el muestreo del documento asociado, o bien de comparar un documento subido con el que se tiene registrado en el sistema para verificar si son idénticos. El sistema permite mostrar los documentos en el cliente dependiendo del caso.

Tiene como limitación el hecho de que sólo recibe documentos pdf y estos deben tener un origen digital, es decir, no se pueden subir pdfs escaneados, ya que el sistema no los reconocerá correctamente.
## Especificaciónes técnicas
### Tecnologías implementadas y versiones

- [Angular 8.3.29](https://angular.dev)
- [Node 14.15.4](https://nodejs.org/en)

### Ejecución del proyecto

1. **Clonar el repositorio:**
```git clone https://github.com/udistrital/verificacion_cliente.git``` 

2. **Acceder al repositorio clonado:**

```cd verificacion_cliente```

3. **Instalar dependencias:**

```npm install```

4. **Ejecutar el cliente:**

```ng serve```

### Estado CI

| Develop | Release 0.0.1 | Master |
| -- | -- | -- |
|[![Build Status](https://hubci.portaloas.udistrital.edu.co/api/badges/udistrital/verificacion_cliente/status.svg?ref=refs/heads/develop)](https://hubci.portaloas.udistrital.edu.co/udistrital/verificacion_cliente)|[![Build Status](https://hubci.portaloas.udistrital.edu.co/api/badges/udistrital/verificacion_cliente/status.svg?ref=refs/heads/release/0.0.1)](https://hubci.portaloas.udistrital.edu.co/udistrital/verificacion_cliente)|[![Build Status](https://hubci.portaloas.udistrital.edu.co/api/badges/udistrital/verificacion_cliente/status.svg?ref=refs/heads/master)](https://hubci.portaloas.udistrital.edu.co/udistrital/verificacion_cliente)

## License

This file is part of verificacion_cliente.

verificacion_cliente is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

verificacion_cliente is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with verificacion_cliente. If not, see https://www.gnu.org/licenses/.
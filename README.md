# OSINT Tools Directory 🕵️‍♂️🌍

¡Bienvenidos al **Directorio de Herramientas OSINT**, una plataforma diseñada para centralizar las mejores utilidades de Inteligencia de Fuentes Abiertas y Ciberseguridad!

🔗 **[Visitar el Directorio Web en Vivo](https://fud0dev.github.io/OSINT-Tools-Directory/)**

## 💡 ¿Qué es este proyecto?

Este proyecto nació como un listado manual de recursos y ha evolucionado hacia una **plataforma completamente automatizada**. Su objetivo es proporcionar a los investigadores de seguridad un lugar único, organizado y constantemente actualizado donde descubrir herramientas útiles para sus investigaciones de redes sociales, recolección de información y enumeración.

### ✨ Características Principales
- **Web en Vivo**: Una interfaz intuitiva con buscador en tiempo real y filtrado por categorías (GitHub, LinkedIn, Twitter, Reddit, etc.)
- **Buscador Inteligente**: Las herramientas son analizadas, categorizadas y evaluadas automáticamente mediante Inteligencia Artificial (Llama 3.3).
- **Auto-Descubrimiento**: Internamente, el sistema escanea GitHub, Reddit y Newsletters para añadir nuevas herramientas cada semana sin requerir intervención manual.

---

## 🤝 Cómo Contribuir (¡Añade tu herramienta!)

¿Has creado un script brillante o conoces una herramienta de OSINT que crees que debería estar en esta lista? ¡Queremos conocerla!

El proceso para añadir herramientas a la página web está automatizado, pero requiere aprobación por seguridad.

### Pasos para sugerir una herramienta:
1. Ve a la pestaña **[Issues](https://github.com/fud0dev/OSINT-Tools-Directory/issues)** de este repositorio.
2. Haz clic en **New Issue**.
3. Deja un comentario con el enlace de la herramienta que te gustaría añadir y por qué es útil.
4. Una vez la revise, el administrador del proyecto (`fud0dev`) comentará en tu issue con el comando mágico:
   
   ```bash
   /add-tool https://url-de-tu-herramienta.com
   ```

5. ¡Y magia! La Inteligencia Artificial analizará el enlace, extraerá la información, la traducirá y la añadirá automáticamente al JSON de la base de datos de la web.

> [!NOTE]
> Solo el propietario del repositorio (`fud0dev`) tiene permisos para que la Acción de GitHub ejecute el comando `/add-tool`. Esto garantiza la calidad de las herramientas y evita abusos y spam en el sistema.

---

## 🛠️ Tecnologías Utilizadas

- **Base de Datos**: `data/tools.json`
- **Automatización**: GitHub Actions
- **Procesamiento AI**: Groq (Modelo `llama-3.3-70b-versatile`)
- **Web**: Vanilla CSS/JS embebido en GitHub Pages.

---


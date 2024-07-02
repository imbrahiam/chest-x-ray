# Predicción de Enfermedades a partir de Radiografías de Tórax

Este proyecto es una solución basada en inteligencia artificial (IA) para predecir enfermedades a partir de imágenes de radiografías de tórax. Utiliza un modelo de aprendizaje profundo para analizar las imágenes y proporcionar predicciones de varias enfermedades.
![alt text](/frontend/public/static/img/image.png)
![alt text](/frontend/public/static/img/image2.png)
![alt text](/frontend/public/static/img/image3.png)
## Descripción del Proyecto

El proyecto incluye un modelo de IA entrenado para reconocer diferentes enfermedades pulmonares a partir de radiografías de tórax. La aplicación web permite a los usuarios subir una imagen y obtener predicciones sobre la presencia de enfermedades específicas.

### Características Principales

- **Preciso:** Predicciones precisas para varias enfermedades pulmonares.
- **Rápido:** Resultados en segundos.
- **Confiable:** Basado en un modelo de IA robusto entrenado con un vasto conjunto de datos.
- **Fácil de Usar:** Interfaz simple para subir imágenes y obtener resultados.

## Instalación

Para configurar el proyecto localmente, sigue estos pasos:

1. Clona el repositorio:

    ```sh
    git clone https://github.com/imbrahiam/chest-x-ray.git
    cd chest-x-ray
    ```

2. Instala las dependencias de Python:

    ```sh
    pip install -r requirements.txt
    ```

3. Instala las dependencias de Node.js:

    ```sh
    cd client
    npm install
    ```

## Uso

### Servidor Backend

1. Inicia el servidor Flask:

    ```sh
    python app.py
    ```

### Cliente Frontend

1. Inicia el servidor Next.js:

    ```sh
    cd client
    npm run dev
    ```

2. Abre tu navegador y navega a `http://localhost:3000` para acceder a la aplicación.

## Entrenamiento del Modelo

El modelo de IA fue entrenado utilizando un conjunto de datos de radiografías de tórax. Aquí hay un resumen del proceso:

1. **Preprocesamiento de Datos:** Las imágenes fueron preprocesadas y etiquetadas según las enfermedades presentes.
2. **Definición del Modelo:** Se utilizó un modelo de red neuronal convolucional (CNN) para el entrenamiento.
3. **Entrenamiento:** El modelo fue entrenado con imágenes de entrenamiento y validado con imágenes de validación.

Para entrenar el modelo desde cero, puedes seguir estos pasos:

1. Preprocesa los datos y divídelos en conjuntos de entrenamiento, validación y prueba.
2. Define y entrena el modelo utilizando `train.py`:

    ```sh
    python train.py
    ```

3. Guarda el modelo entrenado para su uso en la predicción.

## Predicción

La predicción se realiza a través de una API RESTful. Sube una imagen de radiografía de tórax y obtén predicciones sobre la presencia de enfermedades. Aquí hay un ejemplo de cómo hacer una predicción usando `curl`:

```sh
curl -X POST -F 'file=@path/to/your/image.jpg' http://localhost:5000/predict
```

## Contribuciones

Las contribuciones son bienvenidas. Para contribuir, sigue estos pasos:

1. Crea un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva característica'`).
4. Sube tus cambios (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Créditos
  - [Brahiam](https://www.linkedin.com) 🧑‍💻
  - [Gilthong](https://www.linkedin.com) 🧑‍💻
  - [Domingo Alcántara](https://www.linkedin.com) 🧑‍💻
  - [Isaac](https://www.linkedin.com) 🧑‍💻
  - [Gary Campusano](https://www.linkedin.com/in/gary-alexander-campusano-paredes-87a28724a/) 🧑‍💻

  Este proyecto fue desarrollado como parte del Samsung Innovation Campus. Agradecemos a todos los colaboradores y mentores por su apoyo y orientación.


**Nota:** Este es un proyecto de demostración y no debe utilizarse para diagnóstico médico en un entorno real.

from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import cv2
import numpy as np

app = Flask(__name__)
CORS(app)

labels = ['Cardiomegaly', 'Emphysema', 'Effusion', 'Hernia', 'Infiltration', 'Mass', 
          'Nodule', 'Atelectasis', 'Pneumothorax', 'Pleural_Thickening', 'Pneumonia', 
          'Fibrosis', 'Edema', 'Consolidation']

model_path = 'complete_model.h5'
model = load_model(model_path, compile=False)

model.compile(optimizer='adam', loss='binary_crossentropy')

def preprocess_image(image_bytes, target_size=(224, 224)):
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR) # Color en vez de grayscale
    img = cv2.resize(img, target_size)
    img = img / 255.0
    img = np.expand_dims(img, axis=0)
    return img

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    img_bytes = file.read()
    img = preprocess_image(img_bytes)

    prediction = model.predict(img)

    predictions = prediction[0].tolist()

    result = {label: f"{pred * 100:.2f}%" for label, pred in zip(labels, predictions)}

    return jsonify({'predictions': result})

if __name__ == '__main__':
    app.run(debug=True)

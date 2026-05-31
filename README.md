# IdentiFace AI 

A simple, real-time web application that detects human faces and identifies exactly *who* they are right in your web browser. 

This project uses **p5.js** for the visual graphics and **ml5.js** to handle the artificial intelligence. Instead of just showing a generic box around a face, it uses a custom AI model trained to recognize specific individuals.

---

## 🛠️ How It Works

The app runs two AI processes at the same time to create a seamless tracking experience:

1. **Face Tracking (`ml5.faceMesh`):** Finds where a face is on the screen and calculates a bounding box around it.
2. **Identity Recognition (`ml5.imageClassifier`):** Looks at the video frame and determines the name of the person based on a custom Google Teachable Machine model.

### Fixing the Mirror Effect
When you look at a webcam, you expect it to act like a mirror. However, when you flip a video horizontally, the AI coordinates get inverted. This project includes a simple math formula to fix this issue, ensuring the bounding box follows your face perfectly:

$$\text{Corrected X Position} = \text{Canvas Width} - \text{Face X Position} - \text{Box Width}$$

---

## 🧠 The AI Training Process

To make this app smart, a custom AI model was trained using Google Teachable Machine:
* **Data Collection:** Gathered over 1,000 image samples per person from different angles and expressions.
* **Accuracy Tuning:** Cleaned and tested the dataset continuously to prevent the AI from confusing one person with another.

---

## 📦 File Structure

* `index.html` — Loads the required AI libraries (p5.js and ml5.js) from the internet and sets up the webpage.
* `sketch.js` — Contains all the camera logic, AI processing functions, and drawing loops.

---


# 🖼️ Image Processing App

A full-stack Node.js + TypeScript application that allows users to upload images, resize them using Sharp, and view the resized result. Built without a database and with clean structure, validation, and modular design.

---

## 🚀 Features

- Upload images via a simple frontend form
- Resize images to specified dimensions using [Sharp](https://sharp.pixelplumbing.com/)
- View the resized image immediately after upload
- Backend built with Express and TypeScript
- Sanitized input and file validation
- Modular folder structure with routes, controllers, middleware
- Unit tested and cleanly separated logic
- No database — file system storage only

---

## 📁 Folder Structure
image-processing-app/
├── public/
│   ├── css/
│   │   └── style.css
│   └── index.html
├── src/
│ ├── controllers/
│ │ └── imageController.ts
│ ├── middleware/
│ │ ├── multerConfig.ts
│ │ └── sanitizeInput.ts
│ ├── routes/
│ │ └── imageRoutes.ts
│ ├── utils/
│ │ └── imageProcessor.ts
│ └── index.ts # Main Express server entry point
├── uploads/ # Folder for storing uploaded & resized images
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md # You're here!


---

## 🧰 Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Image Processing**: Sharp
- **Frontend**: HTML, CSS, Vanilla JS
- **Input Sanitation**: sanitize-html
- **Validation**: Express middleware

---

## ⚙️ Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/herobrinic/image-processing-app.git
   cd image-processing-app

## Install dependencies
npm install





## build and run:
npm run build
npm start


## Or
 npm run dev 


## Visit the app
Open your browser at: http://localhost:3000




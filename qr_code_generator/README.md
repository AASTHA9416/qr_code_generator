React QR Code Generator

A simple web application built with React and Vite that allows users to generate a QR code from any URL. Users can instantly preview the code and download it as a PNG file or save the original URL as a text file.

✨ Features

URL to QR Code: Enter any valid URL to generate a QR code.

Live Preview: Instantly see the generated QR code.

Download PNG: Download the generated QR code as a high-quality .png file.

Download .txt: Save the original URL you entered as a .txt file.

Loading & Error States: Clear feedback for the user while generating or if an error occurs.

Responsive Design: Looks great on both desktop and mobile devices.

💻 Tech Stack

React: A JavaScript library for building user interfaces (using Hooks).

Vite: A modern, fast frontend build tool.

Plain CSS: Styled with standard CSS for simplicity and performance (no frameworks).

Fetch API: Used for making requests to the QR code generation service.

🚀 How to Run This Project

This guide assumes you have Node.js (version 18 or higher) installed on your machine.

Clone the repository:

git clone [https://github.com/AASTHA8416/qr_code_generator.git](https://github.com/AASTHA8416/qr_code_generator.git)


Navigate to the project directory:
(Based on your repository, the React app is in a subfolder)

cd qr_code_generator/qr_code_generator


Install the dependencies:

npm install


Run the development server:

npm run dev


Open the app:
Open your browser and go to http://localhost:5173 (or whatever port is shown in your terminal).

API Used

This project uses the free goqr.me API to generate the QR codes. It is simple, fast, and requires no API key.
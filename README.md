# Masjid System

A full-stack Masjid Management System built with **Django REST Framework** for the backend and **React + Vite** for the frontend.

## Features

* Admin authentication
* Member management
* Dashboard
* Donations management
* REST API
* Responsive React frontend

## Tech Stack

### Backend

* Python
* Django
* Django REST Framework
* SQLite

### Frontend

* React
* Vite
* JavaScript
* CSS

## Project Structure

```text
Masjid_system/
├── backend/
├── frontend/
├── .gitignore
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd Masjid_system
```

### 2. Backend Setup

```bash
cd backend

python -m venv venv

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt

python manage.py migrate

python manage.py createsuperuser

python manage.py runserver
```

Backend runs at:

```
http://127.0.0.1:8000/
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```
http://localhost:5173/
```

## Default Development Commands

Backend

```bash
python manage.py runserver
```

Frontend

```bash
npm run dev
```

## Git

Clone:

```bash
git clone <repository-url>
```

Commit:

```bash
git add .
git commit -m "Your message"
```

Push:

```bash
git push origin main
```

## License

This project is for learning and development purposes.

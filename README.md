# Tootr

Tootr is a social media app designed to match students (tootees) with personal tutors (tooters), inspired by the ease of ride-sharing and food delivery apps.

![tooter icon](https://raw.githubusercontent.com/cb299792458/tooter/main/react-app/public/apple-touch-icon.png)

## Table of Contents
- [Story](#story)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Story

From firsthand experience, it can be a difficult and lengthy process for a struggling student to find a tutor and set up a lesson. But it doesn't have to be.  
Inspired by ride sharing and food delivery apps, Tootr aims to quickly and easily arrange lessons for struggling students as needed, without the hassle associated with traditional tutoring.  
Tootr is structurally and aesthetically modeled after the app formerly known as Twitter, after its prior branding was abandoned due to the incompetence of its CEO.

## Features

- User authentication (signup, login, logout)
- Profile management for students and tutors
- Post, like, and reply to "toots"
- Direct messaging between users
- Search for tutors or students
- Follow/unfollow users
- Responsive, Twitter-like UI

## Tech Stack

- **Frontend:** React, JavaScript, CSS
- **Backend:** Python, Flask, SQLAlchemy
- **Database:** PostgreSQL
- **Migrations:** Alembic
- **Other:** WTForms, Docker (optional), Render (deployment)

## Getting Started

### Prerequisites

- Node.js & npm
- Python 3.8+
- PostgreSQL

### Backend Setup

```bash
cd app
pip install -r ../requirements.txt
# or use pipenv
pipenv install
# Set up environment variables (see .flaskenv for example)
flask db upgrade
flask run
```

### Frontend Setup

```bash
cd react-app
npm install
npm start
```

### Database

- Run migrations with Alembic: `flask db upgrade`
- (Optional) Seed the database: `python -m app.seeds.seeds`

## Usage

- Visit [Tootr Live](https://tootr.onrender.com) (if deployed)
- Or run locally at `http://localhost:3000` (frontend) and `http://localhost:5000` (backend)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Open a pull request

## License

[MIT](LICENSE) (or specify your license)

## Contact

Created by [Your Name](mailto:your.email@example.com) — feel free to reach out!

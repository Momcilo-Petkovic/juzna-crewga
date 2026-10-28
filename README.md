# Južna Crewga

Official website of **Južna Crewga**, an independent music studio run by three friends:
beat making, music production, lyrics, recording, mixing and mastering, plus music videos.
Visitors can meet the crew, listen to the songs we produced, check prices, browse the studio
and book a session through the contact form.

The site is in Serbian and English.

## The crew

| | Role |
|---|---|
| **Chillo** | beat making, music production, lyrics writing, mix engineering |
| **ONO** | beat making, music production, lyrics writing, mix engineering, mastering |
| **Ćofs** | lyrics writing, music video direction, screenwriting, video editing, visual effects |

## Features

- **Hexagon home button**: a fixed header with the JC logo in the middle, its tip hanging below the
  header like an arrow. On hover it glows from orange to blue.
- **Home**: four big animated cards (Kontakt, Ekipa, Cenovnik, Galerija) and a language picker (🇷🇸 / 🇬🇧).
- **Ekipa**: the crew with their roles, and "Naša produkcija", our songs with YouTube links, 5 per page.
- **Cenovnik**: all services and prices. "Naruči" opens the contact form with the message already
  written for that service, so the visitor only types their email.
- **Kontakt**: email validation, spam protection (honeypot), and a thank-you popup. Messages are saved in
  the database and emailed to the studio, with Reply-To set to the visitor.
- **Galerija**: masonry grid with a full-screen viewer (arrows, keyboard, swipe on phones).
- Responsive, keyboard accessible, respects "reduce motion".

## Tech stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, React Router, Vite, Tailwind CSS 4 |
| Backend | Java 21, Spring Boot 4 (Web MVC, Data JPA, Validation, Mail) |
| Database | MariaDB |
| Email | Gmail SMTP with an app password |

## Project structure

```
juzna-crewga/
├── frontend/
│   ├── public/                 logo, team photos, gallery images
│   └── src/
│       ├── pages/              Home, Team (Ekipa), Pricing (Cenovnik), Contact, Gallery
│       ├── components/         header, footer, language picker, icons, flags
│       ├── data/               team, songs, prices, gallery (edit content here)
│       ├── i18n/               Serbian and English texts
│       └── index.css           theme and animations
└── backend/
    ├── src/main/java/com/juznacrewga/backend/
    │   ├── contact/            contact form API: entity, repository, service, controller
    │   └── config/             CORS, error handling
    ├── src/main/resources/application.properties   (no secrets)
    └── application-local.properties                your local secrets (gitignored)
```

## Running it locally

Needs **Java 21**, **Node.js 22** and **MariaDB**.

**1. Database** (once, e.g. in HeidiSQL as root):

```sql
CREATE DATABASE IF NOT EXISTS juzna_crewga CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'juzna_crewga'@'localhost' IDENTIFIED BY 'choose-a-password';
CREATE USER IF NOT EXISTS 'juzna_crewga'@'127.0.0.1' IDENTIFIED BY 'choose-a-password';
GRANT ALL PRIVILEGES ON juzna_crewga.* TO 'juzna_crewga'@'localhost';
GRANT ALL PRIVILEGES ON juzna_crewga.* TO 'juzna_crewga'@'127.0.0.1';
FLUSH PRIVILEGES;
```

**2. Backend**: create `backend/application-local.properties` (next to `pom.xml`, gitignored):

```properties
spring.datasource.password=choose-a-password
```

Then start it from IntelliJ (`BackendApplication`) or with `.\mvnw spring-boot:run` in `backend`.
It runs on http://localhost:8080 and creates the tables by itself.

**3. Frontend**:

```
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. During development, Vite forwards `/api` calls to the backend.

## Gmail app password (contact form emails)

Without it the site still works, and messages are only saved in the database. To get emails:

1. Sign in to the studio Google account, open https://myaccount.google.com/security and turn on
   **2-Step Verification** (app passwords require it).
2. Open https://myaccount.google.com/apppasswords, type a name such as `Juzna Crewga website`
   and click **Create**.
3. Copy the 16-character password (spaces don't matter) into `backend/application-local.properties`:

   ```properties
   spring.mail.username=juznacrewgaofficial@gmail.com
   spring.mail.password=abcdefghijklmnop
   ```

4. Restart the backend and send a test message from the Kontakt page.

The app password only works for sending email from this app, and you can revoke it any time
on the same page. It lives in the gitignored local file, so it never reaches GitHub.

## Editing content

Texts, songs, prices and photos are plain data files, so no code changes are needed:

- `frontend/src/data/songs.js`: song titles and YouTube links
- `frontend/src/data/team.js` and `public/images/team/`: crew bios and photos
- `frontend/src/data/services.js`: prices
- `frontend/src/data/gallery.js` and `public/images/gallery/`: studio photos
- `frontend/src/i18n/translations.js`: every interface text, in Serbian and English

## Configuration (production)

| Variable | Purpose |
|---|---|
| `DB_URL`, `DB_USER`, `DB_PASSWORD` | database connection |
| `MAIL_USERNAME`, `MAIL_PASSWORD` | Gmail address and app password |
| `CONTACT_RECIPIENT` | where contact messages go (default: juznacrewgaofficial@gmail.com) |
| `ALLOWED_ORIGINS` | website address(es) allowed to call the API, comma-separated |
| `VITE_API_URL` | frontend build: API address, if the backend runs on another domain |

## Credits

Built by **Momčilo Petković (Chillo)**, with help from Claude (Anthropic).

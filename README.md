<div align="center">
<img src="https://img.shields.io/badge/-Node.js-black?style=for-the-badge&logo=node.js&logoColor=white&color=339933" alt="Node.js" />
<img src="https://img.shields.io/badge/-Express-black?style=for-the-badge&logo=express&logoColor=white&color=000000" alt="Express" />
<img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logo=mongodb&logoColor=white&color=47A248" alt="MongoDB" />
<img src="https://img.shields.io/badge/-Stripe-black?style=for-the-badge&logo=stripe&logoColor=white&color=635BFF" alt="Stripe" />
<img src="https://img.shields.io/badge/-Postman-black?style=for-the-badge&logo=postman&logoColor=white&color=FF6C37" alt="Postman" />
<img src="https://img.shields.io/badge/-Husky-black?style=for-the-badge&logo=git&logoColor=white&color=29C88E" alt="Husky" />

</div>

## <a name="table">Table of Contents</a>

1. [Introduction](#introduction)
2. [Quick Start](#quick-start)
3. [Conventions](#conventions)

## <a name="introduction">Introduction</a>

<div align="justify">
StormReach is a specialized Software-as-a-Service (SaaS) platform built for roofing contractors who sell and install storm damage replacement roofs. It delivers qualified homeowner appointments—set via live cold calls—directly to a contractor’s calendar. Unlike lead lists or shared marketplaces, StormReach functions as a fully managed appointment fulfillment engine. Roofers sign up, draw their target storm-affected zones, and our call center handles all the outreach. Appointments are booked in real-time, delivered directly to the client’s calendar, and paid for on a pay-as-you-go or bulk credit model.
</div>

## <a name="quick-start">Quick Start</a>

Follow these steps to set up and run the project locally on your machine.

### Cloning the Repository

```bash
git clone https://github.com/abrehan2/StormReach-Server.git
cd StormReach-Server
```

### Installation

Install the project dependencies using npm:

```bash
npm install
```

### Running the application locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:8000](http://localhost:8000) in your browser to view the project.

### Running the application locally using Docker

Ensure [Docker](https://www.docker.com/) is installed on your machine. Use the following commands to run the project with Docker:

```bash
# Stop any running containers
docker-compose down

# Build and start the containers
docker-compose up --build
```

The application will be available at [http://localhost:8000](http://localhost:8000).

## <a name="conventions">Conventions</a>

To maintain consistency and quality, StormReach follows strict conventions for branching, commits, and pull requests.

### Branch Naming

- Always branch from `dev`.
- Use the format: `ticket-number/concise-message` (e.g., `sto-21/enhance-readme`).
- Reference the ticket number from Linear (e.g., [STO-21](https://linear.app/stormreach/issue/STO-21/update-project-readme-documentation)).

### Commit Messages

Use the [Conventional Commits](https://www.conventionalcommits.org/) specification. The project is configured with `@commitlint/config-conventional`. Example commit message:

```bash
docs(readme): enhance documentation with detailed setup and conventions
```

Supported commit types:

- `build`: Changes affecting the build system or external dependencies.
- `ci`: Changes to CI configuration files and scripts.
- `docs`: Documentation-only changes.
- `feat`: New features.
- `fix`: Bug fixes.
- `perf`: Performance improvements.
- `refactor`: Code changes that neither fix bugs nor add features.
- `style`: Code style changes (e.g., formatting, missing semicolons).
- `test`: Adding or correcting tests.

Rules enforced by commitlint:

- Header max length: 100 characters.
- Body and footer max line length: 100 characters.
- Scope must be lowercase.
- Subject must not end with a period.
- Supported types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`, `translation`, `security`, `changeset`.

### Pull Requests

- PR title format: `ticket-number: title message (e.g., STO-21: Enhance project README documentation).`
- Include a description linking to the Linear ticket (e.g., [STO-21](https://linear.app/stormreach/issue/STO-21/update-project-readme-documentation)).
- Ensure all checks (linting, tests, build) pass before requesting a review.

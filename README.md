# Mailboxer Website

Interactive web interface for exploring actor communication patterns and behavioral types in Erlang. This project serves as a visualization tool for MSc research on Mailboxer - a static analysis tool that transpiles Erlang code to Pat and performs type checking to detect communication errors in actor-based systems.

**Note:** The tool is called "Mailboxer" in this interface but is known as "paterl" in the research literature. Paterl is an Erlang to Pat transpiler that enables static analysis of actor communication patterns.

## Technologies

**Frontend:**
- React 19 + TypeScript
- Vite (build tool)
- Bootstrap 5 + React Bootstrap
- Monaco Editor (code editor)
- React Router DOM

**Backend:**
- Node.js + Express
- Docker containerization

**Development:**
- ESLint + TypeScript ESLint
- Prettier (code formatting)

## Prerequisites

- Node.js (v18+)
- Docker

## Quick Start

**Local Development (No Sandbox Support):**
```bash
npm install
npm run dev
```

**Full Setup with Sandbox Support:**
```bash
chmod +x ./start-docker.sh
./start-docker.sh
```

> **Important:** Local development only provides the website interface. Full Mailboxer sandbox functionality requires the paterl Docker container, which is automatically set up by the start-docker.sh script. The script runs docker-compose to create a complete stack including both the website and the paterl analysis engine.

## Features

- Interactive examples of actor communication patterns
- Behavioral type visualization
- Erlang code sandbox for testing patterns (Docker only)
- Communication error detection demonstrations
- Academic research tool integration

> **Sandbox Functionality:** The Docker-enabled sandbox allows users to write and test Erlang code patterns, with real-time transpilation to Pat and static analysis using the Mailboxer/paterl type checker engine.

## Project Structure

```
src/
├── components/          # React components
│   ├── layout/         # Navigation and layout
│   └── pages/          # Application pages
├── services/           # Business logic
└── App.tsx            # Main application
```

## Research Context

This tool supports research into static analysis of actor-based systems, specifically focusing on Erlang to Pat transpilation and type checking for communication pattern validation and error detection in distributed Erlang applications.

## Installation

```bash
# Clone the repository
git clone https://github.com/ZubyWasTaken/mailboxer-website/
cd mailboxer-website

# Install dependencies
npm install
cd server && npm install && cd ..
```

## Development

```bash
# Frontend development
npm run dev

# Backend development
cd server && npm run dev

# Build for production
npm run build
```

## Contributing

This is an academic research project. For contributions or questions, please refer to the research documentation or contact the development team.

## License

This project is licensed under the terms specified in the LICENSE file.

## Acknowledgments

Developed as part of MSc research in Computer Science, focusing on static analysis of distributed systems.

## Related Resources

**Source Code:**
- [Original Mailboxer Implementation](https://github.com/duncanatt/paterl)
- [Dockerized Mailboxer Fork](https://github.com/ZubyWasTaken/paterl)
- [Website Source Code](https://github.com/ZubyWasTaken/mailboxer-website)

**Docker Images:**
- [Mailboxer Docker Image](https://hub.docker.com/repository/docker/zubywastaken/paterl/general)
- [Website Docker Image](https://hub.docker.com/repository/docker/zubywastaken/mailboxer-website/general)

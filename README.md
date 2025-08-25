# Mailboxer Website

Interactive web interface for exploring actor communication patterns and behavioral types in Erlang.

## Prerequisites

- Node.js (v18+)
- Docker

## Quick Start

```bash
# Development
## Does not support Mailboxer sandboxing
npm install
npm run dev

# Dockerized setup with full sandbox support to use Mailboxer
chmod +x ./start-docker.sh
./start-docker.sh
```

## What's This?

A visualization tool for my MSc research on mailboxer - a static analysis tool that detects communication errors in actor-based systems. The site includes interactive examples and a sandbox for testing Erlang code patterns.

Built with React + TypeScript.

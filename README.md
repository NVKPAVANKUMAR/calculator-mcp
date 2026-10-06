# Calculator MCP Server

A small, working Model Context Protocol (MCP) server written in TypeScript.

It exposes five MCP tools:

- `add(a, b)`
- `subtract(a, b)`
- `multiply(a, b)`
- `divide(a, b)`
- `square(a)`

## Prerequisites

- Node.js 20+
- npm

## Install

```bash
npm install
```

## Build

```bash
npm run build
```

## Run

```bash
npm start
```

The server uses stdio, so it waits for an MCP client. Seeing no normal output is expected.

Server diagnostics are written to stderr because stdout is reserved for MCP protocol traffic.

## Development mode

```bash
npm run dev
```

## Test with MCP Inspector

Run:

```bash
npm run inspect
```

This starts the MCP Inspector and launches this server through stdio.

In the Inspector:

1. Connect to the server.
2. Open the **Tools** section.
3. You should see:
   - `add`
   - `subtract`
   - `multiply`
   - `divide`
   - `square`
4. Try `add` with `a=10`, `b=20`.
5. Expected result: `10 + 20 = 30`.
6. Try `square` with `a=5`.
7. Expected result: `5² = 25`.
8. Try `divide` with `a=10`, `b=0`.
9. Expected result: an MCP tool error saying division by zero is not allowed.

## MCP client configuration

After publishing this package to npm, another user can configure a compatible MCP client using:

```json
{
  "mcpServers": {
    "calculator": {
      "command": "npx",
      "args": ["-y", "sample-calculator-mcp"]
    }
  }
}
```

For local development, point the client to the local project instead:

```json
{
  "mcpServers": {
    "calculator": {
      "command": "npx",
      "args": ["tsx", "C:\\path\\to\\calculator-mcp\\src\\index.ts"]
    }
  }
}
```

Use the correct path for your machine.

## Publishing to npm

First create an npm account and log in:

```bash
npm login
```

Build:

```bash
npm run build
```

Check what will be published:

```bash
npm pack --dry-run
```

Publish:

```bash
npm publish
```

After publishing, users can run:

```bash
npx -y sample-calculator-mcp
```

## Project structure

```text
calculator-mcp/
├── src/
│   └── index.ts
├── package.json
├── tsconfig.json
├── .gitignore
├── README.md
└── LICENSE
```

## How MCP works here

```text
LLM / MCP Host
       |
       v
   MCP Client
       |
      stdio
       |
       v
Calculator MCP Server
       |
   +---+---+---+---+
   |   |   |   |   |
  add sub mul div square
```

The MCP server exposes tools. The MCP client discovers those tools and sends tool calls. The server executes the calculation and returns the result.

## Important

Do not use `console.log()` for application/debug output in a stdio MCP server. stdout is used by the MCP protocol. Use `console.error()` for diagnostics.

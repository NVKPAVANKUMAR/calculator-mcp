import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";

function createServer() {
  const server = new McpServer({
    name: "sample-calculator-mcp",
    version: "1.0.0",
  });

  server.registerTool(
    "add",
    {
      description: "Add two numbers",
      inputSchema: z.object({
        a: z.number(),
        b: z.number(),
      }),
    },
    async ({ a, b }) => ({
      content: [{ type: "text", text: `${a} + ${b} = ${a + b}` }],
    }),
  );

  server.registerTool(
    "subtract",
    {
      description: "Subtract the second number from the first number",
      inputSchema: z.object({
        a: z.number(),
        b: z.number(),
      }),
    },
    async ({ a, b }) => ({
      content: [{ type: "text", text: `${a} - ${b} = ${a - b}` }],
    }),
  );

  server.registerTool(
    "multiply",
    {
      description: "Multiply two numbers",
      inputSchema: z.object({
        a: z.number(),
        b: z.number(),
      }),
    },
    async ({ a, b }) => ({
      content: [{ type: "text", text: `${a} × ${b} = ${a * b}` }],
    }),
  );

  server.registerTool(
    "divide",
    {
      description: "Divide the first number by the second number",
      inputSchema: z.object({
        a: z.number(),
        b: z.number(),
      }),
    },
    async ({ a, b }) => {
      if (b === 0) {
        return {
          isError: true,
          content: [{ type: "text", text: "Error: Cannot divide by zero." }],
        };
      }

      return {
        content: [{ type: "text", text: `${a} ÷ ${b} = ${a / b}` }],
      };
    },
  );

  return server;
}

console.error("Calculator MCP server starting...");
void serveStdio(createServer);

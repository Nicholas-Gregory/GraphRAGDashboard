import { Neo4jContainer } from "@testcontainers/neo4j";
import { spawn } from "node:child_process";
import 'dotenv/config';

const run = async () => {
  const container = await new Neo4jContainer("neo4j:5.12.0-enterprise")
  .withEnvironment({ NEO4J_ACCEPT_LICENSE_AGREEMENT: "yes" })
  .withPassword(process.env.NEO4J_TEST_PASSWORD)
  .start();

  const dbUrl = container.getBoltUri();

  const testProcess = spawn('node', [
    '--import', 'tsx',
    '--test', '--test-concurrency=1',
    'tests/**/*.test.ts'
  ], {
    stdio: 'inherit',
    env: { ...process.env, TEST_DB_URL: dbUrl}
  });

  testProcess.on('close', async (code) => {
    await container.stop();
    process.exit(code ?? 0);
  });
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
})
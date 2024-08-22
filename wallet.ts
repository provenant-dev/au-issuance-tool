import signify, { Operation, SignifyClient } from "signify-ts";

// const url = 'http://127.0.0.1:3901'; // keria admin url
// const bootUrl = 'http://127.0.0.1:3903'; // keria admin url
// const witnessAids = ['BE8KZY7lh1Oa4E56jTgKYr5kkyti_dlaJ4sNt1jAnhBu', 'BDqEc5O_NITu5ypOYYsKj0P1mV08gcfRFnN0GgynBxbH', 'BDlPtHI-EQPtHKeCuw_Jfz5XrDFy1wxCoJVVSWD17MCZ'];

let KERIA_URL: string = process.env.KERIA_URL as string
let BOOT_URL: string = process.env.BOOT_URL as string
let WITS: string[] = (process.env.WITS as string).split(',')


async function connectWallet(url: string, bootUrl: string) {
  const client = new signify.SignifyClient(
      url,
      signify.randomPasscode(),
      signify.Tier.low,
      bootUrl
  );

  await client.boot();
  await client.connect();

  const state = await client.state();
  console.log('Client connected to agent: ');
  console.log(
      `  Client AID:  ${ state.controller.state.i },  Agent AID: ${ state.agent.i }`
  );
  return client;
}

/**
 * Poll for operation to become completed
 */
async function waitOperation<T>(
    client: SignifyClient,
    op: Operation<T>,
    retries: number = 10
): Promise<Operation<T>> {
  const WAIT = 1000;
  while (retries-- > 0) {
    op = await client.operations().get(op.name);
    if (op.done === true) return op;
    await sleep(WAIT);
  }
  throw new Error(`Timeout: operation ${ op.name }`);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function createIdentifier(
    client: signify.SignifyClient,
    name: string,
    witnesses: string[]
) {
  if (!client.agent) {
    throw new Error('No agent on client');
  }

  const icpResult = await client.identifiers().create(name, {
    transferable: false,
    toad: witnesses.length,
    wits: witnesses
  });
  const op = await icpResult.op();
  await waitOperation(client, op);

  const aid = await client.identifiers().get(name);

  await client.identifiers().addEndRole(name, 'agent', client.agent.pre);

  console.log(`  New AID created, Alias: ${ name }  AID: ${ aid.prefix }`);
  return aid.prefix;
}

export const initWallet = async (alias: any) => {
  await signify.ready()
  console.log('Connect to the wallet')
  const client = await connectWallet(KERIA_URL, BOOT_URL)
  console.log('Сreate identifier')
  const aid = await createIdentifier(client, alias, WITS)
  return {client, alias, aid}
}

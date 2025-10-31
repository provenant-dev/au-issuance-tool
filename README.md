# How to run

## Prerequisites

You'll need these installed:

- Node v18, or higher
- Typescript
- Docker Compose

## Steps

### Get Keria & Witnesses Running

- `cp .env.example .env`
- `mkdir -p storage/keria storage/witness-1 storage/witness-2 reports`
- `sudo chown -R 1001:1001 storage/ reports/`
- `docker compose up`
- Leave this running until you're finished entirely with next section.
- When finished, hit Ctrl+C to exit.

At this point, you can run the next section as many times as needed to generate the au that are needed.

### Issue One Or More Aus

- Follow these steps in a different terminal.
- `npm i`
- `./issue-au.sh`

## Output

Result will appear in console:

```bash
$ ./issue-au.sh
Connect to the wallet
passcode=**************
AID=*****************************************
PRIVATE KEY=*****************************************
PUBLIC KEY=*****************************************
AU issued
```

## How to debug in IDE

- Uncomment line in .env that are for debugging in IDE
- Use launch config in .vscode/launch.json and run debugger via IDE debug option

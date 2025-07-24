# How to run

## Steps

- Install node v18. Recommended way to install node is via [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md#installing-and-updating)
- `cp .env.example .env`
- `docker compose up`
- Optional, if using nvm, then `nvm use`
- `npm i`
- `chmod +x issue-au.sh`
- `./issue-au.sh`
- Make sure to add generated data in this file [keys/keys.md](./keys/keys.md) and commit changes to main branch

## Output

Result will appear in console:

```bash
AID=*****************************************
PUBLIC KEY=*****************************************
PRIVATE KEY=*****************************************
AU issued
```

## How to debug in IDE

- Uncomment line in .env that are for debugging in IDE
- Use launch config in .vscode/launch.json and run debugger via IDE debug option

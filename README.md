Prerequisites:

- node
- npm
- npx (>=10.3.0)
- Run KERIA and Witnesses

Please set URL and witnesses AIDs in `.env` corresponding to your environment. Note that AID should be comma separated, without spaces.
See `.env.example` file.

```env
BOOT_URL=http://127.0.0.1:3903
KERIA_URL=http://127.0.0.1:3901
WITS=comma,separated,aids
```

Open terminal at root project dir and install dependencies:

```shell
npm i
chmod +x issue-au.sh
```

Then run the script:

```shell
./issue-au.ts
```

Result will appear in console:

```
AID=*****************************************
PUBLIC KEY=*****************************************
PRIVATE KEY=*****************************************
AU issued
```


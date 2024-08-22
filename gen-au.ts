import signify, {SignifyClient} from "signify-ts"
import {initWallet} from './wallet'

//KERIA_URL=http://127.0.0.1
//WITS=BE8KZY7lh1Oa4E56jTgKYr5kkyti_dlaJ4sNt1jAnhBu,BDqEc5O_NITu5ypOYYsKj0P1mV08gcfRFnN0GgynBxbH,BDlPtHI-EQPtHKeCuw_Jfz5XrDFy1wxCoJVVSWD17MCZ

const ISSUER = 'issuer'


async function run() {
    await signify.ready()

    const issuer = await initWallet(ISSUER)

    await presentTheWallet(issuer.client)

}

async function presentTheWallet(client: SignifyClient) {
    let ident = await client.identifiers().get(ISSUER)
    let keyValue = client.manager?.get(ident)
    let rawPrivKey = keyValue.signers[0].raw
    let rawPubKey = keyValue.signers[0].verfer.raw
    console.log()
    console.log("============ AU User Creds ============")
    console.log(`AID=${keyValue.signers[0].verfer.qb64}`)
    console.log(`PUBLIC KEY=${Buffer.from(rawPubKey).toString('base64url')}`)
    console.log(`PRIVATE KEY=${Buffer.from(rawPrivKey).toString('base64url')}`)
}

run().then(r => console.log("AU issued"))

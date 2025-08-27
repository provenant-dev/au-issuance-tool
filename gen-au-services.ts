// Load environment variables from .env file first
import * as dotenv from 'dotenv'
dotenv.config()

import signify, { SignifyClient } from "signify-ts"
import { initWallet } from './wallet'
import yaml from 'js-yaml'

const ISSUER = 'issuer'


const SVC_LIST = [
    'AGENT',
    'APPT_COORD',
    'CONFIG_MANAGER',
    'DEMO_ID_VERIFIER',
    'HSSV_DECISION_LOG',
    'ID_VERIFICATION',
    'L10N',
    'NOTIFICATION',
    'ORG',
    'QVI_SHIM',
    'SIGNING_SIP',
    'SIGNING',
    'SMS_CONFIG',
    'STATE_MACHINE',
    'USER_MGMT',
    'VERIFICATION_BRIDGE',
    'VERIFICATION',
    'VERIFY_SIP',
    'WEBMEET',
    'WORKFLOW',

    // agents
    'RANGEHOLDER_SHIM_V2',
    'AUDIOCODES_SHIM',
    'RANGEHOLDER_SHIM',
    'PROVENANT_AUTOMATED_VETTER_SHIM',
    'QVI_SHIM_V2',
    'REGULATOR_SHIM',
]

async function run() {
    await signify.ready()

    const svcWallets: Record<string, any> = {origin_auth:{}}

    await Promise.all(
        SVC_LIST.map(async (svc) => {
            console.log(`Presenting wallet for service: ${svc}`)

            const issuer = await initWallet(ISSUER)
            const wallet = await presentTheWallet(issuer.client)

            svcWallets.origin_auth[`${svc}_SVC_AUTH_PRIVATE_KEY`] = wallet.PRIVATE_KEY
            svcWallets.origin_auth[`${svc}_SVC_AUTH_PUBLIC_KEY`] = wallet.PUBLIC_KEY
            svcWallets.origin_auth[`${svc}_SVC_AUTH_AID`] = wallet.AID
            console.log(wallet)
        })
    )

    console.log(yaml.dump(svcWallets))
}

async function presentTheWallet(client: SignifyClient) {
    let ident = await client.identifiers().get(ISSUER)
    let keyValue = client.manager?.get(ident)
    let rawPrivKey = keyValue.signers[0].raw
    let rawPubKey = keyValue.signers[0].verfer.raw
    
    return {
        AID: keyValue.signers[0].verfer.qb64,
        PUBLIC_KEY: Buffer.from(rawPubKey).toString('base64url'),
        PRIVATE_KEY: Buffer.from(rawPrivKey).toString('base64url')
    }
}

run().then(r => console.log("AU issued"))

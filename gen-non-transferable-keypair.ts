import signify from "signify-ts";

/**
 * Generate a keypair offline without needing KERIA or witnesses.
 * This creates an Ed25519 keypair using signify-ts primitives.
 * 
 * Usage: npx ts-node gen-keypair.ts
 */
async function generateKeypairOnly() {
    await signify.ready();
    
    // Create a new Salter with random raw bytes (no passcode needed)
    const salter = new signify.Salter({});
    // Use transferable=false for non-transferable key (B prefix AID)
    const signer = salter.signer(signify.MtrDex.Ed25519_Seed, false);
    
    console.log(`Salt (qb64): ${salter.qb64}`);
    console.log(`AID (Public Key CESR): ${signer.verfer.qb64}`);
    console.log(`Private Key (base64url): ${Buffer.from(signer.raw).toString('base64url')}`);
    console.log(`Public Key (base64url): ${Buffer.from(signer.verfer.raw).toString('base64url')}`);
    
    return {
        salt: salter.qb64,
        aid: signer.verfer.qb64,
        privateKey: Buffer.from(signer.raw).toString('base64url'),
        publicKey: Buffer.from(signer.verfer.raw).toString('base64url'),
        signer
    };
}

// Run if executed directly
generateKeypairOnly().catch(console.error);

export { generateKeypairOnly };

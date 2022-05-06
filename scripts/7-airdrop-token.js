import sdk from "./1-initialize-sdk.js";

const editionDrop = sdk.getEditionDrop("0x43CFfFcaA612A6Ef78c2301E140056AE95793458");

const token = sdk.getToken("0xa011f276F2c4d5875BC2B53f5bBa5037632E9cd8");

(async () => {
    try {
      const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);
  
      if (walletAddresses.length === 0) {
        console.log(
          "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
        );
        process.exit(0);
      }
  
      const airdropTargets = walletAddresses.map((address) => {
        const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
        console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

        const airdropTarget = {
          toAddress: address,
          amount: randomAmount,
        };
  
        return airdropTarget;
      });

      console.log("🌈 Starting airdrop...");
      await token.transferBatch(airdropTargets);
      console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
    } catch (err) {
      console.error("Failed to airdrop tokens", err);
    }
  })();
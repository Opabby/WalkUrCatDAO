import sdk from "./1-initialize-sdk.js";

const vote = sdk.getVote("0xA4BEB65b990E3B4ba32cE12F9aDe6107Cb4EF2aE");

const token = sdk.getToken("0xa011f276F2c4d5875BC2B53f5bBa5037632E9cd8");

(async () => {
    try {
        await token.roles.grant("minter", vote.getAddress());

        console.log(
            "Successfully gave vote contract permissionns to act on token contract"
        );
    } catch (error) {
        console.error("Failed to grant vote contract permissions on token contract", error);
        process.exit(1);
    }

    try {
        const ownedTokenBalance = await token.balanceOf(process.env.WALLET_ADDRESS);

        const ownedAmount = ownedTokenBalance.displayValue;
        const percent90 = Number(ownedAmount) / 100 * 90;

        await token.transfer(
            vote.getAddress(),
            percent90
        );

        console.log("✅ Successfully transferred " + percent90 + " tokens to vote contract");
    } catch(err) {
        console.error("Failed to transfer tokens to vote contract", err);
    }
})();
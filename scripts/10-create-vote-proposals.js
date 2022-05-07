import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

const vote = sdk.getVote("0xA4BEB65b990E3B4ba32cE12F9aDe6107Cb4EF2aE");

const token = sdk.getToken("0xa011f276F2c4d5875BC2B53f5bBa5037632E9cd8");

(async () => {
    try {
        const amount = 420_000;
        const description = "Should the DAO mint an additional " + amount + " tokens into the treasury?";
        const executions = [
            {
                toAddress: token.getAddress(),
                nativeTokenValue: 0,
                transactionData: token.encoder.encode(
                    "mintTo", [
                        vote.getAddress(),
                        ethers.utils.parseUnits(amount.toString(), 18),
                    ]
                ),
            }
        ];

        await vote.propose(description, executions);

        console.log("✅ Successfully created proposal to mint tokens");
    } catch (error) {
        console.error("Failed to create first proposal", error);
        process.exit(1);
    }

    try {
        const amount = 6_900;
        const description = "Should the DAO transfer " + amount + " tokens from the treaury to " + process.env.WALLET_ADDRESS + " for being awesome?";
        const executions = [
            {
                nativeTokenValue: 0,
                transactionData: token.encoder.encode(
                    "transfer",
                    [
                        process.env.WALLET_ADDRESS,
                        ethers.utils.parseUnits(amount.toString(), 18),
                    ]
                ),
                toAddress: token.getAddress(),
            },
        ];

        await vote.propose(description, executions);

        console.log(
            "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
        );
    } catch(error) {
        console.error("Failed to create second proposal", error);
    }
})();
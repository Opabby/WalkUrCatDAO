import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0xa011f276F2c4d5875BC2B53f5bBa5037632E9cd8");

(async () => {
    try {
        const amount = 1000000;
        await token.mint(amount);
        const totalSupply = await token.totalSupply();

        console.log("✅ There now is", totalSupply.displayValue, "WHI$KERS in circulation");
    } catch (error) {
        console.error("Failed to print money", error);
    }
})();
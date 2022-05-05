import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";

const editionDrop = sdk.getEditionDrop("0x43CFfFcaA612A6Ef78c2301E140056AE95793458");

(async () => {
    try {
        const claimConditions = [{
            startTime: new Date(),
            maxQuantity: 50_000,
            price: 0,
            quantityLimitPerTransaction: 1,
            waitInSeconds: MaxUint256,
        }]

        await editionDrop.claimConditions.set("0", claimConditions);
        console.log("✅ Successfully set claim condition!");
    } catch (error) {
        console.error("Failed to set claim condition", error);
    }
})();
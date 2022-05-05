import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0x43CFfFcaA612A6Ef78c2301E140056AE95793458");

(async () => {
    try {
        await editionDrop.createBatch([
            {
                name: "Playful Kitty",
                description: "This NFT will give you access to WalkUrCatDAO!",
                image: readFileSync("scripts/assets/kat.gif"),
            },
        ]);
        console.log("✅ Successfully created a new NFT in the drop!");
    } catch(error) {
        console.error("failed to create the new NFT", error);
    }
})();

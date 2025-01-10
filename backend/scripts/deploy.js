const hre = require("hardhat");
const fs = require("fs/promises")

async function main() {
    const Voting = await hre.ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();

    await voting.waitForDeployment();
    await writeDeploymentInfo(voting, "Voting.json");

}

async function writeDeploymentInfo(contract, filename = "") {

    const data = {
        contract: {
            address: await contract.getAddress(),
            signerAddress: await contract.runner.getAddress(),
            abi: contract.interface.format(),
        },
    };

    const content = JSON.stringify(data, null, 2);
    await fs.writeFile(filename, content, { encoding: "utf8" });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
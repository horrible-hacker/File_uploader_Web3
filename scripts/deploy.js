const hre = require("hardhat");
async function main()
{
    //const [owner] = await hre.ethers.getSigners(); // Get the deployer
    const Upload = await hre.ethers.getContractFactory("Upload");
    const upload = await Upload.deploy();
    await upload.waitForDeployment();
    //console.log("Deployer address:", owner.address);
    console.log("token address:", await upload.getAddress());
}
main()
.then(()=>process.exit(0))
.catch((error)=>{
    console.error(error);
    process.exit(1);
});
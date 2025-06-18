const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
//const {ethers} = require("ethers");

describe("upload", function()
{
  it("length of value should be 0",async function()
  {
    const [owner] = await ethers.getSigners(); // Get the deployer
    const Upload = await ethers.getContractFactory("Upload");
    const upload = await Upload.deploy();

    console.log("Deployer address:", owner.address);

    // Call the helper function to check the length of `value[owner]`
    const length = await upload.getValueLength(owner.address);
    expect(length).to.equal(0);
  })

  it("should add url",async function()
  {
    const [owner,addr1] = await ethers.getSigners(); // Get the deployer
    const Upload = await ethers.getContractFactory("Upload");
    const upload = await Upload.deploy();

    await upload.add(owner.address,"this is address 1");
    //console.log("Deployer address: 1", a.address);
    await upload.connect(addr1).add(addr1.address,"this is mess 2");
    // Call the helper function to check the length of `value[owner]`
    const ans1 = await upload.connect(addr1).display(addr1.address);
    const ans2 = await upload.display(owner.address);
    //console.log("Deployer ans: 1", ans);
    expect(ans1).to.deep.equal(["this is mess 2"]);
    expect(ans2).to.deep.equal(["this is address 1"]);
  }
  )

  it("should give access to someone",async function () {
    const [owner,addr1] = await ethers.getSigners(); // Get the deployer
    const Upload = await ethers.getContractFactory("Upload");
    const upload = await Upload.deploy();
    await upload.allow(addr1.address);
    const ans = await upload.shareAccess();
    expect(ans[0].user).to.equal(addr1.address);
    expect(ans[0].access).to.equal(true);

  })
});
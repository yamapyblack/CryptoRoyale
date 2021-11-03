import "@nomiclabs/hardhat-waffle";
import { ethers } from "hardhat";
import { expect, use } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

let owner: SignerWithAddress;
let addr1: SignerWithAddress;
let addr2: SignerWithAddress;

//test contracts and parameters
import { ERC721UpgradeableMock } from "typechain/ERC721UpgradeableMock";
import { ERC721UpgradeableMock2 } from "typechain/ERC721UpgradeableMock2";
import { CKAdmin } from "typechain/CKAdmin";
import { CKProxy } from "typechain/CKProxy";

describe("testing for ERC721UpgradeableMock", async () => {
  let xMock:ERC721UpgradeableMock
  let xMock2:ERC721UpgradeableMock2
  let ckAdmin: CKAdmin;
  let ckProxy: CKProxy;

  beforeEach(async () => {
    const signers = await ethers.getSigners();
    owner = signers[0];
    addr1 = signers[1];
    addr2 = signers[2];

    const ERC721UpgradeableMock = await ethers.getContractFactory(
      "ERC721UpgradeableMock"
    )
    const logic = await ERC721UpgradeableMock.deploy()
    await logic.deployed();

    const CKAdmin = await ethers.getContractFactory("CKAdmin");
    ckAdmin = (await CKAdmin.deploy()) as CKAdmin;
    await ckAdmin.deployed();

    const CKProxy = await ethers.getContractFactory("CKProxy");
    ckProxy = (await CKProxy.deploy(
      logic.address,
      ckAdmin.address,
      ethers.utils.toUtf8Bytes("")
    )) as CKProxy;
    await ckProxy.deployed();

    xMock = (await ethers.getContractAt(
        "ERC721UpgradeableMock",
        ckProxy.address
    )) as ERC721UpgradeableMock;
    await xMock.initialize("ERC721UpgradeableMock", "UPG");

    await xMock.mint(addr1.address, 1)
});

  describe("ownerOf", async () => {
    it("success", async () => {
    
        expect(await xMock.ownerOf(1)).equal(addr1.address)
        expect(await xMock.symbol()).equal("UPG")

    });

    it("upgrade", async () => {
        
        const ERC721UpgradeableMock2 = await ethers.getContractFactory(
            "ERC721UpgradeableMock2"
        );
        const logic2 = await ERC721UpgradeableMock2.deploy()
        await logic2.deployed();
        await logic2.initialize("ERC721UpgradeableMock2", "UPG2")

        await ckAdmin.upgrade(ckProxy.address, logic2.address)

        xMock2 = (await ethers.getContractAt(
            "ERC721UpgradeableMock2",
            ckProxy.address
        )) as ERC721UpgradeableMock2
        // await xMock2.initialize("ERC721UpgradeableMock2", "UPG2");

        // expect(await xMock.symbol()).equal("UPG2")
        expect(await xMock2.ownerOf(1)).equal(addr1.address)

        await xMock2.countup()
        expect(await xMock2.counter()).equal(1)

    });



        

  });
});

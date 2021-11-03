import "@nomiclabs/hardhat-waffle"
import { ethers } from 'hardhat'
import { expect, use } from 'chai'
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address"

let owner: SignerWithAddress
let addr1: SignerWithAddress
let addr2: SignerWithAddress

//test contracts and parameters
import { CKMineral } from "typechain/CKMineral"
import { CKCastle } from "typechain/CKCastle"
import { CKMineralClaim } from "typechain/CKMineralClaim"

describe("testing for CKMineralClaim", async () => {
    let c1: CKMineral
    let c2: CKCastle
    let c3: CKMineralClaim

    beforeEach(async () => {
        const signers = await ethers.getSigners()
        owner = signers[0]
        addr1 = signers[1]
        addr2 = signers[2]

        const CKMineral = await ethers.getContractFactory("CKMineral");
        c1 = (await CKMineral.deploy("CKMineral","CKM")) as CKMineral
        await c1.deployed()

        const CKCastle = await ethers.getContractFactory("CKCastle");
        c2 = (await CKCastle.deploy(addr2.address)) as CKCastle
        await c2.deployed()

        const CKMineralClaim = await ethers.getContractFactory("CKMineralClaim");
        c3 = (await CKMineralClaim.deploy(c2.address, c1.address)) as CKMineralClaim
        await c3.deployed()

        await c1.grantRole(await c1.MINTER_ROLE(), c3.address)
    })

    describe("claim", async () => {
        it("fail", async () => {
            await expect(c3.claim(1)).to.be.reverted
        });

        it("success", async () => {
            await c2["mint(address,uint256)"](addr1.address,1)
            await c3.connect(addr1).claim(1)

            expect(await c1.balances(1)).equal(ethers.utils.parseEther("0.1"))
        });
    });
});

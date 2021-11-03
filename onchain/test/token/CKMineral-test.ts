import "@nomiclabs/hardhat-waffle"
import { ethers } from 'hardhat'
import { expect, use } from 'chai'
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address"

let owner: SignerWithAddress
let addr1: SignerWithAddress
let addr2: SignerWithAddress

//test contracts and parameters
import { CKMineral } from "typechain/CKMineral"

describe("testing for CKMineral", async () => {
    let contract: CKMineral

    beforeEach(async () => {
        const signers = await ethers.getSigners()
        owner = signers[0]
        addr1 = signers[1]
        addr2 = signers[2]

        const CKMineral = await ethers.getContractFactory("CKMineral");
        contract = (await CKMineral.deploy("CKMineral","CKM")) as CKMineral
        await contract.deployed()
    })

    describe("mint", async () => {
        it("fail onlyRole", async () => {
            await expect(contract.connect(addr1).mint(1,1)).to.be.reverted;
        });

        it("success", async () => {
            await contract.mint(1,20)
            expect(await contract.balances(1)).equal(20)
        });
        
    });

    describe("burn", async () => {
        it("fail onlyRole", async () => {
            await expect(contract.connect(addr1).burn(1,1)).to.be.reverted;
        });

        it("success", async () => {
            await contract.mint(1,20)
            await contract.burn(1,5)
            expect(await contract.balances(1)).equal(15)
            await contract.mint(2,15)
            expect(await contract.totalSupply()).equal(30)
        });
        
    });
});

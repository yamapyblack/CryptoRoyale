import "@nomiclabs/hardhat-waffle"
import { ethers } from 'hardhat'
import { expect, use } from 'chai'
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address"

let owner: SignerWithAddress
let addr1: SignerWithAddress
let addr2: SignerWithAddress

//test contracts and parameters
import { CKCastle } from "typechain/CKCastle"
import { CKTokenDescriptor } from "typechain/CKTokenDescriptor"

describe("testing for CKCastle", async () => {
    let contract: CKCastle
    let descriptor: CKTokenDescriptor

    beforeEach(async () => {
        const signers = await ethers.getSigners()
        owner = signers[0]
        addr1 = signers[1]
        addr2 = signers[2]

        const CKTokenDescriptor = await ethers.getContractFactory("CKTokenDescriptor");
        descriptor = (await CKTokenDescriptor.deploy()) as CKTokenDescriptor
        await descriptor.deployed()

        const CKCastle = await ethers.getContractFactory("CKCastle");
        contract = (await CKCastle.deploy(descriptor.address)) as CKCastle
        await contract.deployed()
    })

    describe("tokenURI", async () => {

        it("success", async () => {
            const tokenId = 1
            await contract["mint(address,uint256)"](addr1.address, tokenId)
            const m = await contract.tokenURI(tokenId)
            console.log(m)

            const m2 = m.split(",")[1]
            const m3 = ethers.utils.toUtf8String(ethers.utils.base64.decode(m2))

        });

        
    });

});

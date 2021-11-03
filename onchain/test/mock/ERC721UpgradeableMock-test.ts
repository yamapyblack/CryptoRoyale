import "@nomiclabs/hardhat-waffle"
import { ethers } from 'hardhat'
import { expect, use } from 'chai'
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address"

let owner: SignerWithAddress
let addr1: SignerWithAddress
let addr2: SignerWithAddress

//test contracts and parameters
import { ERC721UpgradeableMock } from "typechain/ERC721UpgradeableMock"

describe("testing for ERC721UpgradeableMock", async () => {
    let contract: ERC721UpgradeableMock

    beforeEach(async () => {
        const signers = await ethers.getSigners()
        owner = signers[0]
        addr1 = signers[1]
        addr2 = signers[2]

        const ERC721UpgradeableMock = await ethers.getContractFactory("ERC721UpgradeableMock");
        contract = (await ERC721UpgradeableMock.deploy()) as ERC721UpgradeableMock
        await contract.deployed()
        await contract.initialize()
    })

    describe("tokenURI", async () => {

        it("success", async () => {
            const name = await contract.name()
            console.log('name',name)

        });

        
    });

});

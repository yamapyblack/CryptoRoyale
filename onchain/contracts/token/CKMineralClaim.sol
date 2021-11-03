// SPDX-License-Identifier: MIT

pragma solidity 0.8.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../interfaces/ICKMineral.sol";

contract CKMineralClaim {

    address public castle;
    address public mineral;

    constructor(address _castle, address _mineral){
        castle = _castle;
        mineral = _mineral;
    }

    function claim(uint256 _tokenId) external {
        require(IERC721(castle).ownerOf(_tokenId) == msg.sender, "claim by not owner");
        ICKMineral(mineral).mint(_tokenId, 0.1 ether);
    }

}

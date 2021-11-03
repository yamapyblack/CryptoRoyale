// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

contract ERC721UpgradeableMock is ERC721Upgradeable {

	function initialize(string memory name, string memory symbol) external initializer {
		__ERC721_init(name, symbol);
	}

    function mint(address to, uint256 tokenId) public {
        super._mint(to, tokenId);
    }
}

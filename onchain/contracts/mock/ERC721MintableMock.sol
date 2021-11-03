// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../lib/ERC721Mintable.sol";

contract ERC721MintableMock is ERC721Mintable {
    constructor() ERC721Mintable("ERC721MintableMock", "MOCK") {}

}

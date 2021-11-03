// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

contract CKProxy is TransparentUpgradeableProxy {
	constructor(
		address _logic,
		address _admin,
		bytes memory _data
	) TransparentUpgradeableProxy(_logic, _admin, _data) {}
}

// SPDX-License-Identifier: MIT

pragma solidity 0.8.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

contract CKMineral is AccessControlEnumerable, IERC20, IERC20Metadata {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    string public override name;
    string public override symbol;
    uint8 public override decimals = 18;

    uint256 private _totalSupply = 0;

    event Balance(uint256 indexed _tokenId, uint256 _fromAmount, uint256 _toAmount);

    // castle'tokenId => balance
    mapping(uint256 => uint256) public balances;

    constructor(string memory name_, string memory symbol_) {
        name = name_;
        symbol = symbol_;

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        _setupRole(BURNER_ROLE, msg.sender);
    }

    function balanceOf(address account)
        public
        view
        virtual
        override
        returns (uint256)
    {
        return 0;
    }

    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    function transfer(address recipient, uint256 amount)
        public
        virtual
        override
        returns (bool)
    {
        return true;
    }

    function allowance(address owner, address spender)
        public
        view
        virtual
        override
        returns (uint256)
    {
        return 0;
    }

    function approve(address spender, uint256 amount)
        public
        virtual
        override
        returns (bool)
    {
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public virtual override returns (bool) {
        return true;
    }

    function _mint(uint256 _tokenId, uint256 _amount) internal virtual {
        require(_tokenId > 0, "_tokenId 0");

        _totalSupply += _amount;
        balances[_tokenId] += _amount;

        emit Balance(_tokenId, _amount, 0);
    }

    function _burn(uint256 _tokenId, uint256 _amount) internal virtual {
        require(_tokenId > 0, "_tokenId 0");

        uint256 accountBalance = balances[_tokenId];
        require(
            accountBalance >= _amount,
            "ERC20: burn amount exceeds balance"
        );

        balances[_tokenId] = accountBalance - _amount;
        _totalSupply -= _amount;

        emit Balance(_tokenId, 0, _amount);
    }

    function mint(uint256 _tokenId, uint256 _amount)
        external
        onlyRole(MINTER_ROLE)
    {
        _mint(_tokenId, _amount);
    }

    function burn(uint256 _tokenId, uint256 _amount)
        external
        onlyRole(BURNER_ROLE)
    {
        _burn(_tokenId, _amount);
    }
}

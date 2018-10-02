pragma solidity 0.4.25;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Capped.sol";


/**
 * @title Network Token - pilot version
 * @dev ERC20 Token
 */
contract NetworkToken is ERC20, ERC20Capped {
  string public constant name = "Network Token (Pilot)";
  string public constant symbol = "NT";
  uint8 public constant decimals = 18;
  string public constant baseUnit = "nt";

  /**
   * @dev Constructor.
   */
  constructor() ERC20Capped(100 * 10**9 * 10**uint256(decimals)) public {}
}
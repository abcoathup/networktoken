var NetworkToken = artifacts.require("./NetworkToken.sol");

module.exports = function(deployer) {
  deployer.deploy(NetworkToken);
};

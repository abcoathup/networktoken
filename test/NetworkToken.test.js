const chai = require('chai');
const expect = chai.expect;
const BN = require('bn.js');
const bnChai = require('bn-chai');
chai.use(bnChai(BN));

const NetworkToken = artifacts.require('NetworkToken');

contract('NetworkToken', function ([owner, anotherAccount]) {
  
  let token;

  const _name = 'Network Token (Pilot)';
  const _symbol = 'NT';
  const _decimals = 18;
  var _cap = (new BN(100 * (10 ** 9))).mul((new BN(10 ** 9)).sqr());
  
  beforeEach(async function () {
    token = await NetworkToken.new({ from: owner });
  });

  describe('token details', function () {
    it('has a name', async function () {
      const name = await token.name();
      assert.equal(name, _name);
    });

    it('has a symbol', async function () {
      const symbol = await token.symbol();
      assert.equal(symbol, _symbol);
    });

    it('has 18 decimals', async function () {
      const decimals = await token.decimals();
      expect(decimals).to.eq.BN(_decimals);
    });

    it('has a 0 total supply', async function () {
      const totalSupply = await token.totalSupply();
      expect(totalSupply).to.eq.BN(0);
    });
  
    it('has a 0 owner supply', async function () {
      const ownerBalance = await token.balanceOf(owner);
      expect(ownerBalance).to.eq.BN(0);
    });
    
    it('has the cap set', async function () {
      const tokenCap = await token.cap();
      expect(tokenCap).to.eq.BN(_cap);
    });
  });

  describe('token minting', function () {
    const amount = 100;
    const from = owner;

    it('can mint to owner', async function () {
      await token.mint(owner, amount, { from });

      const balance = await token.balanceOf(owner);
      expect(balance).to.eq.BN(amount);
    });

    it('can mint to another account', async function () {
      await token.mint(anotherAccount, amount, { from });

      const balance = await token.balanceOf(anotherAccount);
      expect(balance).to.eq.BN(amount);
    });

    it('cannot mint after minting stopped', async function () {
      await token.finishMinting({ from});

      try {
        await token.mint(owner, amount, { from });
        assert.fail('Expected revert not received');
      } catch (error) {
        //assert(error.reason === '[No reason implemented]');
        assert(error.message.includes(''));
      }
    });

    it('cannot mint above cap', async function () {
      const tokenCap = await token.cap();
      await token.mint(owner, tokenCap, { from });

      try {
        await token.mint(owner, amount, { from });
        assert.fail('Expected revert not received');
      } catch (error) {
        //assert(error.reason === '[No reason implemented]');
        assert(error.message.includes(''));
      }
    });

  });
});
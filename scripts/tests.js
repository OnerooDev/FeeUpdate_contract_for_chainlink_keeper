async function main() {

  const [deployer] = await ethers.getSigners();
  const addressUpdater = '0x0BE5244b39a5B9cD308b0396e283C68Fd385583b';

  console.log(
    "Test contracts with the account:",
    deployer.address
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const FL_FeeUpdater = new ethers.Contract(
      addressUpdater,
      ['function info() public view returns(uint256 _counter, uint256 _lastTimeStamp, address _addressFee)'],
      deployer
  );

  console.log("Count:", (((await FL_FeeUpdater.info())._counter).toString()));

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

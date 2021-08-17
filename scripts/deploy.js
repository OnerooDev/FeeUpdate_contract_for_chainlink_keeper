async function main() {

  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const longLock = '2592000';
  const address_UpdateFee = '0x5ac24FFf064d7b00F6eb2EC82A74335041abfCC0';

  const FL_FeeUpdater = await ethers.getContractFactory("FL_FeeUpdater");
  const token = await FL_FeeUpdater.deploy(longLock, address_UpdateFee);
  console.log("FL_FeeUpdater address:", token.address);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

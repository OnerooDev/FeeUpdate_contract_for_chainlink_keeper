pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";

interface IUpdateFee {
    function update() external;
}

contract FL_FeeUpdater is KeeperCompatibleInterface {
    uint256 private counter;

    uint256 private interval;
    uint256 public lastTimeStamp;

    IUpdateFee private addressFee;

    constructor(uint updateInterval, address _addressFee) public {
      interval = updateInterval;
      lastTimeStamp = block.timestamp;
      addressFee = IUpdateFee(_addressFee);
      counter = 0;
    }

    function checkUpkeep(bytes calldata checkData) external override returns (bool upkeepNeeded, bytes memory performData) {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;

        performData = checkData;
    }

    function performUpkeep(bytes calldata performData) external override {
        lastTimeStamp = block.timestamp;
        counter = counter + 1;

        addressFee.update();
        performData;
    }

    function newInterval(uint256 _interval) external {
        interval = _interval;
    }

    function info() public view returns(uint256 _counter, uint256 _lastTimeStamp, address _addressFee) {
        _addressFee = address(addressFee);
        _counter = counter;
        _lastTimeStamp = lastTimeStamp;
    }
}

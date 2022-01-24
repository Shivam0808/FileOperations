function helpFn() {
  console.log(`List of all commands ->
                    1) Tree - node FO.js tree <dirPath>
                    2) Organize - node FO.js organize <dirPath>
                    3) Help - node FO.js help`);
}

module.exports = {
  helpFnKey: helpFn,
};

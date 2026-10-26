process.stdin.resume();
process.stdin.setEncoding("utf-8");
var stdinInput = "";

process.stdin.on("data", function (input) {
  stdinInput += input;
});

process.stdin.on("end", function () {
  main(stdinInput);
});

function main(input) {
  var lineList = input.split(/\r?\n/);
  var sourceStr = (lineList[0] || "").trim().toLowerCase();
  var targetStr = (lineList[1] || "").trim().toLowerCase();
  var matchCount = 0;
  for (var index = 0; targetStr.length > 0 && index <= sourceStr.length - targetStr.length; index++) {
    if (sourceStr.startsWith(targetStr, index)) {
      matchCount += 1;
    }
  }
  console.log(matchCount);
}

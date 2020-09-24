function Fun() {
    conLog = function() { console.log(1); };
    return this;
}
Fun.conLog = function() { console.log(2); };
Fun.prototype.conLog = function() { console.log(3); };
var conLog = function() { console.log(4); };
function conLog() { console.log(5); }

// 输出以下结果
// Fun.conLog();        // 2 2
// conLog();            // 5 4
// Fun().conLog();      // not a function
// conLog();            // 5 4
// new Fun.conLog();    // 2 2
// new Fun().conLog();  // 1 3

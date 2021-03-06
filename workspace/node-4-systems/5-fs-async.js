var fs = require("fs");

if (fs.existsSync("temp")) {
    console.log("Directory exists, removing...");
    if (fs.existsSync("temp/new.txt")) {
        fs.unlinkSync("temp/new.txt");
    }
    fs.rmdirSync("temp");
}

fs.mkdir("temp", function() {
    fs.exists("temp", function(exists) {
        if (exists) {
            process.chdir("temp");
            fs.writeFile("test.txt", "This is some text for the file", function(err) {
                fs.rename("test.txt", "new.txt", function(err) {
                    fs.stat("new.txt", function(err, stats) {
                        console.log("File has size: " + fs.statSync("new.txt").size + " bytes");
                        fs.readFile("new.txt", function(err, data) {
                            console.log("File has content: " + data.toString());
                        });
                    });
                });
            });
        }
    });
});
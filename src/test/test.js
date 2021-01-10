const { makeCsvTemplateFile } = require("../makeCsvTemplateFile");

(async () => {
  try {
    await makeCsvTemplateFile("Translate.csv", "Name;Comment;0990_n-A\ntest-case1;auto generated test file;this is test case 1\n")
    console.log("TEST done")

  }catch (err) {
    console.log("🚀 ~ file: test.js ~ line 9 ~ err", err)
  }
})()

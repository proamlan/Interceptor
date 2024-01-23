const express = require("express");
const app = express();
const puppeteer = require("puppeteer");

app.use(express.urlencoded({ extended: false }));

app.use("/inter", (req, res) => {
  res.sendFile("form.html", { root: "public" });
});

app.use("/submit-form", (req, res) => {
  console.log("Got something");
  const userInput = req.body.user_input; // Assuming a field named "user_input"
  console.log("User input:", userInput);
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(userInput); // Replace with the target URL

    // Extract content using selectors or evaluation:
    const title = await page.title();
    const paragraphs = await page.evaluate(() => {
      const paragraphs = Array.from(document.querySelectorAll("p"));
      return paragraphs.map((p) => p.textContent);
    });

    console.log("Title:", title);
    console.log("Body: ", paragraphs);

    await browser.close();
  })();
  const params = res.send("Reached Submit");
});

app.use("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

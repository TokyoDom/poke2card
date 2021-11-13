require("dotenv").config();
const puppeteer = require('puppeteer');
const express = require("express");
const path = require('path');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use(express.static(path.resolve(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.post("/images", async (req, res) => {
  const { text, team } = req.body;

  const browser = await puppeteer.launch({
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.goto(process.env.URL);
  await page.click('textarea');
  await page.keyboard.type(text);
  await page.click('.submit');

  await page.waitForSelector('.container');
  for (let i = 0; i < team.length; i++) {
    const pokemon = team[i];
    if (!pokemon.isKnown && pokemon.types.length > 0) {
      const types = pokemon.types;
      for (let j = 0; j < types.length; j++) {
        await page.click(`#poke-${i}-type-${j + 1}`);
        await page.keyboard.type(types[j]);
      }
      await page.click(`#confirm-${i}`);
    }
  }

  const images = [];
  for(let i = 0; i < team.length; i++) {
    const image = await page.screenshot({ 
      encoding: "base64",
      clip: {
        x: 16,
        y: 52 + (i * 479),
        width: 518,
        height: 463
      },
      omitBackground: true
    });
    images.push(image);
  }

  res.json({images : images });
});

app.listen(PORT, () => {
  console.log("app listening on port " + PORT);
});
import ReactDOMServer from "react-dom/server";
import React from "react";
import puppeteer from "puppeteer";

const styles = `body {
  font-family: arial, verdana, sans-serif;
  color: white;
}`;

const App = () => (
  <>
    <h1>Your React App</h1>
    <svg width="300" height="300">
      <circle cx="150" cy="150" r="10" fill="blue" />
    </svg>
  </>
);

const renderToPuppeteer = async (app, { styles }) => {
  const html = `
  <html>
  <style>${styles}</style>
  <body>
  <div id="content">
  ${ReactDOMServer.renderToString(app)}
  </div>
  </body>
  </html>`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setContent(html);
  const element = await page.$("#content");
  await element.screenshot({
    type: "png",
    path: "/dev/stdout",
    omitBackground: true,
  });

  await browser.close();
};

(async () => {
  renderToPuppeteer(<App />, { styles });
})();

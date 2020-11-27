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
    <svg width="600" height="600" viewBox="0 0 100 100">
      <rect
        x="10"
        y="10"
        width="80"
        height="80"
        rx="5"
        fill="rgba(255,255,255,0.1)"
      />
      <rect
        x="12"
        y="12"
        width="76"
        height="76"
        rx="5"
        fill="rgba(255,255,255,0.2)"
      />
      <text x="20" y="30" fill="white" style={{ fontSize: "9pt" }}>
        This is cool
      </text>
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
    width: 600,
    height: 600,
  });

  await browser.close();
};

(async () => {
  renderToPuppeteer(<App />, { styles });
})();

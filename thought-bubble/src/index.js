import puppeteer from "puppeteer";

const styles = `body {
  font-family: arial, verdana, sans-serif;
  color: white;
}`;

const svg = `
<svg width="600" height="600" viewBox="0 0 100 100">
  <rect
    x="50"
    y="12"
    width="42"
    height="18"
    rx="5"
    fill="rgba(255,255,255,1)"
  />
  <circle
    cx="49"
    cy="33"
    r="3.5"
    fill="rgba(255,255,255,0.8)"
  />
  <circle
    cx="44"
    cy="37"
    r="2.5"
    fill="rgba(255,255,255,0.7)"
  />
  <circle
    cx="40.5"
    cy="40"
    r="1.5"
    fill="rgba(255,255,255,0.6)"
  />
  <text x="55" y="23" fill="black" style="font-size: 4pt">
    This is insane
  </text>
</svg>`;

(async () => {
  const html = `
  <html>
  <style>${styles}</style>
  <body>
  <div id="content">
  ${svg}
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
})();

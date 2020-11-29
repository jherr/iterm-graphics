import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://status.slack.com/");
  await page.waitForTimeout(2000);
  const element = await page.$("#services");
  await element.screenshot({
    type: "png",
    path: "/dev/stdout",
    omitBackground: true,
  });
  await browser.close();
})();

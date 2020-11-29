import ReactDOMServer from "react-dom/server";
import React from "react";
import puppeteer from "puppeteer";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  LabelSeries,
} from "react-vis";

const SIZE = 600;

const greenData = [
  { x: "A", y: 10 },
  { x: "B", y: 5 },
  { x: "C", y: 15 },
];

const blueData = [
  { x: "A", y: 12 },
  { x: "B", y: 2 },
  { x: "C", y: 11 },
];

const labelData = greenData.map((d, idx) => ({
  x: d.x,
  y: Math.max(greenData[idx].y, blueData[idx].y),
}));

const App = () => {
  return (
    <div
      style={{
        padding: "1rem",
      }}
    >
      <XYPlot
        xType="ordinal"
        width={SIZE * 2}
        height={SIZE}
        xDistance={100}
        style={{
          background: "rgba(255,255,255,0.3)",
        }}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries
          className="vertical-bar-series-example"
          data={greenData}
        />
        <VerticalBarSeries data={blueData} />
        <LabelSeries data={labelData} getLabel={(d) => d.x} />
      </XYPlot>
    </div>
  );
};

const styles = `body {
  font-size: xx-large;
  font-family: arial, verdana, sans-serif;
  color: white;
  width: ${SIZE * 4}px;
  height: ${SIZE * 2}px;
  margin: 0;
  padding: 0;
}`;

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
    clip: false,
    width: SIZE * 2,
    height: SIZE,
  });

  await browser.close();
};

(async () => {
  renderToPuppeteer(<App />, { styles });
})();

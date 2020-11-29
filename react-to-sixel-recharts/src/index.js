import ReactDOMServer from "react-dom/server";
import React from "react";
import puppeteer from "puppeteer";
import fetch from "node-fetch";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const App = ({ data }) => (
  <LineChart
    width={1000}
    height={600}
    data={data}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
  >
    <CartesianGrid fill="rgba(255,255,255,0.7)" strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line
      strokeWidth="5"
      stroke="red"
      type="monotone"
      dataKey="pv"
      fill="#8884d8"
    />
    <Line strokeWidth="5" type="monotone" dataKey="uv" fill="#82ca9d" />
  </LineChart>
);

const styles = `body {
  font-family: arial, verdana, sans-serif;
  color: white;
}`;

const renderToPuppeteer = async (app, { styles }) => {};

(async () => {
  const resp = await fetch(
    "https://raw.githubusercontent.com/jherr/iterm-graphics/master/react-to-sixel-recharts/data.json"
  );
  const data = await resp.json();

  const html = `
  <html>
  <style>${styles}</style>
  <body>
  <div id="content">
  ${ReactDOMServer.renderToString(<App data={data} />)}
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

import ReactDOMServer from "react-dom/server";
import React from "react";
import puppeteer from "puppeteer";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const App = () => (
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

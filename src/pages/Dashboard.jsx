import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Line } from "react-chartjs-2";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import Card from "@/components/dashboard/Card";
import Table from "@/components/dashboard/Table";
import { Select } from "@/components/common";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const rawData = [
  { name: "5k", value: 50 },
  { name: "10k", value: 60 },
  { name: "15k", value: 20 },
  { name: "20k", value: 10 },
  { name: "25k", value: 20 },
  { name: "30k", value: 80 },
  { name: "35k", value: 70 },
  { name: "40k", value: 60 },
  { name: "45k", value: 40 },
  { name: "50k", value: 30 },
  { name: "55k", value: 10 },
  { name: "60k", value: 20 },
];

const data = rawData.map((item) => ({
  ...item,
}));

const cards = [
  {
    heading: "total user",
    icon: "users",
    iconColor: "",
    iconBgColor: "rgba(130, 128, 255, 0.3)",
    count: "40,689",
    up: true,
    percent: "8.5",
    footer: "Up from yesterday",
  },
  {
    heading: "total order",
    icon: "box",
    iconColor: "",
    iconBgColor: "rgba(254, 197, 61, 0.3)",
    count: "10,293",
    up: true,
    percent: "1.3",
    footer: "Up from past week",
  },
  {
    heading: "total sales",
    icon: "graph",
    iconColor: "",
    iconBgColor: "rgba(74, 217, 145, 0.3)",
    count: "$89,000",
    up: false,
    percent: "4.3",
    footer: "Down from yesterday",
  },
  {
    heading: "total pending",
    icon: "timer",
    iconColor: "",
    iconBgColor: "rgba(255, 144, 102, 0.3)",
    count: "2,040",
    up: false,
    percent: "1.8",
    footer: "Up from yesterday",
  },
];

const tableHeaders = [
  {
    label: "Product Name",
    key: "product",
    render: (row) => (
      <div className="flex items-center gap-3">
        <img
          src={row.image}
          alt={row.product}
          className="w-10 h-10 rounded-md object-cover"
        />
        <span className="font-medium">{row.product}</span>
      </div>
    ),
  },
  { label: "Location", key: "location", cellClassName: "text-gray-500" },
  { label: "Date - Time", key: "dateTime", cellClassName: "text-gray-500" },
  { label: "Piece", key: "piece" },
  { label: "Amount", key: "amount", cellClassName: "font-medium" },
  {
    label: "Status",
    key: "status",
    render: (row) => (
      <span className={`text-white text-xs px-4 py-1 rounded-full ${row.statusClassName}`}>
        {row.status}
      </span>
    ),
  },
];

const tableData = [
  {
    id: 1,
    product: "Apple Watch",
    image: "/apple-watch.png",
    location: "6096 Marjolaine Landing",
    dateTime: "12.09.2026 - 12.53 PM",
    piece: 423,
    amount: "$34,295",
    status: "Delivered",
    statusClassName: "bg-emerald-500",
  }
];

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState({ name: "Month" });

  return (
    <div className="pt-[30px] flex flex-col pl-[31px] pr-[33px]">
      <h1 className="font-[700] dark:text-red-500 text-[29.5px] max-w-[200px] tracking-[-0.2px]">
        {loading ? <Skeleton count={1} /> : "Dashboard"}
      </h1>
      <div className="mt-[27px] grid grid-cols-4 gap-[30px]">
        {cards.map((card) => (
          <Card key={card.heading} loading={loading} {...card} />
        ))}
      </div>
      <div className="mt-[30px]  rounded-[14px]  bg-white pt-[37px] pl-[32px] pb-[58px] pr-[32px]">
        <span className="font-bold text-[24px] leading-[20px] ">
          Sales Details
        </span>
        <div className="mt-[51px] ">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis
                domain={[0, 100]}
                ticks={[20, 40, 60, 80, 100]}
                allowDecimals={false}
                tickFormatter={(v) => `${v}%`}
              />

              <Tooltip formatter={(v) => [`${v}%`, "Value"]} />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-[30px]  rounded-[14px]  bg-white pt-[37px] pl-[32px] pb-[58px] pr-[32px]">
        <div className="flex items-center justify-between">
          <span className="font-bold text-[24px] leading-[20px] ">
            Deals Details
          </span>
          <Select
            className="text-sm"
            options={[
              { name: "All months" },
              { name: "January" },
              { name: "February" },
              { name: "March" },
              { name: "April" },
              { name: "May" },
              { name: "June" },
              { name: "July" },
              { name: "August" },
              { name: "September" },
              { name: "October" },
              { name: "November" },
              { name: "December" },
            ]}
            value={selectedMonth}
            onChange={setSelectedMonth}
          />
        </div>
        <div className="mt-[35px]">
          <Table headers={tableHeaders} data={tableData} />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;

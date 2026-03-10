import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { api } from "../utils/api";
import { Select } from "@/components/common";
import Skeleton from "react-loading-skeleton";
import Card from "@/components/dashboard/Card";
import Table from "@/components/dashboard/Table";
import { monthOptions, dashboardCard } from "../utils/constants";

const tableHeaders = [
  {
    label: "Product Name",
    key: "product",
    render: (row) => (
      <div className="flex items-center gap-4">
        <img
          src={row.image}
          alt={row.product}
          className="w-10 h-10 rounded-md object-cover"
        />
        <span className="font-semibold text-header-black/80">
          {row.product}
        </span>
      </div>
    ),
  },
  { label: "Location", key: "location", cellClassName: "" },
  { label: "Date - Time", key: "dateTime", cellClassName: "" },
  { label: "Piece", key: "piece" },
  { label: "Amount", key: "amount", cellClassName: "" },
  {
    label: "Status",
    key: "status",
    render: (row) => (
      <span
        className={`text-white text-xs px-4 py-1 rounded-full ${row.statusClassName}`}
      >
        {row.status}
      </span>
    ),
  },
];

const Dashboard = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingSales, setLoadingSales] = useState(false);
  const [loadingDeals, setLoadingDeals] = useState(false);
  const [salesMonth, setSalesMonth] = useState(monthOptions[0]);
  const [dealsMonth, setDealsMonth] = useState(monthOptions[0]);
  const [chartData, setChartData] = useState([]);
  const [tableRows, setTableRows] = useState([]);

  const salesMonthName = salesMonth?.name;
  const dealsMonthName = dealsMonth?.name;

  useEffect(() => {
    const loadSalesData = async () => {
      setLoadingSales(true);
      try {
        const response = await api.get("/dashboard", {
          params: { month: salesMonthName },
        });

        if (response.data?.length) {
          const [existing] = response.data;
          setChartData(existing.chartData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingSales(false);
      }
    };

    loadSalesData();
  }, [salesMonthName]);

  useEffect(() => {
    const loadDealsData = async () => {
      setLoadingDeals(true);
      try {
        const response = await api.get("/dashboard", {
          params: { month: dealsMonthName },
        });
        if (response.data?.length) {
          setTableRows(response.data[0].tableData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingDeals(false);
      }
    };

    loadDealsData();
  }, [dealsMonthName]);

  useEffect(() => {
    if (!loadingSales && !loadingDeals && initialLoading) {
      setInitialLoading(false);
    }
  }, [initialLoading, loadingSales, loadingDeals]);

  return (
    <div className="pt-[30px] cursor-pointer flex border-l-2 border-t-1 border-gray-200 flex-col pl-[31px] pr-[33px]">
      <h1 className="font-[700] dark:text-red-500 text-[29.5px] max-w-[200px] tracking-[-0.2px]">
        {initialLoading ? <Skeleton width={160} /> : "Dashboard"}
      </h1>
      <div className="mt-[27px] grid grid-cols-4 gap-[30px]">
        {dashboardCard.map((card) => (
          <Card key={card.heading} loading={initialLoading} {...card} />
        ))}
      </div>
      <div className="mt-[30px]  rounded-[14px]  bg-white pt-[37px] pl-[32px] pb-[53px] pr-[32px]">
        <div className="flex justify-between ">
          {loadingSales ? (
            <Skeleton width={160} height={24} />
          ) : (
            <span className="font-bold text-[24px] ">Sales Details</span>
          )}
          {loadingSales ? (
            <Skeleton width={120} height={28} />
          ) : (
            <Select
              className="text-sm border pr-[13px] pl-[8px] flex items-center max-h-[28px] border-[#D5D5D5] rounded-[4px] bg-[#FCFDFD]"
              options={monthOptions}
              value={salesMonth}
              onChange={setSalesMonth}
            />
          )}
        </div>
        <div className="mt-[40px] h-[278px]">
          {loadingSales ? (
            <Skeleton height={278} />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid dasharray="3 3" vertical={false} />

                <XAxis dataKey="name" />

                <YAxis
                  domain={[20, "auto"]}
                  ticks={[20, 40, 60, 80, 100]}
                  allowDataOverflow={true}
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
          )}
        </div>
      </div>
      <div className="mt-[30px]  rounded-[14px]  bg-white pt-[25px] pb-[20px] pl-[32px] pr-[32px]">
        <div className="flex items-center justify-between">
          {loadingDeals ? (
            <Skeleton width={160} height={24} />
          ) : (
            <span className="font-bold text-[24px] ">Deals Details</span>
          )}
          {loadingDeals ? (
            <Skeleton width={120} height={28} />
          ) : (
            <Select
              className="text-sm border pr-[13px] pl-[8px] flex items-center max-h-[28px] border-[#D5D5D5] rounded-[4px] bg-[#FCFDFD]"
              options={monthOptions}
              value={dealsMonth}
              onChange={setDealsMonth}
            />
          )}
        </div>
        <div className="mt-[35px]">
          {loadingDeals ? (
            <div className="space-y-3">
              <Skeleton height={36} />
              <Skeleton height={36} />
              <Skeleton height={36} />
              <Skeleton height={36} />
            </div>
          ) : (
            <Table headers={tableHeaders} data={tableRows} />
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;

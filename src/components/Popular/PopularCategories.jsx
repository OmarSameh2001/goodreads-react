import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ApexCharts from "react-apexcharts";
import axiosInstance from "../../apis/config";

export default function CategoryPolarChart() {
  const [categories, setCategories] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        name: "Category Popularity",
        data: [],
        background: [],
      },
    ],
  });
  const controller = new AbortController();


  useEffect(() => {
    axiosInstance
      .get("/categories/popular")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCategories(res.data);

          const labels = res.data.map((category) => category.name);
          const data = res.data.map((category) => category.views);

          setChartData({
            labels,
            datasets: [
              {
                name: "Category Popularity",
                data,
              },
            ],
          });
        }
      })
      .catch((err) => console.error("Unable to fetch popular categories", err));

    return () => controller.abort();
  }, []);

  const chartOptions = {
    chart: {
      type: "polarArea",
      height: 350,
    },
    labels: chartData.labels,
    plotOptions: {
      polarArea: {
        dataLabels: {
          style: {
            fontSize: "14px",
            fontWeight: "bold",
          },
        },
      },
    },
    colors: chartData.datasets[0]?.background,
    legend: {
      position: "bottom",
    },
  };

  return (
    <Box sx={{ padding: "20px", textAlign: "center" }}>
        <h2 style={{textAlign:"left"}}>Check Out the Most Loved Categories That Are Setting the Trends
        </h2>


      <ApexCharts options={chartOptions} series={chartData.datasets[0]?.data} type="polarArea" height={350} />
    </Box>
  );
}

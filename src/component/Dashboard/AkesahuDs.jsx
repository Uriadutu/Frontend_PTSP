import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

const AkesahuDs = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Jumlah Berangkat",
        data: [],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Jumlah Batal Berangkat",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  });

  const [berangkat, setBerangkat] = useState(0);
  const [batalBerangkat, setBatalBerangkat] = useState(0);
  const [belumStatus, setBelumStatus] = useState(0);

  const getStatus = async (status, setter) => {
    try {
      const response = await axios.get(`http://localhost:5000/haji/status/info/${status}`);
      setter(response.data.length);
    } catch (error) {
      console.error(`Error fetching ${status} data:`, error);
    }
  };

  useEffect(() => {
    getStatus("Berangkat", setBerangkat);
    getStatus("Batal Berangkat", setBatalBerangkat);
    getStatus("-", setBelumStatus);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/haji/status/berangkat");
        const data = response.data;

        // Filter out entries where tahun_berangkat is "-"
        const filteredData = data.filter(item => item.tahun_berangkat !== "-");

        const tahun = filteredData.map(item => item.tahun_berangkat);
        const jumlahBerangkat = filteredData.map(item => item.jumlah_berangkat);
        const jumlahBatal = filteredData.map(item => item.jumlah_batal);

        setChartData({
          labels: tahun,
          datasets: [
            {
              label: "Jumlah Berangkat",
              data: jumlahBerangkat,
              borderColor: "#4CAF50",
              backgroundColor: "#4CAF50",
              borderWidth: 1,
              fill: false,
              tension: 0.1,
            },
            {
              label: "Jumlah Batal Berangkat",
              data: jumlahBatal,
              backgroundColor: "#FFC107",
              borderColor: "#FFC107",
              borderWidth: 1,
              fill: false,
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-0 md:grid-cols-4 md:gap-2 gap-y-2 w-full">
      <div className="bg-white rounded p-3 drop-shadow-md col-span-3">
        <h1 className="text-xl font-bold text-center">
          Jumlah Haji Berangkat dan Batal Berangkat Tiap Tahun
        </h1>
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
              },
              legend: {
                position: "top",
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return `${context.dataset.label}: ${context.raw}`;
                  },
                },
              },
            },
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
      <div className="bg-white rounded drop-shadow-md w-full">
        <h1 className="text-xl font-bold text-center">Chart Haji</h1>
        <div className="flex justify-center items-center mt-5">
          <Pie
            data={{
              labels: ["Belum Diatur", "Berangkat", "Batal Berangkat"],
              datasets: [
                {
                  label: "Jumlah",
                  data: [belumStatus, berangkat, batalBerangkat],
                  backgroundColor: ["#FFEB3B", "#4CAF50", "#FFC107"],
                  borderColor: ["white", "white", "white"],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return `${context.label}: ${context.raw}`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AkesahuDs;

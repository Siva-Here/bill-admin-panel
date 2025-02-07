// import React from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const BillsLineChart = ({ bills }) => {
//   // Process data to count bills per date
//   const billsByDate = bills.reduce((acc, bill) => {
//     const date = bill.date ? bill.date.split("T")[0] : "Unknown";
//     acc[date] = (acc[date] || 0) + 1;
//     return acc;
//   }, {});

//   // Convert object to array format for recharts
//   const chartData = Object.entries(billsByDate).map(([date, count]) => ({
//     date,
//     count,
//   }));

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <LineChart data={chartData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" tick={{ fontSize: 12 }} />
//         <YAxis />
//         <Tooltip />
//         <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };

// export default BillsLineChart;




// import React from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
// };

// const BillChart = ({ bills }) => {
//     const billCounts = bills
//         .filter((bill) => bill.date)
//         .reduce((acc, bill) => {
//             const formattedDate = formatDate(bill.date);
//             acc[formattedDate] = (acc[formattedDate] || 0) + 1;
//             return acc;
//         }, {});

//     const sortedData = Object.entries(billCounts)
//         .map(([date, count]) => ({ date, count }))
//         .sort((a, b) => new Date(a.date) - new Date(b.date));

//     const maxCount = Math.max(...sortedData.map((d) => d.count), 0);
//     const yAxisUpperLimit = maxCount + Math.ceil(maxCount * 0.2);

//     return (
//         <div style={{ width: "100%", overflowX: "auto", display: "flex", justifyContent: "center" }}>
//             <ResponsiveContainer width="95%" height={window.innerWidth < 600 ? 300 : 400}>
//                 <LineChart 
//                     data={sortedData} 
//                     margin={{ top: 10, right: 10, left: 10, bottom: 10 }} // Reduce left padding
//                 >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis 
//                         dataKey="date" 
//                         stroke="white" 
//                         tick={{ fill: "white", fontSize: window.innerWidth < 600 ? 10 : 14 }}
//                         angle={window.innerWidth < 600 ? -30 : 0}
//                         dy={window.innerWidth < 600 ? 10 : 0}
//                         height={window.innerWidth < 600 ? 50 : 30}
//                         padding={{ left: 10, right: 10 }} // Balance spacing
//                     />
//                     <YAxis 
//                         stroke="white" 
//                         tick={{ fill: "white", fontSize: window.innerWidth < 600 ? 10 : 14 }}
//                         label={{ value: "No. of Bills", angle: -90, position: "insideLeft", fill: "white", fontSize: window.innerWidth < 600 ? 10 : 14 }}
//                         domain={[0, yAxisUpperLimit]} 
//                         allowDecimals={false} 
//                     />
//                     <Tooltip contentStyle={{ backgroundColor: "white", color: "black", fontSize: window.innerWidth < 600 ? 10 : 14 }} />
//                     <Line 
//                         type="monotone" 
//                         dataKey="count" 
//                         stroke="#82ca9d" 
//                         strokeWidth={window.innerWidth < 600 ? 1.5 : 2}
//                         dot={{ r: window.innerWidth < 600 ? 2 : 4 }}
//                     />
//                 </LineChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };

// export default BillChart;



// import React from "react";
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from "recharts";
// import { motion } from "framer-motion";

// const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
// };

// const BillChart = ({ bills }) => {
//     const billCounts = bills
//         .filter((bill) => bill.date)
//         .reduce((acc, bill) => {
//             const formattedDate = formatDate(bill.date);
//             acc[formattedDate] = (acc[formattedDate] || 0) + 1;
//             return acc;
//         }, {});

//     const sortedData = Object.entries(billCounts)
//         .map(([date, count]) => ({ date, count }))
//         .sort((a, b) => new Date(a.date) - new Date(b.date));

//     const maxCount = Math.max(...sortedData.map((d) => d.count), 0);
//     const yAxisUpperLimit = maxCount + Math.ceil(maxCount * 0.2);

//     return (
//         <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1.2, ease: "easeOut" }}
//             style={{
//                 width: "100%", 
//                 overflowX: "auto", 
//                 display: "flex", 
//                 justifyContent: "center", 
//                 background: "linear-gradient(90deg, #130f40 0%, #000000 74%)", 
//                 padding: "20px", 
//                 borderRadius: "10px"
//             }}
//         >
//             <ResponsiveContainer width="95%" height={window.innerWidth < 600 ? 300 : 400}>
//                 <LineChart 
//                     data={sortedData} 
//                     margin={{ top: 10, right: 10, left: 10, bottom: 10 }} 
//                 >
//                     <XAxis 
//                         dataKey="date" 
//                         stroke="#AAAAAA" 
//                         tick={{ fill: "#FFFFFF", fontSize: window.innerWidth < 600 ? 10 : 14 }}
//                         angle={window.innerWidth < 600 ? -30 : 0}
//                         dy={window.innerWidth < 600 ? 10 : 0}
//                         height={window.innerWidth < 600 ? 50 : 30}
//                         padding={{ left: 10, right: 10 }} 
//                     />
//                     <YAxis 
//                         stroke="#AAAAAA" 
//                         tick={{ fill: "#FFFFFF", fontSize: window.innerWidth < 600 ? 10 : 14 }}
//                         label={{ value: "No. of Bills", angle: -90, position: "insideLeft", fill: "#FFFFFF", fontSize: window.innerWidth < 600 ? 10 : 14 }}
//                         domain={[0, yAxisUpperLimit]} 
//                         allowDecimals={false} 
//                     />
                    
//                     {/* ✅ Area for smooth gradient effect */}
//                     <defs>
//                         <linearGradient id="colorBills" x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="0%" stopColor="#1E90FF" stopOpacity={0.6}/>
//                             <stop offset="100%" stopColor="#1E90FF" stopOpacity={0}/>
//                         </linearGradient>
//                     </defs>

//                     <Area 
//                         type="monotone"
//                         dataKey="count"
//                         stroke="none"
//                         fill="url(#colorBills)"
//                     />

//                     <Tooltip 
//                         contentStyle={{ backgroundColor: "#222222", color: "white", borderRadius: "8px", fontSize: window.innerWidth < 600 ? 10 : 14 }} 
//                         cursor={{ stroke: "#3A3A3A", strokeWidth: 1 }}
//                     />

//                     <Line 
//                         type="monotone" 
//                         dataKey="count" 
//                         stroke="#1E90FF" 
//                         strokeWidth={window.innerWidth < 600 ? 2 : 3}
//                         dot={{ 
//                             r: window.innerWidth < 600 ? 3 : 5, 
//                             fill: "#1E90FF", 
//                             stroke: "#FFF", 
//                             strokeWidth: 1, 
//                             filter: "drop-shadow(0px 0px 6px #1E90FF)"
//                         }}
//                         activeDot={{ 
//                             r: 8, 
//                             fill: "#1E90FF", 
//                             stroke: "#FFF", 
//                             strokeWidth: 2, 
//                             filter: "drop-shadow(0px 0px 10px #1E90FF)"
//                         }}
//                         animationDuration={2000}
//                     />
//                 </LineChart>
//             </ResponsiveContainer>
//         </motion.div>
//     );
// };

// export default BillChart;




// import React, { useState, useEffect } from "react";
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from "recharts";
// import { motion } from "framer-motion";

// const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
// };

// const BillChart = ({ bills }) => {
//     const [chartHeight, setChartHeight] = useState(window.innerWidth < 600 ? 300 : 400);

//     useEffect(() => {
//         const handleResize = () => {
//             setChartHeight(window.innerWidth < 600 ? 280 : 380);
//         };
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     const billCounts = bills
//         .filter((bill) => bill.date)
//         .reduce((acc, bill) => {
//             const formattedDate = formatDate(bill.date);
//             acc[formattedDate] = (acc[formattedDate] || 0) + 1;
//             return acc;
//         }, {});

//     const sortedData = Object.entries(billCounts)
//         .map(([date, count]) => ({ date, count }))
//         .sort((a, b) => new Date(a.date) - new Date(b.date));

//     const maxCount = Math.max(...sortedData.map((d) => d.count), 0);
//     const yAxisUpperLimit = maxCount + Math.ceil(maxCount * 0.2);

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1.2, ease: "easeOut" }}
//             style={{
//                 width: "100%",
//                 maxWidth: "100%",
//                 overflow: "hidden",
//                 display: "flex",
//                 justifyContent: "center",
//                 background: "linear-gradient(90deg, #130f40 0%, #000000 74%)",
//                 padding: "20px",
//                 borderRadius: "10px",
//             }}
//         >
//             <ResponsiveContainer width="100%" height={chartHeight}>
//                 <LineChart data={sortedData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
//                     <XAxis
//                         dataKey="date"
//                         stroke="#AAAAAA"
//                         tick={{ fill: "#FFFFFF", fontSize: window.innerWidth < 600 ? 10 : 14 }}
//                         angle={window.innerWidth < 600 ? -30 : 0}
//                         dy={window.innerWidth < 600 ? 10 : 0}
//                         height={window.innerWidth < 600 ? 50 : 30}
//                         padding={{ left: 10, right: 10 }}
//                     />
//                     <YAxis
//                         stroke="#AAAAAA"
//                         tick={{ fill: "#FFFFFF", fontSize: window.innerWidth < 600 ? 10 : 14 }}
//                         label={{
//                             value: "No. of Bills",
//                             angle: -90,
//                             position: "insideLeft",
//                             fill: "#FFFFFF",
//                             fontSize: window.innerWidth < 600 ? 10 : 14,
//                         }}
//                         domain={[0, yAxisUpperLimit]}
//                         allowDecimals={false}
//                     />
//                     <defs>
//                         <linearGradient id="colorBills" x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="0%" stopColor="#1E90FF" stopOpacity={0.6} />
//                             <stop offset="100%" stopColor="#1E90FF" stopOpacity={0} />
//                         </linearGradient>
//                     </defs>
//                     <Area type="monotone" dataKey="count" stroke="none" fill="url(#colorBills)" />
//                     <Tooltip
//                         contentStyle={{
//                             backgroundColor: "#222222",
//                             color: "white",
//                             borderRadius: "8px",
//                             fontSize: window.innerWidth < 600 ? 10 : 14,
//                         }}
//                         cursor={{ stroke: "#3A3A3A", strokeWidth: 1 }}
//                     />
//                     <Line
//                         type="monotone"
//                         dataKey="count"
//                         stroke="#1E90FF"
//                         strokeWidth={window.innerWidth < 600 ? 2 : 3}
//                         dot={{
//                             r: window.innerWidth < 600 ? 3 : 5,
//                             fill: "#1E90FF",
//                             stroke: "#FFF",
//                             strokeWidth: 1,
//                             filter: "drop-shadow(0px 0px 6px #1E90FF)",
//                         }}
//                         activeDot={{
//                             r: 8,
//                             fill: "#1E90FF",
//                             stroke: "#FFF",
//                             strokeWidth: 2,
//                             filter: "drop-shadow(0px 0px 10px #1E90FF)",
//                         }}
//                         animationDuration={2000}
//                     />
//                 </LineChart>
//             </ResponsiveContainer>
//         </motion.div>
//     );
// };

// export default BillChart;



import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from "recharts";
import { motion } from "framer-motion";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const BillChart = ({ bills }) => {
    const [chartHeight, setChartHeight] = useState(window.innerWidth < 600 ? 300 : 400);

    useEffect(() => {
        const handleResize = () => {
            setChartHeight(window.innerWidth < 600 ? 280 : 380);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const billCounts = bills
        .filter((bill) => bill.date)
        .reduce((acc, bill) => {
            const formattedDate = formatDate(bill.date);
            acc[formattedDate] = (acc[formattedDate] || 0) + 1;
            return acc;
        }, {});

    const sortedData = Object.entries(billCounts)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const maxCount = Math.max(...sortedData.map((d) => d.count), 0);
    const yAxisUpperLimit = maxCount + Math.ceil(maxCount * 0.2);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
                width: "100%",
                maxWidth: "100%",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                background: "linear-gradient(90deg, #130f40 0%, #000000 74%)",
                padding: "20px",
                borderRadius: "10px",
            }}
        >
            <ResponsiveContainer width="100%" height={chartHeight}>
                <LineChart data={sortedData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                    <XAxis
                        dataKey="date"
                        stroke="#AAAAAA"
                        tick={{ fill: "#FFFFFF", fontSize: window.innerWidth < 600 ? 10 : 14 }}
                        angle={window.innerWidth < 600 ? -30 : 0}
                        dy={window.innerWidth < 600 ? 10 : 0}
                        height={window.innerWidth < 600 ? 50 : 30}
                        padding={{ left: 10, right: 10 }}
                    />
                    <YAxis
                        stroke="#AAAAAA"
                        tick={{ fill: "#FFFFFF", fontSize: window.innerWidth < 600 ? 10 : 14 }}
                        label={{
                            value: "No. of Bills",
                            angle: -90,
                            position: "insideLeft",
                            fill: "#FFFFFF",
                            fontSize: window.innerWidth < 600 ? 10 : 14,
                            dx: window.innerWidth < 600 ? -5 : -10, // Adjusted gap for small screens
                        }}
                        domain={[0, yAxisUpperLimit]}
                        allowDecimals={false}
                    />
                    <defs>
                        <linearGradient id="colorBills" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#1E90FF" stopOpacity={0.6} />
                            <stop offset="100%" stopColor="#1E90FF" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="count" stroke="none" fill="url(#colorBills)" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "white",
                            color: "black",
                            borderRadius: "8px",
                            fontSize: window.innerWidth < 600 ? 10 : 14,
                        }}
                        cursor={{ stroke: "#3A3A3A", strokeWidth: 1 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#1E90FF"
                        strokeWidth={window.innerWidth < 600 ? 2 : 3}
                        dot={{
                            r: window.innerWidth < 600 ? 3 : 5,
                            fill: "#1E90FF",
                            stroke: "#FFF",
                            strokeWidth: 1,
                            filter: "drop-shadow(0px 0px 6px #1E90FF)",
                        }}
                        activeDot={{
                            r: 8,
                            fill: "#1E90FF",
                            stroke: "#FFF",
                            strokeWidth: 2,
                            filter: "drop-shadow(0px 0px 10px #1E90FF)",
                        }}
                        animationDuration={5000} // Increased animation duration to 3 seconds
                    />
                </LineChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

export default BillChart;


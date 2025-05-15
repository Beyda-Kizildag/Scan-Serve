import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './SalesChart.css';

const calculateMonthlyStats = (data) => {
    const totalSales = data.reduce((sum, day) => sum + day.satış, 0);
    const totalExpenses = data.reduce((sum, day) => sum + day.gider, 0);
    const profit = totalSales - totalExpenses;
    return { totalSales, totalExpenses, profit };
};

const SalesChart = () => {
    const [month, setMonth] = useState(new Date().getMonth() + 1); // Varsayılan ay: mevcut ay
    const [year, setYear] = useState(new Date().getFullYear());   // Varsayılan yıl: mevcut yıl
    const [data, setData] = useState([]);
    const [stats, setStats] = useState({ totalSales: 0, totalExpenses: 0, profit: 0 });

    useEffect(() => {
        const daysInMonth = new Date(year, month, 0).getDate();
        const dayNames = ['Pzr', 'Pzt', 'Sal', 'Çrş', 'Prş', 'Cum', 'Cmt']; // Gün kısaltmaları

        const newData = Array.from({ length: daysInMonth }, (_, i) => {
            const date = new Date(year, month - 1, i + 1);
            return {
                name: `${i + 1} ${dayNames[date.getDay()]}`,
                satış: Math.floor(Math.random() * 1000),
                gider: Math.floor(Math.random() * 500),
            };
        });

        setData(newData);
    }, [month, year]);

    useEffect(() => {
        setStats(calculateMonthlyStats(data));
    }, [data]);

    return (
        <div className="sales-chart-container">
            {/* Ay ve yıl seçimleri */}
            <div className="selector-container">
                <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
                    {['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'].map((m, index) => (
                        <option key={index} value={index + 1}>{m}</option>
                    ))}
                </select>
                <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <option key={i} value={2020 + i}>{2020 + i}</option>
                    ))}
                </select>
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 80 }}>
                    <XAxis
                        dataKey="name"
                        interval={0}
                        tick={{ angle: -45, fontSize: 12 }}
                        height={100}
                    />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="satış" stroke="#4caf50" strokeWidth={2} />
                    <Line type="monotone" dataKey="gider" stroke="#f44336" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>

            {/* İstatistik kutuları */}
            <div className="monthly-stats">
                <div className="stat-card">
                    <h4>Aylık Gelir</h4>
                    <p>{stats.totalSales} TL</p>
                </div>
                <div className="stat-card">
                    <h4>Aylık Gider</h4>
                    <p>{stats.totalExpenses} TL</p>
                </div>
                <div className="stat-card">
                    <h4>Kar</h4>
                    <p>{stats.profit} TL</p>
                </div>
            </div>
        </div>
    );
}

export default SalesChart;

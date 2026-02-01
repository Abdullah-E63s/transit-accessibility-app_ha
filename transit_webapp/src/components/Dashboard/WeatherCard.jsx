import React from 'react';
import { CloudSun } from 'lucide-react';

const WeatherCard = () => {
    return (
        <div className="card weather-card">
            <div className="weather-header">
                <div>
                    <div className="weather-title">Live Weather</div>
                    <div style={{ fontSize: '11px', color: '#6C757D' }}>You have saved 47.3kg CO₂ this week..</div>
                </div>
                <CloudSun size={20} color="#002B49" />
            </div>

            <div className="weather-main-row" style={{ alignItems: 'stretch' }}>
                <div className="aqi-box">
                    <div className="aqi-val">78°</div>
                    <div className="aqi-label">Air Quality Index</div>
                </div>

                <div className="weather-grid" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div className="stat-status good">
                        <div className="status-val">Good</div>
                        <div className="status-label">Air Quality</div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', flex: 1 }}>
                        <div className="stat-chip temp">
                            <div className="stat-val">20°C</div>
                            <div className="stat-lbl">Temperature</div>
                        </div>
                        <div className="stat-chip humid">
                            <div className="stat-val">90%</div>
                            <div className="stat-lbl">Humidity</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;

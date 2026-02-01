import React from 'react';
import { TreeDeciduous } from 'lucide-react';

const CO2Card = () => {
    return (
        <div className="card co2-card-redesign">
            <div className="co2-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#495057' }}>Total CO₂ Saved</div>
                <TreeDeciduous size={24} color="#4CAF50" />
            </div>

            <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                <div style={{ fontSize: '48px', fontWeight: '700', color: '#343A40', lineHeight: 1 }}>47.3</div>
                <div style={{ fontSize: '14px', color: '#6C757D', marginTop: '4px' }}>kilograms of CO₂</div>
            </div>

            <div style={{ height: '1px', backgroundColor: '#E9ECEF', margin: '16px 0' }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#343A40', fontSize: '14px', fontWeight: '500' }}>
                <span>That's equal to 2.1 trees planted!</span>
                <TreeDeciduous size={16} color="#4CAF50" fill="#4CAF50" />
            </div>
        </div>
    );
};

export default CO2Card;

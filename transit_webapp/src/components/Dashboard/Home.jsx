import React, { useState } from 'react';
import WeatherCard from './WeatherCard';
import CO2Card from './CO2Card';
import SearchBar from './SearchBar';
import { MapPin, Bus, Train, TrainFront, ChevronDown, Star } from 'lucide-react';
import RouteCard from '../Transit/RouteCard';
import TransitMap from '../Map/TransitMap';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('bus');
    const [activeFilters, setActiveFilters] = useState(['accessible']);

    const routes = [
        {
            id: 1,
            type: 'bus',
            recommended: true,
            station: 'Meskel Square Station',
            distance: '6.5 km',
            duration: '25 mins',
            arrivalTime: '8:50 pm',
            cost: '$1.80',
            co2: '320g',
            co2Label: 'Save CO₂',
            badge: { type: 'good', text: 'Good' },
            tags: ['Accessible'],
            coordinates: [3.145, 101.690]
        },
        {
            id: 2,
            type: 'bus',
            recommended: false,
            station: 'Meskel Square Station',
            distance: '5.0 km',
            duration: '40 mins',
            arrivalTime: '8:30 pm',
            cost: '$1.50',
            co2: '200g',
            co2Label: 'Save CO₂',
            badge: { type: 'moderate', text: 'Moderate' },
            tags: ['Accessible'],
            isRisk: true,
            riskText: 'Risky Area (Bad Pollution)',
            coordinates: [3.140, 101.695]
        },
        {
            id: 3,
            type: 'train',
            recommended: true,
            station: 'Lideta Train Station',
            distance: '3.2 km',
            duration: '15 mins',
            arrivalTime: '8:45 pm',
            cost: '$2.50',
            co2: '150g',
            co2Label: 'Save CO₂',
            badge: { type: 'good', text: 'Fast' },
            tags: ['Accessible'],
            coordinates: [3.135, 101.680]
        }
    ];

    const filteredRoutes = routes.filter(r => r.type === activeTab);

    return (
        <div className={`home-screen screen ${searchQuery ? 'searching' : ''}`}>
            {/* Conditional Header/UI based on search state */}
            {!searchQuery ? (
                <>
                    <>
                        {/* Main Content Section */}
                        <div className="home-content" style={{ paddingTop: '24px', paddingBottom: '100px' }}>

                            {/* Greeting Header */}
                            <div className="home-header" style={{ padding: '0 0 16px 0', background: 'transparent' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div className="home-greeting">
                                        <div style={{ fontSize: '14px', color: '#6C757D' }}>Welcome Back!</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <MapPin size={16} color="#D32F2F" fill="#D32F2F" />
                                            <h2 style={{ margin: 0, fontSize: '18px' }}>Kuala Lumpur</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Weather and CO2 Cards */}
                            <div className="home-grid">
                                <WeatherCard />
                                <CO2Card />
                            </div>

                            {/* Map Section */}
                            <div style={{ marginTop: '24px' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#343A40' }}>
                                    Nearby Transit Stations
                                </h3>
                                <div style={{ height: '300px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}>
                                    <TransitMap
                                        center={[3.1390, 101.6869]}
                                        zoom={13}
                                        style={{ height: '100%', width: '100%' }}
                                    />
                                </div>
                            </div>

                            {/* Search Bar Section - Below Map */}
                            <div className="search-section" style={{ marginTop: '24px' }}>
                                <SearchBar value={searchQuery} onChange={(val) => setSearchQuery(val)} />
                            </div>
                        </div>
                    </>
                </>
            ) : (
                <>
                    {/* Search Visual View (Map background at top) */}
                    <div className="search-visual-header">
                        <div className="search-map-placeholder" style={{ position: 'relative' }}>
                            {/* Interactive Map Component */}
                            <TransitMap
                                markers={filteredRoutes.map(r => ({
                                    position: r.coordinates || [3.1390, 101.6869],
                                    popup: `${r.type.toUpperCase()}: ${r.station} (${r.duration})`
                                }))}
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
                            />

                        </div>
                    </div>

                    <div className="home-search-results-fixed">
                        <div className="sheet-handle"></div>

                        <div className="results-panel-content">
                            {/* Search Bar inside Results Panel */}
                            <div style={{ marginBottom: '20px' }}>
                                <SearchBar value={searchQuery} onChange={(val) => setSearchQuery(val)} autoFocus={true} />
                            </div>

                            <div className="results-header-row">
                                <h3 className="section-title-white">Suggested Routes</h3>
                                <span className="cancel-search-btn" onClick={() => setSearchQuery('')}>Cancel</span>
                            </div>

                            {/* Filters Row */}
                            <div className="filters-scroll-row">
                                <div className="filter-chip dropdown">
                                    <span>Depart Now</span>
                                    <ChevronDown size={14} />
                                </div>
                                <div className={`filter-chip ${activeFilters.includes('co2') ? 'active' : ''}`}
                                    onClick={() => setActiveFilters(prev => prev.includes('co2') ? prev.filter(f => f !== 'co2') : [...prev, 'co2'])}>
                                    Lowest CO₂
                                </div>
                                <div className={`filter-chip ${activeFilters.includes('accessible') ? 'active' : ''}`}
                                    onClick={() => setActiveFilters(prev => prev.includes('accessible') ? prev.filter(f => f !== 'accessible') : [...prev, 'accessible'])}>
                                    Accessible
                                </div>
                                <div className="filter-chip">Save</div>
                            </div>

                            {/* Transport Type Tabs */}
                            <div className="transport-tabs-row">
                                <div className={`transport-tab-item ${activeTab === 'bus' ? 'active' : ''}`} onClick={() => setActiveTab('bus')}>
                                    <Bus size={20} />
                                    <span>Bus</span>
                                    {activeTab === 'bus' && <div className="active-indicator" />}
                                </div>
                                <div className={`transport-tab-item ${activeTab === 'train' ? 'active' : ''}`} onClick={() => setActiveTab('train')}>
                                    <Train size={20} />
                                    <span>Train</span>
                                    {activeTab === 'train' && <div className="active-indicator" />}
                                </div>
                                <div className={`transport-tab-item ${activeTab === 'mrt' ? 'active' : ''}`} onClick={() => setActiveTab('mrt')}>
                                    <TrainFront size={20} />
                                    <span>MRT/LRT</span>
                                    {activeTab === 'mrt' && <div className="active-indicator" />}
                                </div>
                            </div>

                            <div className="results-list-wrapper">
                                {filteredRoutes.length > 0 ? (
                                    <>
                                        {filteredRoutes[0].recommended && (
                                            <div className="recommended-label">
                                                <Star size={12} fill="#FBC02D" color="#FBC02D" />
                                                <span>Recommended</span>
                                            </div>
                                        )}
                                        <div className="routes-list-inline">
                                            {filteredRoutes.map(route => (
                                                <RouteCard key={route.id} route={route} />
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="no-results-msg">No routes found for this transport type.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;

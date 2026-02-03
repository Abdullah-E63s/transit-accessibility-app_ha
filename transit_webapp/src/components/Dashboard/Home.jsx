import React, { useState, useRef, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import CO2Card from './CO2Card';
import { ArrowLeft, Bell, MapPin, ArrowRight, Menu, Bus, Train, TrainFront, ChevronDown, Star, MenuIcon, Mic, Search, X } from 'lucide-react';
import RouteCard from '../Transit/RouteCard';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Navigation/Sidebar';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('bus');
    const [activeFilters, setActiveFilters] = useState(['accessible']);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
            tags: ['Accessible']
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
            riskText: 'Risky Area (Bad Pollution)'
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
            tags: ['Accessible']
        }
    ];



    const filteredRoutes = routes.filter(r => r.type === activeTab);
    const navigate = useNavigate();


    return (
        <div className={`home-screen screen ${searchQuery ? 'searching' : ''}`} style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', position: 'relative' }}>
            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 999,
                        transition: 'opacity 0.3s ease'
                    }}
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar Drawer */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: isSidebarOpen ? 0 : '-280px',
                width: '280px',
                height: '100vh',
                backgroundColor: '#FFFFFF',
                zIndex: 1000,
                transition: 'left 0.3s ease',
                boxShadow: isSidebarOpen ? '2px 0 8px rgba(0, 0, 0, 0.15)' : 'none'
            }}>
                <Sidebar />
            </div>

            {/* Map Background Container */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 0,
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23DCE4EC' width='100' height='100'/%3E%3Cpath d='M0 0h50v50H0z M50 50h50v50H50z' fill='%23D0D8E0'/%3E%3Cpath d='M10 10h30v5H10z M60 60h30v5H60z M10 30h5v30h-5z M60 10h5v30h-5z' fill='%23B8C5D1'/%3E%3Cpath d='M25 25 L75 75 M75 25 L25 75' stroke='%23FFC107' stroke-width='2' fill='none' opacity='0.5'/%3E%3Ccircle cx='50' cy='50' r='8' fill='%234285F4' stroke='white' stroke-width='2'/%3E%3C/svg%3E")`,
                backgroundSize: '100px 100px',
                backgroundColor: '#E5E5E5'
            }} />
            
            {/* Conditional Header/UI based on search state */}
            {!searchQuery ? (
                <>
                    {/* Header (App Bar) */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#EAEAEA', color: '#000000', position: 'fixed', top: 0, left: 0, right: 0, height: '56px', zIndex: 10 }}>
                        {/* Left */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <button className="icon-btn-ghost"
                            onClick={() => setIsSidebarOpen(true)}>
                             <Menu size={24} color="#343A40" />
                            </button>
                        </div>
                        {/* Center */}
                        <h2 style={{ margin: 0, fontSize: '18px' }}>Welcome, Chuba</h2>

                        {/* Right */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <button className="icon-btn-ghost"
                            onClick={() => navigate('/notifications')}>
                             <Bell size={24} color="#343A40" />
                            </button>
                        </div>
                    </div>

                    {/* Top Container - 10% of screen */}
                    <div style={{
                        height: '10%',
                        position: 'relative', 
                        backgroundColor: '#FFFFFF',
                        flexShrink: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        margin: 0,
                        marginTop: '56px',
                        zIndex: 5
                    }}>
                    {/* Live Location Header */}
                    <div className="home-header" style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, padding: '16px 24px', margin: 0, backgroundColor: 'transparent' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div className="menu-btn-mobile" style={{ display: 'none' }}>
                                <Menu size={24} color="#343A40" />
                            </div>
                            <div className="home-greeting">
                            <div style={{ fontSize: '14px', color: '#6C757D', marginBottom: '6px' }}>Welcome Back!</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
                                <MapPin size={16} color="#D32F2F" fill="#D32F2F" />
                                <h2 style={{ margin: 0, fontSize: '18px' }}>Kuala Lumpur, Malaysia</h2>
                            </div>
                            </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Container - remaining screen */}
                    <div style={{ 
                        flex: 1,
                        position: 'relative',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        overflow: 'auto',
                        margin: 0,
                        zIndex: 2,
                        paddingBottom: '56px'
                    }}>
                        <div className="home-content" style={{ padding: '16px 24px 200px 24px', margin: 0 }}>
                            <div className="home-grid">
                                <WeatherCard />
                                <CO2Card />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="home-search-results-fixed">
                        <div className="sheet-handle"></div>

                        <div className="search-bar-container">
                            <div className="search-bar">
                                <Search
                                    color="#4A90E2"
                                    size={20}
                                />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Where do you want to go?"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search
                            color="#000000"
                            size={20}
                            style={{ cursor: 'pointer' }}
                        />
                        </div>
                    </div> 


                        <div className="results-panel-content">
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

            {/* Blue Search Container - Fixed behind other containers */}
            <div 
                className="search-container"
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '180px',
                    backgroundColor: '#054777',
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px',
                    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
                    zIndex: 3,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Static Handle Bar */}
                <div style={{
                    width: '100%',
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        width: '40px',
                        height: '4px',
                        backgroundColor: '#CED4DA',
                        borderRadius: '2px',
                    }} />
                </div>

                {/* Container Content */}
                <div style={{
                    flex: 1,
                    padding: '0 16px 16px 16px',
                    overflowY: 'auto',
                }}>
                    {/* Search Bar Container */}
                    <div className="search-bar-container" style={{ marginBottom: '16px' }}>
                        <div className="search-bar">
                            <MapPin
                                color="#000000"
                                size={20}
                            />
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Where do you want to go?"
                                onChange={(e) => {
                                    if (e.target.value.length > 0) {
                                        navigate('/searchroute');
                                    }
                                }}
                                style={{ fontWeight: '600', color: '#000000' }}
                            />
                            <Search
                                color="#000000"
                                size={20}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

import React from 'react';
import { Accessibility } from 'lucide-react';

const DisabilityFAB = ({ onOpen }) => {
    const handleClick = () => {
        if (onOpen) onOpen();
    };

    return (
        <button className="disability-fab" onClick={handleClick}>
            <Accessibility size={28} />
        </button>
    );
};

export default DisabilityFAB;


import React from 'react';
import type { RealEstateProperty } from '../types';
import { MapPinIcon } from '../constants';

interface RealEstateCardProps {
  property: RealEstateProperty;
}

const RealEstateCard: React.FC<RealEstateCardProps> = ({ property }) => {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-md max-w-sm w-full animate-fade-in">
        <div className="p-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{property.name}</h3>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
                <div className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Giá:</span> {property.price}
                </div>
                 <div className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Diện tích:</span> {property.area}
                </div>
            </div>

            <div className="flex items-start text-sm text-gray-600 dark:text-gray-400 mb-4">
                <MapPinIcon />
                <span>{property.location}</span>
            </div>

            <div className="mb-4">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Đặc điểm nổi bật:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {property.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                    ))}
                </ul>
            </div>

            <a
                href={property.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
                Xem bản đồ
            </a>
        </div>
    </div>
  );
};

export default RealEstateCard;
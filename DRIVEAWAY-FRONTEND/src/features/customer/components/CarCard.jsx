import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Car, Calendar, MapPin, IndianRupee } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../../../shared/hooks/AuthProvider';

const statusBadgeVariant = {
    AVAILABLE: 'success',
    PENDING: 'warning',
    BOOKED: 'info',
    CANCELLED: 'destructive',
    COMPLETED: 'secondary',
};

function CarCard({ car, onBook }) {

    const { statusColorMap } = useAuth();
    const navigate = useNavigate();

    const firstImage = car.carImages?.[0];

    const handleCardClick = () => {
        navigate(`/customer/car/${car.carId}`, { state: { car } });
    };

    return (
        <Card
            className="group cursor-pointer overflow-hidden hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 border-slate-100"
            onClick={handleCardClick}
        >
            {/* Car Image */}
            <div className="relative overflow-hidden">
                {firstImage ? (
                    <img
                        src={firstImage}
                        alt={`${car.brand} ${car.model}`}
                        className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-52 items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                        <Car className="h-16 w-16 text-slate-300" />
                    </div>
                )}
                {/* Status Badge Overlay */}
                <div className="absolute top-3 right-3">
                    <Badge
                        variant={statusBadgeVariant[car.carStatus] || 'default'}
                        className="px-2.5 py-1 text-[11px] uppercase tracking-wider shadow-sm"
                    >
                        {car.carStatus}
                    </Badge>
                </div>
                {/* Price Ribbon */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3 pt-8">
                    <div className="flex items-baseline gap-1 text-white">
                        <IndianRupee className="h-4 w-4" />
                        <span className="text-xl font-bold font-[Manrope] tracking-tight">
                            {car.pricePerDay?.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-white/80 font-[Source_Sans_3]">/ day</span>
                    </div>
                </div>
            </div>

            <CardContent className="p-5">
                {/* Brand + Model */}
                <div className="mb-3">
                    <h3 className="text-lg font-bold font-[Manrope] text-slate-900 tracking-tight">
                        {car.brand}
                    </h3>
                    <p className="text-sm text-slate-500 font-[Source_Sans_3]">
                        {car.model}
                    </p>
                </div>

                {/* Details */}
                <div className="flex items-center gap-4 text-xs text-slate-500 font-[Source_Sans_3]">
                    <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{car.year}</span>
                    </div>
                    <div className="flex items-center gap-1 truncate">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{car.dealerShipName}</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-0 pt-4">
                <p className="text-[11px] text-slate-400 font-[Source_Sans_3]">
                    Added {new Date(car.createdAt).toLocaleDateString('en-IN')}
                </p>
                <button
                    disabled={car.carStatus !== 'AVAILABLE'}
                    className="rounded-lg bg-[#1E3A8A] px-4 py-2 text-xs font-semibold text-white font-[Manrope] transition-all hover:bg-[#1E40AF] disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md"
                    onClick={(e) => {
                        e.stopPropagation();
                        onBook(car);
                    }}
                >
                    Book Now
                </button>
            </CardFooter>
        </Card>
    )
}

export default CarCard
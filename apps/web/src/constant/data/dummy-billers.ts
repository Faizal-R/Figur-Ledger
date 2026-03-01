// components/bills-recharges/data/dummyData.ts
import { 
  Zap, 
  Droplets, 
  // Wifi, 
  // Smartphone, 
  // Tv, 
  
  // Fuel ,
  History 
} from 'lucide-react';
import { Category } from '@/types/IBill';



export const CATEGORIES: Category[] = [
  { id: 'ALL', name: 'All Billers', icon: History, count: 13, color: 'bg-gradient-to-r from-slate-600 to-slate-700' },
  { id: 'ELECTRICITY', name: 'Electricity', icon: Zap, count: 3, color: 'bg-gradient-to-r from-yellow-500 to-orange-500' },
  { id: 'WATER', name: 'Water', icon: Droplets, count: 2, color: 'bg-gradient-to-r from-cyan-500 to-blue-500' },
  // { id: 'INTERNET', name: 'Internet', icon: Wifi, count: 2, color: 'bg-gradient-to-r from-red-500 to-pink-500' },
  // { id: 'MOBILE', name: 'Mobile', icon: Smartphone, count: 2, color: 'bg-gradient-to-r from-purple-500 to-indigo-500' },
  // { id: 'CABLE', name: 'Cable TV', icon: Tv, count: 2, color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
  // { id: 'GAS', name: 'Gas', icon: Fuel, count: 2, color: 'bg-gradient-to-r from-orange-500 to-red-500' },
];
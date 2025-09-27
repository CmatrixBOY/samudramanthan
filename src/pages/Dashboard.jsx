import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import Card, { CardHeader, CardTitle } from '../components/ui/card.jsx';

const SPECIES = ['Hilsa', 'Sardine', 'Tuna', 'Mackerel'];
const REGIONS = ['Bay of Bengal', 'Arabian Sea', 'Indian Ocean'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const WEATHER = [
  { key: 'sst', label: 'Sea Surface Temp (SST)' },
  { key: 'salinity', label: 'Salinity' }
];

export default function Dashboard() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [species, setSpecies] = useState('Hilsa');
  const [region, setRegion] = useState('Bay of Bengal');

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant={pathname.includes('fish')? 'default':'outline'} onClick={()=>nav('/dashboard/fish')}>Fish Insights</Button>
        <Button variant={pathname.includes('oceanography')? 'default':'outline'} onClick={()=>nav('/dashboard/oceanography')}>Oceanography</Button>
        <Button variant={pathname.includes('fishing-ratio')? 'default':'outline'} onClick={()=>nav('/dashboard/fishing-ratio')}>Fishing Ratio</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <div className="grid gap-3 p-6 pt-0 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm">Fish species</label>
            <select className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm" value={species} onChange={e=>setSpecies(e.target.value)}>
              {SPECIES.map(s=> <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm">Region</label>
            <select className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm" value={region} onChange={e=>setRegion(e.target.value)}>
              {REGIONS.map(r=> <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm">Season</label>
            <Input placeholder="e.g., Monsoon 2024" />
          </div>
        </div>
      </Card>

      <Outlet context={{ species, region }} />
    </div>
  );
}

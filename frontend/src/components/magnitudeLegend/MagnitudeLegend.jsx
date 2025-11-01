import React from 'react';

export default function MagnitudeLegend() {
  const legendData = [
    {
      code: 'ML',
      name: 'Local Magnitude (Richter)',
      description:
        'Based on the maximum amplitude of seismic waves recorded by local seismographs.',
      range: 'From 0 to ~6.5',
      notes:
        'The “classic” Richter scale. Still used for local and small events.',
    },
    {
      code: 'MW',
      name: 'Moment Magnitude',
      description:
        'Calculated from the mechanical energy released (seismic moment).',
      range: 'All values',
      notes:
        'The modern standard scale; replaces Richter for large earthquakes.',
    },
    {
      code: 'MB',
      name: 'Body-Wave Magnitude',
      description: 'Uses P-waves recorded at distant stations.',
      range: 'From 4 to ~6.5',
      notes: 'Used for deep or distant earthquakes.',
    },
    {
      code: 'MS',
      name: 'Surface-Wave Magnitude',
      description: 'Based on S or L waves recorded at large distances.',
      range: 'From 4.5 to ~8',
      notes: 'Good for medium-distance earthquakes.',
    },
    {
      code: 'MD',
      name: 'Duration Magnitude',
      description: 'Derived from the duration of the seismic signal.',
      range: 'From 0 to ~5',
      notes: 'Used for very weak earthquakes.',
    },
    {
      code: 'ME',
      name: 'Energy Magnitude',
      description: 'Calculated from the total radiated seismic energy.',
      range: 'All values',
      notes: 'Less common; useful for energy comparisons.',
    },
    {
      code: 'MI',
      name: 'Intensity Magnitude',
      description:
        'Empirical estimate based on observed effects (damage, perception).',
      range: 'From I to XII (MCS or Mercalli scale)',
      notes: 'Not a physical measure, but a perceptual one.',
    },
    {
      code: 'MWD',
      name: 'Moment Magnitude from Surface Waves',
      description:
        'A variant of MW using digital waveform inversion for distant events.',
      range: 'From 5 to 9+',
      notes: 'Used in modern global catalogs (e.g. USGS, INGV).',
    },
  ];

  return (
    <section className='overflow-x-auto border border-white/5 bg-white/[0.03] bg-opacity-50 rounded-lg'>
      <div className='overflow-x-auto'>
        <table className='min-w-full text-sm text-gray-200 border-collapse rounded-lg'>
          <thead>
            <tr className='bg-purple-500/20 text-purple-300 uppercase text-xs tracking-wider'>
              <th className='py-3 px-4 text-left'>Code</th>
              <th className='py-3 px-4 text-left'>Full Name</th>
              <th className='py-3 px-4 text-left'>Description</th>
              <th className='py-3 px-4 text-left'>Typical Range</th>
              <th className='py-3 px-4 text-left'>Notes</th>
            </tr>
          </thead>
          <tbody>
            {legendData.map((item, index) => (
              <tr
                key={item.code}
                className={`${
                  index % 2 === 0 ? 'bg-gray-800/50' : 'bg-gray-900/30'
                } hover:bg-purple-500/10 transition-colors`}
              >
                <td className='py-3 px-4 font-bold text-purple-400'>
                  {item.code}
                </td>
                <td className='py-3 px-4'>{item.name}</td>
                <td className='py-3 px-4'>{item.description}</td>
                <td className='py-3 px-4 text-center'>{item.range}</td>
                <td className='py-3 px-4'>{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

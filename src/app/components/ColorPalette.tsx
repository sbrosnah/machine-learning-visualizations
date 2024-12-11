// components/ColorPalette.jsx
const colorVariables = [
  { name: '--background', description: 'Background Color' },
  { name: '--foreground', description: 'Foreground Color' },
  { name: '--card', description: 'Card Background' },
  { name: '--card-foreground', description: 'Card Foreground' },
  { name: '--popover', description: 'Popover Background' },
  { name: '--popover-foreground', description: 'Popover Foreground' },
  { name: '--primary', description: 'Primary Background' },
  { name: '--primary-foreground', description: 'Primary Foreground' },
  { name: '--secondary', description: 'Secondary Background' },
  { name: '--secondary-foreground', description: 'Secondary Foreground' },
  { name: '--muted', description: 'Muted Background' },
  { name: '--muted-foreground', description: 'Muted Foreground' },
  { name: '--accent', description: 'Accent Background' },
  { name: '--accent-foreground', description: 'Accent Foreground' },
  { name: '--destructive', description: 'Destructive Background' },
  { name: '--destructive-foreground', description: 'Destructive Foreground' },
  { name: '--border', description: 'Border Color' },
  { name: '--input', description: 'Input Background' },
  { name: '--ring', description: 'Ring Color' },
  { name: '--chart-1', description: 'Chart 1 Color' },
  { name: '--chart-2', description: 'Chart 2 Color' },
  { name: '--chart-3', description: 'Chart 3 Color' },
  { name: '--chart-4', description: 'Chart 4 Color' },
  { name: '--chart-5', description: 'Chart 5 Color' },
  // Add other variables as needed
];

const ColorPalette = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Color Palette</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {colorVariables.map((color) => (
          <div key={color.name} className="flex flex-col items-center">
            <div
              className="w-16 h-16 rounded"
              style={{ backgroundColor: `hsl(var(${color.name}))` }}
            ></div>
            <p className="mt-2 text-center text-sm">{color.description}</p>
            <p className="text-xs text-gray-500">{`var(${color.name})`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;

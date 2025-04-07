type DataCardProps = {
  title: string;
  value: string;
};

const DataCard = ({ title, value }: DataCardProps) => {
  return (
    <div className="bg-card-background max-w-54 p-4 rounded-lg shadow-dataCard border-1 border-card-stroke">
      <p className="text-sm text-secondary">{title}</p>
      <p className="text-h3 text-black-zapp">{value}</p>
    </div>
  );
};

export default DataCard;

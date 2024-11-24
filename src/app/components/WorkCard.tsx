// WorkCard Component
const WorkCard = ({
  color,
  title,
  description,
  icon,
}: {
  color: string;
  title: string;
  description: string;
  icon: string;
}) => (
  <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-black border-opacity-20">
    <div className="flex items-start space-x-4">
      <div
        className={`w-12 h-12 rounded-full flex-shrink-0`}
        style={{ backgroundColor: color }}
      >
        <span className="text-2xl flex items-center justify-center h-full w-full">
          {icon}
        </span>
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-2 font-display">{title}</h3>
      </div>
    </div>
    <div className="flex-1">
      <p className="text-gray-600 text-sm leading-relaxed font-display-sans">
        {description}
      </p>
    </div>
  </div>
);

export default WorkCard;

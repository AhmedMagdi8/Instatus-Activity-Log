import React from 'react';

const ActivityLogItem = (obj: any) => {
    const { target_name, action, occurred_at, onExpand } = obj;

    // Adjust the date
    const date = new Date(occurred_at);
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const newDate = new Intl.DateTimeFormat('en-US', options).format(date);
    // End of adjusting the date

    const initials = target_name.split('@')[0][0].toUpperCase();
    const colors = ['bg-purple-500', 'bg-gradient-a', 'bg-gradient-b', 'bg-gradient-o'];
    const colorClass = colors[Math.floor(Math.random() * colors.length)];

    return (
        <tr className="border-t border-gray-200 cursor-pointer hover:bg-gray-100" onClick={onExpand}>
            <td className="p-2 md:p-4 flex items-center text-xs md:text-sm font-semibold text-gray-800">
                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full ${colorClass} text-white flex items-center justify-center mr-2 md:mr-3`}>
                    {initials}
                </div>
                <span className="truncate">{target_name}</span>
            </td>
            <td className="p-2 md:p-4 text-xs md:text-sm font-semibold text-gray-800">
                <span className="truncate">{action.name}</span>
            </td>
            <td className="p-2 md:p-4 text-gray-500 text-xs md:text-sm font-semibold whitespace-nowrap">{newDate}</td>
        </tr>
    );
};

export default ActivityLogItem;

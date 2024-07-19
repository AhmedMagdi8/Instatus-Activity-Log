import React from 'react';

const ExpandedView = (obj: any) => {
    // Adjust the date
    const date = new Date(obj.occurred_at);
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const newDate = new Intl.DateTimeFormat('en-US', options).format(date);

    return (
        <tr className="relative z-10">
            <td colSpan={3} className="bg-gray-50 border-t border-b border-gray-200">
                <div className="transform scale-105 overflow-hidden relative bg-white border border-gray-200 rounded-xl">
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-sm p-4">
                        <div>
                            <h3 className="font-semibold text-gray-400 mb-2">ACTOR</h3>
                            <div className="grid grid-cols-[100px_1fr]">
                                <span className="text-gray-400">Name</span>
                                <span className="span-font">{obj.actor_name}</span>
                                <span className="text-gray-400">Email</span>
                                <span className="span-font">{obj.target_name}</span>
                                <span className="text-gray-400">ID</span>
                                <span className="span-font">{obj.actor_id}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-400 mb-2">ACTION</h3>
                            <div className="grid grid-cols-[100px_1fr]">
                                <span className="text-gray-400">Name</span>
                                <span className="span-font">{obj.action.name}</span>
                                <span className="text-gray-400">Object</span>
                                <span className="span-font">{obj.action.object}</span>
                                <span className="text-gray-400">ID</span>
                                <span className="span-font">{obj.action.id}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-400 mb-2">DATE</h3>
                            <div className="grid grid-cols-[100px_1fr]">
                                <span className="text-gray-400">Readable</span>
                                <span className="span-font">{newDate}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-400 mb-2">METADATA</h3>
                            <div className="grid grid-cols-[100px_1fr]">
                                <span className="text-gray-400">ID</span>
                                <span className="span-font">{obj.metadata.id}</span>
                                <span className="text-gray-400">Redirect</span>
                                <span className="span-font">{obj.metadata.redirect}</span>
                                <span className="text-gray-400">Description</span>
                                <span className="span-font">{obj.metadata.description}</span>
                                <span className="text-gray-400">Request ID</span>
                                <span className="span-font">{obj.metadata.xRequestId}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-400 mb-2">TARGET</h3>
                            <div className="grid grid-cols-[100px_1fr]">
                                <span className="text-gray-400">ID</span>
                                <span className="span-font">{obj.target_id}</span>
                                <span className="text-gray-400">Name</span>
                                <span className="span-font">{obj.target_name}</span>
                                <span className="text-gray-400">Location</span>
                                <span className="span-font">{obj.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default ExpandedView;

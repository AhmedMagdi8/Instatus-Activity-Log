import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import io from 'socket.io-client';

import ActivityLogItem from './ActivityLogItem';
import ExpandedView from './ExpandedView';

const fetcher = async (url: any) => await fetch(url).then((res) => res.json());

const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const ActivityLog = () => {
    const [page, setPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [activityData, setActivityData] = useState<any[]>([]);

    const { data, error, mutate } = useSWR(
        `http://127.0.0.1:8000/events?pageNumber=${page}&searchTerm=${searchTerm}`,
        fetcher
    );

    const [expandedItem, setExpandedItem] = useState<number | null>(null);

        useEffect(() => {
            if (data) {
                setActivityData(data);
            }
        }, [data]);

        useEffect(() => {
            const socket = io('http://127.0.0.1:8000');

            socket.on('newEvent', (newEvent: any) => {
                setActivityData(prevData => {
                    const updatedData = [newEvent, ...prevData];
                    if (updatedData.length > 1) {
                        updatedData.splice(-1);
                    }
                    return updatedData;
                });
            });

            return () => {
                socket.disconnect();
            };
        }, [page]);

    if (error) return <div>Failed to load</div>;

    const handleExpand = (index: any) => {
        setExpandedItem(expandedItem === index ? null : index);
    };

    const handleSearch = debounce((term: string) => {
        setSearchTerm(term);
        setPage(1); // Reset to first page on new search
        mutate();
    }, 300); // 300ms debounce delay

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
        mutate(); // Re-fetch data after page update
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white shadow-md rounded-b-lg relative">
                <div className="p-4 bg-gray-100 rounded-t-lg">
                    <input
                        type="text"
                        placeholder="Search name, email or action..."
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md"
                    />
                </div>
                <div className={`relative ${!data && 'opacity-50'}`}>
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="text-left text-gray-500 bg-gray-100 text-sm">
                                <th className="pl-5 pt-0 pb-2">ACTOR</th>
                                <th className="pl-5 pt-0 pb-2">ACTION</th>
                                <th className="pl-5 pt-0 pb-2">DATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length > 0 ? (
                                data.map((item: any, index: number) => (
                                    <React.Fragment key={index}>
                                        {expandedItem !== index && (
                                            <ActivityLogItem
                                                {...item}
                                                onExpand={() => handleExpand(index)}
                                            />
                                        )}
                                        {expandedItem === index && <ExpandedView {...item} />}
                                    </React.Fragment>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="text-center p-4 text-gray-500">
                                        No data to show
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="p-4 text-center rounded-b-lg bg-gray-100">
                        <button
                            className="text-gray-600 font-medium"
                            onClick={loadMore}
                            disabled={data?.isLastPage}
                        >
                            LOAD MORE
                        </button>
                    </div>
                </div>
                {!data && (
                    <div className="absolute inset-0 flex justify-center items-center">
                        <div className="w-12 h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityLog;

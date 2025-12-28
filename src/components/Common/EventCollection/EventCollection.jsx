import React, { useMemo } from "react";
import CategoryRoller from "../../Common/Roller/CategoryRoller";

const EventCollection = ({ heroType, data = [] }) => {
    const groupedData = useMemo(() => {
        return data.reduce((acc, item) => {
            let type;
            if (heroType == "home") {
                type = item.label;
            } else {
                type = item.state;
            }
            if (!acc[type]) acc[type] = [];

            acc[type].push({
                id: item.id,
                name: item.title,
                imageUrl: item.cover_image_url,
                description: item.short_description,
                videoUrl: item.promo_video_url || "",
                label: item.label || "",
            });

            return acc;
        }, {});
    }, [data]);

    if (!data.length) return null;

    return (
        <main className="max-w-screen-2xl mx-auto py-8">
            <div className="space-y-12">
                {Object.entries(groupedData).map(([category, items]) => (
                    <CategoryRoller
                        key={category}
                        title={category}
                        items={items}
                    />
                ))}
            </div>
        </main>
    );
};

export default EventCollection;

import React from "react";

interface ConstructionSite {
    id: string;
    name: string;
    address: string;
    status: string;
    imageUrl: string;
    lastUpdate?: string;
}

const constructionSites: ConstructionSite[] = [
    {
        id: "1",
        name: "Građevina A",
        address: "Zagreb",
        status: "Aktivan",
        imageUrl:
            "",
        lastUpdate: "2023-04-15T10:30Z",
    },
    {
        id: "2",
        name: "Građevina B",
        address: "Split",
        status: "Završen",
        imageUrl:
            "",
        lastUpdate: "2023-03-22T14:20Z",
    },
    {
        id: "3",
        name: "Građevina C",
        address: "Rijeka",
        status: "Na čekanju",
        imageUrl:
            "",

    },
    {
        id: "4",
        name: "Građevina D",
        address: "Osijek",
        status: "Aktivan",
        imageUrl:
            "",
        lastUpdate: "2023-05-10T09:15Z",
    },
    {
        id: "5",
        name: "Građevina E",
        address: "Varaždin",
        status: "Aktivan",
        imageUrl:
            "",
        lastUpdate: "2023-06-01T12:45Z",
    },
    {
        id: "6",
        name: "Građevina F",
        address: "Zadar",
        status: "Završen",
        imageUrl:
            "",
    },
];

const ProjectsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Popis gradilišta</h1>
                <ul role="list" className="divide-y divide-gray-200">
                    {constructionSites.map((site) => (
                        <li key={site.id} className="flex justify-between items-center py-5">
                            <div className="flex items-center gap-4">
                                <img
                                    src={site.imageUrl}
                                    alt={`Slika ${site.name}`}
                                    className="w-16 h-16 rounded-full object-cover bg-gray-50"
                                />
                                <div>
                                    <p className="text-lg font-semibold text-gray-900">{site.name}</p>
                                    <p className="text-sm text-gray-500">{site.address}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">{site.status}</p>
                                {site.lastUpdate ? (
                                    <p className="text-xs text-gray-500">
                                        Zadnje ažuriranje:{" "}
                                        <time dateTime={site.lastUpdate}>
                                            {new Date(site.lastUpdate).toLocaleString("hr-HR", {
                                                dateStyle: "short",
                                                timeStyle: "short",
                                            })}
                                        </time>
                                    </p>
                                ) : (
                                    <div className="flex items-center justify-end text-xs text-gray-500">
                                        <span
                                            className="inline-flex items-center justify-center h-2 w-2 rounded-full bg-emerald-500 mr-1"></span>
                                        Trenutno u gradnji
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProjectsPage;
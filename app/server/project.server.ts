import { Namespace } from './mint.server';

export type Project = {
    namespace: Namespace;
    aliases: Namespace[];
};

export function getProjectData(project: string): Promise<Project> {
    console.log(project);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                namespace: {
                    name: 'apollo',
                    address: 'addr1qyp9ut60xhp0u936g6qjng29n5usgj7x235qyq22jfzhkqcl2q7csldaa358nhncufmgr2nvxs6t8chnn9v2zssg9g7qxy3kn4',
                    policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a',
                    timestamp: 1609593559000,
                    hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
                },
                aliases: [
                    {
                        name: 'artemis',
                        address: 'addr1qyp9ut60xhp0u936g6qjng29n5usgj7x235qyq22jfzhkqcl2q7csldaa358nhncufmgr2nvxs6t8chnn9v2zssg9g7qxy3kn4',
                        policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a',
                        timestamp: 1609593559000,
                        hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
                    },
                    {
                        name: 'zeus',
                        address: 'addr1qyp9ut60xhp0u936g6qjng29n5usgj7x235qyq22jfzhkqcl2q7csldaa358nhncufmgr2nvxs6t8chnn9v2zssg9g7qxy3kn4',
                        policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a',
                        timestamp: 1609593559000,
                        hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
                    },
                ],
            });
            // resolve([]);
        }, 1000);
    });
}

import { useMatches } from '@remix-run/react';
import { Project } from '~/server/project.server';

export function useProjectData(): Project | null {
    const all = useMatches();
    const match = all.find(match => match.id === 'routes/_console') as { data: { projectData: Project } };
    if (match) {
        return match.data?.projectData as Project;
    }
    return null;
}

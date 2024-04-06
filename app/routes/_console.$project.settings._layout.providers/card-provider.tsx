import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import { Provider } from '~/server/providers.server';

type ProviderProps = {
    provider: Provider;
    handleProviderChange: (checked: boolean, providerId: number) => void;
    fetcherRunning: boolean;
    fetchingProviderId?: string | false;
};

export default function CardProvider(props: ProviderProps) {
    const { provider: p, handleProviderChange, fetcherRunning } = props;
    const [isFetching, setIsFetching] = useState(false);

    function handleOnChange(checked: boolean) {
        setIsFetching(true);
        handleProviderChange(checked, p.id);
    }

    useEffect(() => {
        if (!fetcherRunning) {
            setIsFetching(false);
        }
    }, [fetcherRunning]);

    return (
        <div className="card-base">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img className="h-10" src={p.logo} alt={p.name} />
                    <div className="font-medium text-2xl" title="Name">
                        {p.name}
                    </div>
                </div>
                <Switch
                    checked={p.isEnabled}
                    onChange={checked => handleOnChange(checked)}
                    className={`${p.isEnabled ? 'bg-accent1' : 'bg-gray-500'} ${
                        isFetching && 'ring-2 ring-accent1/70'
                    } relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent duration-200 ease-in-out transition-all`}
                    disabled={fetcherRunning}
                >
                    <span className="sr-only">Use setting</span>
                    <span
                        aria-hidden="true"
                        className={`${
                            p.isEnabled ? 'translate-x-9' : 'translate-x-0'
                        } pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                </Switch>
            </div>
            <div className="label-1 mt-5">Region</div>
            <div className="font-medium">{p.location}</div>
            <div className="label-1 mt-4">Features</div>
            <div className="flex flex-wrap gap-3 mt-2">
                {p.features?.map((f, i) => (
                    <div key={i} className="tag-accent1">
                        {f}
                    </div>
                ))}
            </div>
            {p.supportLink && (
                <a href={p.supportLink} target="_blank" rel="noopener noreferrer" className="btn-secondary-mini mt-8">
                    get support
                </a>
            )}
        </div>
    );
}

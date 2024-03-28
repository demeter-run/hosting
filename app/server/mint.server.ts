export function checkAvailability(namespace: string): Promise<boolean> {
    // console.log(namespace);
    const namespaces = ['demeter', 'apollo', 'zeus', 'hermes', 'athena', 'artemis', 'ares', 'dionysus', 'hades'];
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(!namespaces.includes(namespace));
        }, 1000);
    });
}

export function getTxCbor(namespace: string, address: string): Promise<string> {
    console.log(namespace);
    console.log(address);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(
                '84a400828258206c732139de33e916342707de2aebef2252c781640326ff37b86ec99d97f1ba8d0182582018f86700660fc88d0370a8f95ea58f75507e6b27a18a17925ad3b1777eb0d77600018783581d703a888d65f16790950a72daee1f63aa05add6d268434107cfa5b67712821a000f52c6a05820923918e403bf43c34b4ef6b48eb2ee04babed17320d8d1b9ff9ad086e86f44ec83581d703a888d65f16790950a72daee1f63aa05add6d268434107cfa5b67712821a000f52c6a0582054ad3c112d58e8946480e21d6a35b2a215d1a9a8f540c13714ded86e4b0b6aea83581d703a888d65f16790950a72daee1f63aa05add6d268434107cfa5b67712821a000f52c6a05820ed33125018c5cbc9ae1b242a3ff8f3db2e108e4a63866d0b5238a34502c723ed83581d703a888d65f16790950a72daee1f63aa05add6d268434107cfa5b67712821a000f52c6a05820b0ea85f16a443da7f60704a427923ae1d89a7dc2d6621d805d9dd441431ed70083581d703a888d65f16790950a72daee1f63aa05add6d268434107cfa5b67712821a000f52c6a05820831a557bc2948e1b8c9f5e8e594d62299abff4eb1a11dc19da38bfaf9f2da40783581d703a888d65f16790950a72daee1f63aa05add6d268434107cfa5b67712821a000f52c6a05820c695868b4bfbf4c95714e707c69da1823bcf8cfc7c4b14b92c3645d4e1943be382581d60b6c8794e9a7a26599440a4d0fd79cd07644d15917ff13694f1f672351b00000001af62c125021a0002dfb10b58209dc070b08ae8dbd9ced77831308173284a19ab4839ce894fca45b8e3752a8a42a2008182582031ae74f8058527afb305d7495b10a99422d9337fc199e1f28044f2c477a0f94658409d9315424385661b9c17c0c9b96eeb61645d8f18cbefd43aa87677aae8cc2282642650d41004a11d1d0b66146da9fa22c824e6c1b9e0525268e9a43078fb670c049fd8799f413101ffd905039fa101423131d8798043313131ffd87980a10142313141319f0102fffff5f6',
            );
        }, 1000);
    });
}

export function getTxStatus(hash: string): Promise<'pending' | 'confirmed' | 'expired'> {
    console.log(hash);
    // const statuses = ['pending', 'confirmed', 'expired'];
    return new Promise(resolve => {
        setTimeout(() => {
            // resolve(statuses[Math.floor(Math.random() * statuses.length)]);
            resolve('pending');
        }, 1000);
    });
}

export type Namespace = {
    policyId: string;
    name: string;
    timestamp: string | number;
    hash: string;
};

export function getNamespaces(address: string): Promise<Namespace[]> {
    console.log(address);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a',
                    name: 'apollo',
                    timestamp: 1609593559000,
                    hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
                },
                {
                    policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a',
                    name: 'artemis',
                    timestamp: 1609593559000,
                    hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
                },
                {
                    policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a',
                    name: 'zeus',
                    timestamp: 1609593559000,
                    hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
                },
            ]);
            // resolve([]);
        }, 1000);
    });
}

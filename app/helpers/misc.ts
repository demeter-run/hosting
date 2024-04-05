export async function mockApiCall() {
    return new Promise(resolve => setTimeout(resolve, 1000));
}

interface LoaderOptions {
    apiKey: string;
}

class Loader {
    protected baseLink: string;
    protected options: LoaderOptions;

    constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        params: { endpoint: string; options?: object },
        callback: (data: any) => void
    ): void {
        this.load('GET', params.endpoint, callback, params.options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            } else {
                throw Error(res.statusText);
            }
        }

        return res;
    }

    makeUrl(options: object, endpoint: string): string {
        const urlOptions: Record<string, {}> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: (data: any) => void, options: object = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

const appLoader = new Loader(process.env.API_URL as string, {
    apiKey: process.env.API_KEY as string,
});

appLoader.getResp({ endpoint: '/endpoint', options: {} }, (data) => {
    console.log(data);
});

export default Loader;

import Loader from './loader';

interface Config {
    apiKey: string;
    apiUrl: string;
}

const config: Config = {
    apiKey: process.env.API_KEY as string,
    apiUrl: process.env.API_URL as string,
};



class AppLoader extends Loader {
    constructor() {
        super(config.apiUrl, config);
    }
}

export default AppLoader;

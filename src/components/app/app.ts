import AppController from '../controller/controller';
import AppView from '../view/appView';


interface Article {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: Date;
}

interface Source {
    id: string;
    name: string;
    logo: string;
}

interface ArticlesResponse {
    articles: Article[];
}

interface SourcesResponse {
    sources: Source[];
}



class App {
    public controller: AppController;
    public view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
       const source = document.querySelector('.sources')
           if(source) {
               source.addEventListener('click', (e: Event) => this.controller.getNews(e, (data: ArticlesResponse) => this.view.drawNews(data)));
           }
        this.controller.getSources((data: SourcesResponse) => this.view.drawSources(data));
    }
}

export default App;

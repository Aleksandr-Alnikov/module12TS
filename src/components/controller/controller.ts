import AppLoader from './appLoader';

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

class AppController extends AppLoader {
    getSources(callback: (data: SourcesResponse) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: (data: ArticlesResponse) => void): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target && target !== newsContainer) {
            if (target.classList && target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId !== null && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;

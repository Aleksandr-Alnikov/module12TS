import './news.css';


interface Data {
    urlToImage?: string;
    author?: string;
    source: { name: string };
    publishedAt: string;
    title: string;
    description: string;
    url: string;
}



class News {
    draw(data: Data[]) {
        const news = data.length >= 10 ? data.filter((_item: Data, idx: number) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.getElementById('newsItemTemp') as HTMLTemplateElement;
        if (!newsItemTemp) return;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            const newsItemElement = newsClone.querySelector('.news__item') as HTMLElement;
            if (newsItemElement) {
                if (idx % 2) newsItemElement.classList.add('alt');

                const photoElement = newsClone.querySelector('.news__meta-photo') as HTMLElement;
                if (photoElement) {
                    photoElement.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                }

                const authorElement = newsClone.querySelector('.news__meta-author') as HTMLElement;
                if (authorElement) {
                    authorElement.textContent = item.author || item.source.name;
                }

                const dateElement = newsClone.querySelector('.news__meta-date') as HTMLElement;
                if (dateElement) {
                    dateElement.textContent = item.publishedAt
                        .slice(0, 10)
                        .split('-')
                        .reverse()
                        .join('-');
                }

                const titleElement = newsClone.querySelector('.news__description-title') as HTMLElement;
                if (titleElement) {
                    titleElement.textContent = item.title;
                }

                const sourceElement = newsClone.querySelector('.news__description-source') as HTMLElement;
                if (sourceElement) {
                    sourceElement.textContent = item.source.name;
                }

                const contentElement = newsClone.querySelector('.news__description-content') as HTMLElement;
                if (contentElement) {
                    contentElement.textContent = item.description;
                }

                const linkElement = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement;
                if (linkElement) {
                    linkElement.setAttribute('href', item.url);
                }
            }

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news') as HTMLElement;
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;

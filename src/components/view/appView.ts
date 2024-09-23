import News from './news/news';
import Sources from './sources/sources';



export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data:any):void {
        try {
            const values = data.articles || [];

            this.news.draw(values);
        } catch (error) {
            console.error(error);
        }
    }

    drawSources(data:any) {
        try {
            const values = data.sources || [];
            this.sources.draw(values);
            console.log(data)
        } catch (error) {
            console.error("Не удалось отобразить источники:", error);
        }
    }
}

export default AppView;

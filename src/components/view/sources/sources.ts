import './sources.css';

interface SourceData {
    name: string;
    id: number;
}

class Sources {
    public draw(data: SourceData[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemplate = document.getElementById('sourceItemTemp') as HTMLTemplateElement;

        if (!sourceItemTemplate) {
            throw new Error('Could not find template with id #sourceItemTemp');
        }

        const sourceItemTemplateContent = sourceItemTemplate.content;

        data.forEach((item) => {
            const sourceClone = sourceItemTemplateContent.cloneNode(true) as DocumentFragment;

            const nameElement = sourceClone.querySelector<HTMLParagraphElement>('.source__item-name');
            if (nameElement) {
                nameElement.textContent = item.name;
            }

            const itemElement = sourceClone.querySelector<HTMLElement>('.source__item');
            if (itemElement) {
                itemElement.setAttribute('data-source-id', String(item.id));
            }

            fragment.appendChild(sourceClone);
        });

        const sourcesContainer = document.querySelector<HTMLElement>('.sources');
        if (sourcesContainer) {
            sourcesContainer.appendChild(fragment);
        } else {
            console.warn('Container .sources not found');
        }
    }
}


export default Sources;




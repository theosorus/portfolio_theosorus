

export interface Project {
    id: string;
    date: number;
    type: string;
    title: string;
    description: string;
    tags: Tag[];
    links: string[];
    image: string;
    categories: string[];
}


interface Tag {
    name: string;
    url: string;
    image?: string;
}
export const item = async <T>(id: string | number): Promise<T> => {
    const data = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    const jsonData: T = await data.json();

    return jsonData;
};

export const items = async <T>(kids: number[]): Promise<T[]> => {
    const itms = await Promise.all(kids.map(kid => item<T>(kid)));

    return itms
}

export const topStories = async () => {
    const ids = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    const jsonData: number[] = await ids.json();

    return jsonData.slice(0, 25).map(id => ({id}));
};

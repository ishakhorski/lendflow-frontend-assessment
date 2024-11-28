type OptionalProperties<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface Post {
    id: number;
    title: string;
    content: string | null;
}

type NewPost = OptionalProperties<Post, 'id'>;

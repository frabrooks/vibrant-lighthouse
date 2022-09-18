export interface Todo {
    id?: number;
    title: string;
    due_soon: boolean;
    important: boolean;
    created_at?: Date;
}
export interface ITask{
    id?: number;
    state?: number;
    priority?: number;
    name?: string;
    description?: string;
    deadline?: Date;
    created_at?: string;
    updated_at?: string;
}
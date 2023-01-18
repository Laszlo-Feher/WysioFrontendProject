import { ITask } from "./task";

export interface IBoard{
    columns: IColumn[]
}

export class IColumn {
    id: number;
    name: string;
    tasks: ITask[];
}
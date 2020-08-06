import { WithId } from '../../lib/utils';

export interface IComment extends WithId{
    score: number;
    time: number;
    text: string;
    kids: number[];
    parent: number;
    type: 'comment';
    by: string;
}

export interface IDeletedComment extends WithId {
    score: number;
    time: number;
    deleted: true;
    parent: number;
    type: 'comment';
}

export const isDeleted = (comment: TComment): comment is IDeletedComment => 'deleted' in comment;

export type TComment = IComment | IDeletedComment;
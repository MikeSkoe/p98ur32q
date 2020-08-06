import { TComment, isDeleted } from "../types/comment";
import { Div, String } from "../../nodes/index";
import InnerHTML from "../../nodes/InnerHTML";
import If from "../../nodes/If";

export const CommentItem = (comment: TComment) =>
    isDeleted(comment)
        ? Div(String('deleted message')).className('comment-deleted')
        : Div(
            Div(String(comment.by)).className('by'),
            InnerHTML(comment.text),
            If(Boolean(comment.kids),
                () => Div(String(`(${comment.kids?.length})`)).className('kids'),
            )
        ).className('comment');

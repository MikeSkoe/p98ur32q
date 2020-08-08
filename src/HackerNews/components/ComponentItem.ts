import { TComment, isDeleted } from "../types/comment";
import { Div, String } from "../../nodes/index";
import InnerHTML from "../../nodes/InnerHTML";
import If from "../../nodes/If";

export const CommentItem = (comment: TComment) =>
    isDeleted(comment)
        ? Div(String('deleted message'))
            .onRemove(node => node.classList.add('comment-deleted'))
        : Div(
            Div(String(comment.by))
                .onRemove(node => node.classList.add('by')),
            InnerHTML(comment.text),
            If(Boolean(comment.kids),
                () => Div(String(`(${comment.kids?.length})`))
                    .onRemove(node => node.classList.add('kids')),
            )
        )
            .onRemove(node => node.classList.add('comment'));

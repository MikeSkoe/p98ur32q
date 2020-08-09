import { TComment, isDeleted } from "../types/comment";
import { Div, String } from "../../nodes/index";
import InnerHTML from "../../nodes/InnerHTML";
import If from "../../nodes/If";
import { className } from "../../nodes/nodeManipulations";

export const CommentItem = (comment: TComment) =>
    isDeleted(comment)
        ? Div(String('deleted message'))
            .with(className('comment-deleted'))
        : Div(
            Div(String(comment.by))
                .with(className('by')),
            InnerHTML(comment.text),
            If(Boolean(comment.kids),
                () => Div(String(`(${comment.kids?.length})`))
                    .with(className('kids')),
            )
        )
            .with(className('comment'));

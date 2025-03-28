import { createBlockElementInfo } from "@/dian/lib/framework/renderer"
import { BlockElement } from "@/dian/types/TxdDocumentTypes"
import InlineElement from "../inline/InLineElement";

const GoldenbergHeader = ({ data }: { data: BlockElement }) => {
    const level = data.command.defaultParam || 3;
    return (
        <h1
            key={JSON.stringify(data)}
            className={"text-" + String(level) +"xl font-bold"}
        >
            <InlineElement
                contents={data.content}
            />
        </h1>
    )
}

export const GoldenbergHeaderElement = createBlockElementInfo(
    '标题',
    'TITLE',
    '这是一个标题元素，用于展示文章标题',
    'HEADER_COMMAND_NAME',
    GoldenbergHeader
);

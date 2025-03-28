import { createBlockElementInfo } from "@/dian/lib/framework/renderer"
import { BlockElement } from "@/dian/types/TxdDocumentTypes"
import InlineElement from "../inline/InLineElement";

const GoldenbergParagraph = ({ data }: { data: BlockElement }) => {
    return (
        <div
            key={JSON.stringify(data)}
            className="flex flex-col gap-4"
        >
            <p className="text-lg leading-7">
                <InlineElement
                    contents={data.content}
                />
            </p>
        </div>
    )
}

export const GoldenbergParagraphElement = createBlockElementInfo(
    '段落',
    'PARAGRAPH',
    '这是一个段落元素，用于展示段落',
    'PARAGRAPH_COMMAND_NAME',
    GoldenbergParagraph
);

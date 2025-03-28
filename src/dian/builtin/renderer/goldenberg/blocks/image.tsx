import { createBlockElementInfo } from "@/dian/lib/framework/renderer"
import { BlockElement } from "@/dian/types/TxdDocumentTypes"
import InlineElement from "../inline/InLineElement";

const GoldenbergImage = ({ data }: { data: BlockElement }) => {
    return (
        <div
            key={JSON.stringify(data)}
            className="flex flex-col gap-4"
        >
            <div className="text-lg leading-7">
                <img
                // 图片居中，根据屏幕适应尺寸，电脑端80%宽度，手机端全宽
                    className="mx-auto max-w-80% w-full"
                    src={data.command.defaultParam || ''}
                    alt={data.command.params.get('alt') || ''}
                />
                {/* 图注 */}
                <div
                    // 居中，字体大小，行高，颜色
                    className="text-sm leading-4 text-gray-500 text-center"
                    style={{
                        marginTop: '0.5rem',
                    }}
                >
                    <InlineElement
                        contents={data.content}
                    />
                </div>
            </div>
        </div>
    )
}

export const GoldenbergImageElement = createBlockElementInfo(
    '图片',
    'IMAGE',
    '这是一个段落元素，用于展示图片',
    'PARAGRAPH_IMAGE_NAME',
    GoldenbergImage
);

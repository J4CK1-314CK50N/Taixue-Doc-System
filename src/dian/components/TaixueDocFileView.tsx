'use client'
import { useEffect, useMemo, useState } from "react";
import { BlockElementInfo, Renderer } from "../lib/framework/renderer";
import useLocalStorage from "../lib/hooks/use_local_storage"
import { TxdDocument } from "../types/TxdDocumentTypes";
import { parseTxdDocument } from "../lib/parser/parser";
import { ObjectView } from "react-object-view";

interface TaixueDocFileViewProps {
    // 定义属性
    renderers: Renderer[];
    document: string;
}

const TaixueDocFileView: React.FC<TaixueDocFileViewProps> = ({
    renderers,
    document,
}) => {
    const [devMode, setDevMode] = useLocalStorage('devMode', false);
    const [ignoreOrigin, setIgnoreOrigin] = useLocalStorage('ignoreOrigin', false);

    const [parseResult, setParseResult] = useState<TxdDocument>();
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (document) {
            try {
                const txdDocument: TxdDocument = parseTxdDocument(document);
                setParseResult(txdDocument);
                setError(undefined);
            } catch (error) {
                console.error(error);
                setError((error as Error).message)
            }
        }
    }, [document]);

    const renderList: Record<string, BlockElementInfo> = useMemo(() => {
        let result = {};
        // 反转遍历顺序
        for (let i = renderers.length - 1; i >= 0; i--) {
            const renderer = renderers[i];
            result = {
                ...result,
                ...renderer.elements,
            }
        }
        return result;
    }, [renderers]);

    return (
        <>
            {/* 如果渲染器存在，且parse结果存在，那么对结果中blocks中的每一项，都找到和项中command的type一致的渲染器，调用渲染 */}
            {
                parseResult && Object.keys(parseResult).length > 0 ?
                    parseResult.blocks.map((block) => {
                        const renderer = renderList[block.command.type];
                        if (renderer) {
                            return renderer.content({
                                data: block
                            });
                        }
                        return (
                            // 使用错误的样式，并使用 ObjectView 来展示无法渲染的节点
                            <div
                                className="border border-red-500 p-4 rounded-md"
                                key={JSON.stringify(block)}
                            >
                                <h3 className="text-center text-2xl font-bold">
                                    Error
                                </h3>
                                <p className="text-center text-lg">
                                    Cannot find renderer for {block.command.type}
                                </p>
                                <ObjectView
                                    data={block}
                                />
                            </div>
                        );
                    }
                    ) :
                    // 展示无数据或错误信息
                    <div>
                        {
                            error ?
                                <div className="flex flex-col gap-4 h-full">
                                    <h3 className="text-center text-2xl font-bold">
                                        Error
                                    </h3>
                                    <p className="text-center text-lg">
                                        {error}
                                    </p>
                                </div> :
                                <div className="flex flex-col gap-4 h-full">
                                    <h3 className="text-center text-2xl font-bold">
                                        No Data
                                    </h3>
                                    <p className="text-center text-lg">
                                        Please input a Taixue Doc File.
                                    </p>
                                </div>
                        }
                    </div>
            }
        </>
    )
}

export default TaixueDocFileView;
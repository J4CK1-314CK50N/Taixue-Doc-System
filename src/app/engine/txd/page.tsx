'use client'
import { parseTxdDocument } from "@/dian/lib/parser/parser";
import { TxdDocument } from "@/dian/types/TxdDocumentTypes";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
// ts-ignore
// 尝试安装类型声明文件
// 先在终端执行以下命令
// npm i --save-dev @types/react-object-view
// 如果安装失败，可在项目中创建一个新的.d.ts文件，例如 typings.d.ts，并添加以下内容
// declare module 'react-object-view';
import { ObjectView } from 'react-object-view';
import TaixueDocFileView from "@/dian/components/TaixueDocFileView";
import { createBlockElementInfo, createRenderer } from "@/dian/lib/framework/renderer";
import GoldenbergRenderer from "@/dian/builtin/renderer/goldenberg/goldenberg_renderer";
import useLocalStorage from "@/dian/lib/hooks/use_local_storage";
import Link from "next/link";

const testRenderer = createRenderer(
    'test_renderer',
    '测试渲染器',
    '这是一个测试渲染器，用于测试渲染器的功能',
);

const testElement = createBlockElementInfo(
    '测试',
    'TEST',
    '这是一个测试元素，用于测试渲染器的功能',
    'TEST_COMMAND_NAME',
    () => {
        return (
            <div>
                <h1>这是一个测试元素</h1>
                <p>这是一个测试元素，用于测试渲染器的功能</p>
            </div>
        )
    }
);

testRenderer.elements[testElement.key] = testElement;


const TaixueDocFilePage: React.FC = () => {
    const [userText, setUserText] = useLocalStorage(
        'txdPlaygroundUserText',
        "TAIXUE DOC FILE\n\n\n\n$HEAD\n  $VAR1=114514\n  $var2=1919810\n$END\n\n$PARA\n  This is a example paragraph\n  with some example text...\n$END\n\n"
    );
    const [my_json_object, setMyJsonObject] = useState({});
    const [error, setError] = useState<string | undefined>(undefined);
    // 新增状态
    const [showObjectView, setShowObjectView] = useState(true);

    useEffect(() => {
        if (userText) {
            try {
                const txdDocument: TxdDocument = parseTxdDocument(userText);
                setMyJsonObject(txdDocument);
                setError(undefined);
            } catch (error) {
                console.error(error);
                setError((error as Error).message)
            }
        }
    }, [userText]);

    return (
        <div className="min-h-screen p-4 sm:p-6">
            <main className="">
                <div className="">
                    <h1 className="text-center text-5xl font-bold sm:text-6xl">
                        Taixue Doc File Playground.
                    </h1>
                    <p className="text-center text-lg m-6">
                        See
                        <code className="font-mono text-[#16a34a]">
                            <Link href="../engine/renderers">
                                /engine/renderers
                            </Link>
                        </code>
                        to see the Documents of renderers.
                    </p>
                </div>
                {/* // 在左侧添加一个monaco编辑器，在右侧添加一个json展示 */}
                {/* 左右两栏布局，至少撑满页面宽度和高度 */}
                {/* 左侧是monaco编辑器，右侧是json展示 */}
                {/* 左侧和右侧的宽度都是50% */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-screen">
                    <div className="flex flex-col gap-4 h-full border rounded-md p-4">
                        <h2 className="text-center text-3xl font-bold">
                            Taixue Doc File Editor
                        </h2>
                        <Editor
                            height="100%"
                            width="100%"
                            language="txd"
                            theme="vs-dark"
                            value={userText}
                            onChange={(newValue) => {
                                setUserText(newValue ?? '');
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-4 h-full border rounded-md p-4">
                        {/* 新增切换按钮 */}
                        <div className="flex justify-center gap-4">
                            <button
                                className={`border rounded-md p-2 ${showObjectView ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => setShowObjectView(true)}
                            >
                                Show TaixueDocFileView
                            </button>
                            <button
                                className={`border rounded-md p-2 ${!showObjectView ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => setShowObjectView(false)}
                            >
                                Show Object View
                            </button>
                        </div>
                        {!showObjectView && (
                            error ?
                                <div className="flex flex-col gap-4 h-full">
                                    <h3 className="text-center text-2xl font-bold">
                                        Error
                                    </h3>
                                    <p className="text-center text-lg">
                                        {error}
                                    </p>
                                </div> :
                                <ObjectView
                                    data={my_json_object}
                                />
                        )}
                        {showObjectView && (
                            <TaixueDocFileView
                                document={userText ?? ''}
                                renderers={[
                                    GoldenbergRenderer,
                                    testRenderer
                                ]}
                            />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TaixueDocFilePage;

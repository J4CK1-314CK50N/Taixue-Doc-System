import Link from 'next/link';
import React from 'react';

const RendererDocsEntry: React.FC = () => {
    // 假设这里有一个渲染器列表，每个渲染器有名称和对应的路由
    const renderers = [
        { name: 'GoldenBerg', route: './renderers/goldenberg' },
        { name: '永乐大典（文件夹都没新建）', route: './renderers/yongle' },
    ];

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 space-y-8 hover:shadow-xl transition-shadow duration-300">
                <h1 className="text-4xl font-bold text-center text-blue-600">渲染器文档入口</h1>
                <p className="text-lg text-gray-700">
                    欢迎来到渲染器文档页面！这里提供了关于各个渲染器的详细文档，帮助你了解如何使用它们。
                    每个渲染器都有其独特的功能和使用方法，通过下面的链接可以访问相应的文档。
                </p>
                <div className="space-y-4">
                    {renderers.map((renderer, index) => (
                        <Link
                            key={index}
                            href={renderer.route}
                            className="block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-center transition-colors duration-300"
                        >
                            {renderer.name} 文档
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RendererDocsEntry;
import { Renderer } from "../lib/framework/renderer";
import React from "react";

const RendererDoc: React.FC<{
    renderers: Renderer;
}> = ({
    renderers,
}) => {
    return (
        <div className="p-8 bg-white shadow-md rounded-md space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">渲染器文档</h1>
            <p className="text-gray-600">这是一个渲染器文档，用于展示渲染器的功能</p>
            <h2 className="text-2xl font-bold text-gray-800">渲染器基本信息</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border border-gray-300">名称</th>
                        <th className="p-2 border border-gray-300">标识符</th>
                        <th className="p-2 border border-gray-300">描述</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-2 border border-gray-300">{renderers.name}</td>
                        <td className="p-2 border border-gray-300">{renderers.identifier}</td>
                        <td className="p-2 border border-gray-300">{renderers.description}</td>
                    </tr>
                </tbody>
            </table>
            <h2 className="text-2xl font-bold text-gray-800">渲染器元素</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border border-gray-300">名称</th>
                        <th className="p-2 border border-gray-300">标识符</th>
                        <th className="p-2 border border-gray-300">标识符覆盖变量名</th>
                        <th className="p-2 border border-gray-300">描述</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(renderers.elements).map((key) => {
                            const element = renderers.elements[key];
                            return (
                                <tr key={key}>
                                    <td className="p-2 border border-gray-300">{element.name}</td>
                                    <td className="p-2 border border-gray-300">{element.key}</td>
                                    <td className="p-2 border border-gray-300">{element.overrideKey}</td>
                                    <td className="p-2 border border-gray-300">{element.description}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default RendererDoc;
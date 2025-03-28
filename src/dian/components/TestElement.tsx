import { BlockElementInfo, createBlockElementInfo, Renderer } from "../lib/framework/renderer"

export function createTestElementInfo(name: string): BlockElementInfo {
    return createBlockElementInfo(
        '测试',
        'TEST',
        '这是一个测试元素，用于测试渲染器的功能',
        'TEST_COMMAND_NAME',
        () => {
            return (
                <div>
                    <p> 这是一个测试元素，用于测试渲染器的功能，他由 {name} 渲染器渲染。 </p>
                </div>
            )
        }
    );
}

export function createRendererTestElementInfo(renderer: Renderer): BlockElementInfo {
    return createBlockElementInfo(
        '测试',
        'TEST_' + renderer.identifier,
        '这是一个测试元素，用于测试渲染器的功能',
        'TEST_' + renderer.identifier + '_COMMAND_NAME',
        () => {
            return (
                <div>
                    <p> 如果你看到这个，那么说明 {renderer.name} 渲染器已经成功开始渲染。 </p>
                </div>
            )
        }
    );
}
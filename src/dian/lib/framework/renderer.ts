import { createRendererTestElementInfo, createTestElementInfo } from "@/dian/components/TestElement";
import { BlockElement } from "@/dian/types/TxdDocumentTypes";
import { JSX } from "react";

export interface BlockElementProps {
    data: BlockElement;
}

export interface BlockElementInfo {
    name: string;
    key: string;
    description: string | JSX.Element;
    overrideKey: string;
    // 参数类型为 BlockElementProps 的JSX元素
    content: (props: BlockElementProps) => JSX.Element | JSX.Element[];
}

export interface Renderer {
    identifier: string;
    name: string;
    description: string;
    elements: Record<string, BlockElementInfo>;
}

const RENDERER_MAP: Map<string, Renderer> = new Map();

export function createBlockElementInfo(
    name: string,
    key: string,
    description: string | JSX.Element,
    overrideKey: string,
    content: (props: BlockElementProps) => JSX.Element | JSX.Element[],
): BlockElementInfo {
    return {
        name,
        key,
        description,
        overrideKey,
        content
    }
}

export function createRenderer(
    identifier: string,
    name: string,
    description: string,
): Renderer {
    const result = {
        identifier,
        name,
        description,
        elements: {}
    };
    addElementToRenderer(result, createTestElementInfo(name));
    addElementToRenderer(result, createRendererTestElementInfo(result));
    return result;
}

export function addElementToRenderer(
    renderer: Renderer,
    element: BlockElementInfo
) {
    renderer.elements[element.key] = element;
};

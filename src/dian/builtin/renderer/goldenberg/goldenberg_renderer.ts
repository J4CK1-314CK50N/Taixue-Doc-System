import { addElementToRenderer, createRenderer } from "@/dian/lib/framework/renderer";
import { GoldenbergParagraphElement } from "./blocks/paragraph";
import { GoldenbergHeaderElement } from "./blocks/title";
import { GoldenbergImageElement } from "./blocks/image";

const GoldenbergRenderer = createRenderer(
    "GOLDENBERG",
    "goldenberg",
    "哥德堡渲染器，是内置的一种普通的横向排版、段落垂直布局的渲染器，适合用于普通的文档排版",
);

addElementToRenderer(GoldenbergRenderer, GoldenbergParagraphElement);
addElementToRenderer(GoldenbergRenderer, GoldenbergHeaderElement);
addElementToRenderer(GoldenbergRenderer, GoldenbergImageElement);

export default GoldenbergRenderer;

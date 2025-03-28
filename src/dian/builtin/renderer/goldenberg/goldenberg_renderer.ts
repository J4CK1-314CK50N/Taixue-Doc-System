import { addElementToRenderer, createRenderer } from "@/dian/lib/framework/renderer";
import { GoldenbergParagraphElement } from "./blocks/paragraph";
import { GoldenbergHeaderElement } from "./blocks/title";
import { GoldenbergImageElement } from "./blocks/image";

const GoldenbergRenderer = createRenderer(
    "GOLDENBERG",
    "goldenberg",
    "哥德堡编辑器",
);

addElementToRenderer(GoldenbergRenderer, GoldenbergParagraphElement);
addElementToRenderer(GoldenbergRenderer, GoldenbergHeaderElement);
addElementToRenderer(GoldenbergRenderer, GoldenbergImageElement);

export default GoldenbergRenderer;

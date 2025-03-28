export enum DianTypeEnum {
    // 普通文字
    Normal = 'normal',
    // 双行宽文字
    Double = 'double',
}

export enum DianDecoratorEnum {
    Emphesis = 'emphasis',
    Small = 'small',
    Large = 'large',
    Bold = 'bold',
    Thin = 'thin',
}

export interface DianType {
    type: DianTypeEnum,
    value?: string,
    decorators?: DianDecoratorEnum[]
}

export interface Normal extends DianType {
    type: DianTypeEnum.Normal,
    value: string
}


export interface Double extends DianType {
    type: DianTypeEnum.Double,
    value: string,
}

export class DianParagraph {
    nodes: (DianType)[] = [];
    indent?: number = 0;
    currentNode: DianType | null = null;

    constructor(nodes: (DianType)[] = [], indent?: number) {
        this.nodes = nodes;
        this.indent = indent;
    }

    static init(): DianParagraph {
        return new DianParagraph();
    }

    node(nodeType: DianTypeEnum): DianParagraph {
        const node = {
            type: nodeType,
        }
        this.nodes.push(node);
        this.currentNode = node;
        return this;
    }

    type(nodeType: DianTypeEnum): DianParagraph {
        if (this.currentNode) {
            this.currentNode.type = nodeType;
        }
        return this;
    }

    content(value:  string): DianParagraph {
        if (this.currentNode) {
            this.currentNode.value = value;
        }
        return this;
    }

    deco(decorator: DianDecoratorEnum): DianParagraph {
        if (this.currentNode) {
            if (!this.currentNode.decorators) {
                this.currentNode.decorators = [];
            }
            this.currentNode.decorators.push(decorator);
        }
        return this;
    }
}

export type DianBlock = DianParagraph[];

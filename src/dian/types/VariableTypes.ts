export interface VariableNode {
    name: string;
    description?: string;
}

export interface StaticVariableNode extends VariableNode {
    getValue(): string;
}
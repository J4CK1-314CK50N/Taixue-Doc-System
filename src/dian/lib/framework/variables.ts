import dayjs from "dayjs";
import { StaticVariableNode, VariableNode } from "../../types/VariableTypes";
import { Author, TxdDocumentVersion } from "../constants/constants";

const VARIABLE_DEF_MAP = new Map<string, StaticVariableNode>();

const DYNAMIC_VARIABLE_DEF_MAP = new Map<string, VariableNode>();

export function registerStaticVariable(config: StaticVariableNode): void {
    VARIABLE_DEF_MAP.set(config.name, config);
}


/**
 * 获取静态变量, 静态变量不会随着文档的变化而变化
 * @returns 静态变量
 */
export function getStaticVariables(): Map<string, string> {
    const result = new Map<string, string>();
    VARIABLE_DEF_MAP.forEach((value, key) => {
        result.set(key, value.getValue());
    });
    return result;
}

/**
 * 获取变量列表
 * @param dynamicVariables 动态变量，会覆盖静态变量
 * @returns 变量列表
 */
export function getVariables(dynamicVariables: Map<string, string>): Map<string, string> {
    const result = new Map<string, string>();
    VARIABLE_DEF_MAP.forEach((value, key) => {
        result.set(key, value.getValue());
    });
    dynamicVariables.forEach((value, key) => {
        result.set(key, value);
    });
    return result;
}

/**
 * 获取静态变量定义
 * @returns 静态变量定义
 */
export function getStaticVariableDefinition(): Map<string, StaticVariableNode> {
    return VARIABLE_DEF_MAP;
}

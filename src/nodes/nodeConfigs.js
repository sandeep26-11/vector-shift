// nodeConfigs.js
// Configuration objects for all node types

import { Position } from 'reactflow';
import { HANDLE_CONFIGS } from './NodeFactory';

export const INPUT_NODE_CONFIG = {
    title: 'Input',
    nodeType: 'customInput',
    handles: [HANDLE_CONFIGS.INPUT_RIGHT],
    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            dataKey: 'inputName',
            defaultValue: 'input_'
        },
        {
            name: 'type',
            label: 'Type',
            type: 'select',
            dataKey: 'inputType',
            defaultValue: 'Text',
            options: [
                { value: 'Text', label: 'Text' },
                { value: 'File', label: 'File' }
            ]
        }
    ]
};

export const OUTPUT_NODE_CONFIG = {
    title: 'Output',
    nodeType: 'customOutput',
    handles: [HANDLE_CONFIGS.OUTPUT_LEFT],
    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            dataKey: 'outputName',
            defaultValue: 'output_'
        },
        {
            name: 'type',
            label: 'Type',
            type: 'select',
            dataKey: 'outputType',
            defaultValue: 'Text',
            options: [
                { value: 'Text', label: 'Text' },
                { value: 'Image', label: 'Image' }
            ]
        }
    ]
};

export const LLM_NODE_CONFIG = {
    title: 'LLM',
    nodeType: 'llm',
    description: 'This is a LLM.',
    handles: [
        ...HANDLE_CONFIGS.LLM_INPUTS,
        HANDLE_CONFIGS.LLM_OUTPUT
    ]
};

export const TEXT_NODE_CONFIG = {
    title: 'Text',
    nodeType: 'text',
    handles: [HANDLE_CONFIGS.INPUT_RIGHT],
    fields: [
        {
            name: 'text',
            label: 'Text',
            type: 'text',
            dataKey: 'text',
            defaultValue: '{{input}}',
            placeholder: 'Enter text...'
        }
    ]
};

// New node configurations
export const MATH_NODE_CONFIG = {
    title: 'Math',
    nodeType: 'math',
    description: 'Perform mathematical operations',
    handles: [
        {
            type: 'target',
            position: Position.Left,
            id: 'a',
            style: { top: '25%' }
        },
        {
            type: 'target',
            position: Position.Left,
            id: 'b',
            style: { top: '75%' }
        },
        HANDLE_CONFIGS.INPUT_RIGHT
    ],
    fields: [
        {
            name: 'operation',
            label: 'Operation',
            type: 'select',
            defaultValue: 'add',
            options: [
                { value: 'add', label: 'Add (+)' },
                { value: 'subtract', label: 'Subtract (-)' },
                { value: 'multiply', label: 'Multiply (×)' },
                { value: 'divide', label: 'Divide (÷)' }
            ]
        }
    ]
};

export const FILTER_NODE_CONFIG = {
    title: 'Filter',
    nodeType: 'filter',
    description: 'Filter data based on conditions',
    handles: [
        HANDLE_CONFIGS.OUTPUT_LEFT,
        {
            type: 'source',
            position: Position.Right,
            id: 'passed',
            style: { top: '33%' }
        },
        {
            type: 'source',
            position: Position.Right,
            id: 'failed',
            style: { top: '66%' }
        }
    ],
    fields: [
        {
            name: 'condition',
            label: 'Condition',
            type: 'select',
            defaultValue: 'contains',
            options: [
                { value: 'contains', label: 'Contains' },
                { value: 'equals', label: 'Equals' },
                { value: 'greater', label: 'Greater than' },
                { value: 'less', label: 'Less than' }
            ]
        },
        {
            name: 'value',
            label: 'Value',
            type: 'text',
            placeholder: 'Comparison value'
        }
    ]
};

export const TRANSFORM_NODE_CONFIG = {
    title: 'Transform',
    nodeType: 'transform',
    description: 'Transform text data',
    handles: [
        HANDLE_CONFIGS.OUTPUT_LEFT,
        HANDLE_CONFIGS.INPUT_RIGHT
    ],
    fields: [
        {
            name: 'transformation',
            label: 'Transform',
            type: 'select',
            defaultValue: 'uppercase',
            options: [
                { value: 'uppercase', label: 'UPPERCASE' },
                { value: 'lowercase', label: 'lowercase' },
                { value: 'capitalize', label: 'Capitalize' },
                { value: 'reverse', label: 'Reverse' },
                { value: 'trim', label: 'Trim whitespace' }
            ]
        }
    ]
};

export const DELAY_NODE_CONFIG = {
    title: 'Delay',
    nodeType: 'delay',
    description: 'Add time delay to processing',
    handles: [
        HANDLE_CONFIGS.OUTPUT_LEFT,
        HANDLE_CONFIGS.INPUT_RIGHT
    ],
    fields: [
        {
            name: 'duration',
            label: 'Duration (ms)',
            type: 'text',
            defaultValue: '1000',
            placeholder: 'Milliseconds'
        }
    ],
    style: {
        backgroundColor: '#fff3cd',
        borderColor: '#ffc107'
    }
};

export const VALIDATOR_NODE_CONFIG = {
    title: 'Validator',
    nodeType: 'validator',
    description: 'Validate input data',
    handles: [
        HANDLE_CONFIGS.OUTPUT_LEFT,
        {
            type: 'source',
            position: Position.Right,
            id: 'valid',
            style: { top: '33%' }
        },
        {
            type: 'source',
            position: Position.Right,
            id: 'invalid',
            style: { top: '66%' }
        }
    ],
    fields: [
        {
            name: 'validationType',
            label: 'Validation',
            type: 'select',
            defaultValue: 'email',
            options: [
                { value: 'email', label: 'Email' },
                { value: 'url', label: 'URL' },
                { value: 'number', label: 'Number' },
                { value: 'json', label: 'JSON' },
                { value: 'regex', label: 'Regex Pattern' }
            ]
        },
        {
            name: 'pattern',
            label: 'Pattern',
            type: 'text',
            placeholder: 'For regex validation'
        }
    ],
    style: {
        backgroundColor: '#d1ecf1',
        borderColor: '#17a2b8'
    }
};
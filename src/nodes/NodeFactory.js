// NodeFactory.js
// Factory for creating nodes with common patterns

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import {
    FieldContainer,
    FieldLabel,
    FieldInput,
    FieldSelect
} from '../components/NodeStyles';

// Common input field component
export const InputField = ({
    label,
    type = 'text',
    value,
    onChange,
    options = [],
    placeholder = ''
}) => {
    if (type === 'select') {
        return (
            <FieldContainer>
                <FieldLabel>{label}:</FieldLabel>
                <FieldSelect value={value} onChange={onChange}>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </FieldSelect>
            </FieldContainer>
        );
    }

    return (
        <FieldContainer>
            <FieldLabel>{label}:</FieldLabel>
            <FieldInput
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </FieldContainer>
    );
};

// Factory function to create nodes with configuration
export const createNode = (nodeConfig) => {
    return ({ id, data }) => {
        // Initialize state based on configuration
        const [state, setState] = useState(() => {
            const initialState = {};
            if (nodeConfig.fields) {
                nodeConfig.fields.forEach(field => {
                    const dataKey = field.dataKey || field.name;
                    initialState[field.name] = data?.[dataKey] || field.defaultValue || '';
                });
            }
            return initialState;
        });

        // Handle field changes
        const handleFieldChange = (fieldName) => (e) => {
            setState(prev => ({
                ...prev,
                [fieldName]: e.target.value
            }));
        };

        // Render fields based on configuration
        const renderFields = () => {
            if (!nodeConfig.fields) return null;

            return nodeConfig.fields.map(field => (
                <InputField
                    key={field.name}
                    label={field.label}
                    type={field.type}
                    value={state[field.name]}
                    onChange={handleFieldChange(field.name)}
                    options={field.options}
                    placeholder={field.placeholder}
                />
            ));
        };

        // Determine node type from config or id
        const nodeType = nodeConfig.nodeType || id.split('-')[0] || 'default';

        return (
            <BaseNode
                id={id}
                data={data}
                config={nodeConfig}
                nodeType={nodeType}
            >
                {renderFields()}
                {nodeConfig.customContent && nodeConfig.customContent(state, setState)}
            </BaseNode>
        );
    };
};

// Predefined handle configurations
export const HANDLE_CONFIGS = {
    INPUT_RIGHT: {
        type: 'source',
        position: Position.Right,
        id: 'output'
    },
    OUTPUT_LEFT: {
        type: 'target',
        position: Position.Left,
        id: 'input'
    },
    LLM_INPUTS: [
        {
            type: 'target',
            position: Position.Left,
            id: 'system',
            style: { top: '33%' }
        },
        {
            type: 'target',
            position: Position.Left,
            id: 'prompt',
            style: { top: '66%' }
        }
    ],
    LLM_OUTPUT: {
        type: 'source',
        position: Position.Right,
        id: 'response'
    }
};
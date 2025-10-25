// BaseNode.js
// Abstract base component for all node types

import { Handle } from 'reactflow';
import {
    NodeContainer,
    NodeHeader,
    NodeIcon,
    NodeTitle,
    NodeDescription,
    NodeContent,
    getNodeTypeStyles
} from '../components/NodeStyles';

export const BaseNode = ({
    id,
    data,
    config = {},
    children,
    nodeType = 'default',
    selected = false
}) => {
    const typeStyles = getNodeTypeStyles(nodeType);

    // Render handles based on configuration
    const renderHandles = () => {
        const handles = [];

        if (config.handles) {
            config.handles.forEach((handle, index) => {
                handles.push(
                    <Handle
                        key={`${handle.type}-${handle.id || index}`}
                        type={handle.type}
                        position={handle.position}
                        id={handle.id || `${id}-${handle.type}-${index}`}
                        style={{
                            background: typeStyles.handleColor,
                            border: '2px solid white',
                            width: '12px',
                            height: '12px',
                            ...handle.style
                        }}
                    />
                );
            });
        }

        return handles;
    };

    // Get node icon based on type
    const getNodeIcon = () => {
        const icons = {
            customInput: '📥',
            llm: '🤖',
            customOutput: '📤',
            text: '📝',
            math: '🔢',
            filter: '🔍',
            transform: '🔄',
            delay: '⏱️',
            validator: '✅',
        };
        return icons[nodeType] || '⚙️';
    };

    return (
        <NodeContainer
            borderColor={typeStyles.borderColor}
            className={selected ? 'selected' : ''}
        >
            {renderHandles()}

            <NodeHeader>
                <NodeIcon color={typeStyles.iconColor}>
                    {getNodeIcon()}
                </NodeIcon>
                <NodeTitle>{config.title}</NodeTitle>
            </NodeHeader>

            {config.description && (
                <NodeDescription>
                    {config.description}
                </NodeDescription>
            )}

            <NodeContent>
                {children}
            </NodeContent>
        </NodeContainer>
    );
};
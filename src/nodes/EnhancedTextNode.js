// EnhancedTextNode.js
// Enhanced Text node with dynamic resizing and variable detection

import { useState, useEffect, useRef, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import {
    NodeContainer,
    NodeHeader,
    NodeIcon,
    NodeTitle,
    NodeContent,
    FieldContainer,
    FieldLabel,
    getNodeTypeStyles
} from '../components/NodeStyles';
import styled from 'styled-components';
import { theme } from '../theme';
import {
    extractVariables,
    calculateNodeDimensions,
    validateVariableSyntax
} from '../utils/textNodeUtils';

// Styled textarea that grows with content
const DynamicTextArea = styled.textarea`
  width: 100%;
  min-height: 60px;
  max-height: 300px;
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.sm};
  font-family: ${theme.typography.fontFamily.mono.join(', ')};
  background: white;
  transition: all ${theme.transitions.fast};
  resize: none;
  overflow-y: auto;
  line-height: 1.4;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
    box-shadow: 0 0 0 2px ${theme.colors.primary[100]};
  }
  
  &::placeholder {
    color: ${theme.colors.gray[400]};
    font-family: ${theme.typography.fontFamily.sans.join(', ')};
  }
`;

// Container for variable handles
const VariableHandleContainer = styled.div`
  position: absolute;
  left: -6px;
  top: ${props => props.top}px;
  display: flex;
  align-items: center;
`;

const VariableLabel = styled.div`
  background: ${theme.colors.primary[500]};
  color: white;
  padding: 2px 6px;
  border-radius: ${theme.borderRadius.sm};
  font-size: 10px;
  font-weight: ${theme.typography.fontWeight.medium};
  margin-right: 4px;
  white-space: nowrap;
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.primary[600]};
`;

// Validation message
const ValidationMessage = styled.div`
  font-size: 11px;
  color: ${props => props.isError ? theme.colors.error[500] : theme.colors.success[500]};
  margin-top: 4px;
  padding: 4px 8px;
  background: ${props => props.isError ? theme.colors.error[50] : theme.colors.success[50]};
  border-radius: ${theme.borderRadius.sm};
  border: 1px solid ${props => props.isError ? theme.colors.error[200] : theme.colors.success[200]};
`;

// Character counter
const CharacterCounter = styled.div`
  font-size: 10px;
  color: ${theme.colors.gray[500]};
  text-align: right;
  margin-top: 4px;
`;

export const EnhancedTextNode = ({ id, data, selected = false }) => {
    const [text, setText] = useState(data?.text || '{{input}}');
    const [variables, setVariables] = useState([]);
    const [nodeDimensions, setNodeDimensions] = useState({ width: 250, height: 120 });
    const [cursorPosition, setCursorPosition] = useState(0);
    const [validationResult, setValidationResult] = useState(null);
    const textareaRef = useRef(null);
    const typeStyles = getNodeTypeStyles('text');

    // Auto-resize textarea and node based on content
    const adjustDimensions = useCallback(() => {
        if (textareaRef.current) {
            // Reset height to calculate scroll height
            textareaRef.current.style.height = 'auto';
            const scrollHeight = textareaRef.current.scrollHeight;
            const newTextareaHeight = Math.min(Math.max(scrollHeight, 60), 300);
            textareaRef.current.style.height = `${newTextareaHeight}px`;

            // Calculate optimal node dimensions
            const dimensions = calculateNodeDimensions(text, variables.length);
            setNodeDimensions(dimensions);
        }
    }, [text, variables.length]);

    // Handle text changes with real-time validation
    const handleTextChange = (e) => {
        const newText = e.target.value;
        const newCursorPosition = e.target.selectionStart;

        setText(newText);
        setCursorPosition(newCursorPosition);

        // Extract and update variables
        const newVariables = extractVariables(newText);
        setVariables(newVariables);

        // Validate current typing
        const validation = validateVariableSyntax(newText, newCursorPosition);
        setValidationResult(validation);

        // Adjust dimensions
        setTimeout(adjustDimensions, 0);
    };

    // Handle cursor position changes
    const handleCursorChange = (e) => {
        const newCursorPosition = e.target.selectionStart;
        setCursorPosition(newCursorPosition);

        const validation = validateVariableSyntax(text, newCursorPosition);
        setValidationResult(validation);
    };

    // Initialize on mount
    useEffect(() => {
        const initialVariables = extractVariables(text);
        setVariables(initialVariables);
        setTimeout(adjustDimensions, 0);
    }, [text, adjustDimensions]);

    // Calculate handle positions for variables with better spacing
    const getVariableHandlePosition = (index) => {
        const headerHeight = 50;
        const spacing = 28;
        const startOffset = 10;
        return headerHeight + startOffset + (index * spacing);
    };

    // Get placeholder text with examples
    const getPlaceholderText = () => {
        return "Enter text with variables like {{input}} or {{userName}}...\n\nExamples:\n• Hello {{name}}!\n• Processing {{data}} with {{method}}\n• User {{id}} has {{count}} messages";
    };

    return (
        <NodeContainer
            borderColor={typeStyles.borderColor}
            className={selected ? 'selected' : ''}
            style={{
                width: `${nodeDimensions.width}px`,
                minHeight: `${nodeDimensions.height}px`,
                position: 'relative',
                transition: 'all 0.2s ease-in-out'
            }}
        >
            {/* Variable handles */}
            {variables.map((variable, index) => (
                <VariableHandleContainer
                    key={variable}
                    top={getVariableHandlePosition(index)}
                >
                    <VariableLabel>{variable}</VariableLabel>
                    <Handle
                        type="target"
                        position={Position.Left}
                        id={`${id}-${variable}`}
                        style={{
                            background: typeStyles.handleColor,
                            border: '2px solid white',
                            width: '12px',
                            height: '12px',
                            position: 'relative',
                            left: 0,
                            boxShadow: theme.shadows.sm
                        }}
                    />
                </VariableHandleContainer>
            ))}

            {/* Output handle */}
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                style={{
                    background: typeStyles.handleColor,
                    border: '2px solid white',
                    width: '12px',
                    height: '12px',
                    boxShadow: theme.shadows.sm
                }}
            />

            <NodeHeader>
                <NodeIcon color={typeStyles.iconColor}>
                    📝
                </NodeIcon>
                <NodeTitle>Text</NodeTitle>
                {variables.length > 0 && (
                    <div style={{
                        marginLeft: 'auto',
                        fontSize: '10px',
                        background: theme.colors.primary[100],
                        color: theme.colors.primary[700],
                        padding: '2px 6px',
                        borderRadius: theme.borderRadius.sm,
                        fontWeight: theme.typography.fontWeight.medium
                    }}>
                        {variables.length} var{variables.length !== 1 ? 's' : ''}
                    </div>
                )}
            </NodeHeader>

            <NodeContent>
                <FieldContainer>
                    <FieldLabel>Text Content:</FieldLabel>
                    <DynamicTextArea
                        ref={textareaRef}
                        value={text}
                        onChange={handleTextChange}
                        onSelect={handleCursorChange}
                        onKeyUp={handleCursorChange}
                        onClick={handleCursorChange}
                        placeholder={getPlaceholderText()}
                    />

                    <CharacterCounter>
                        {text.length} characters
                    </CharacterCounter>

                    {/* Real-time validation feedback */}
                    {validationResult && validationResult.isInsideVariable && (
                        <ValidationMessage isError={!validationResult.isValid}>
                            {validationResult.isValid
                                ? `Typing variable: ${validationResult.currentVariable || '...'}`
                                : validationResult.suggestion
                            }
                        </ValidationMessage>
                    )}
                </FieldContainer>

                {variables.length > 0 && (
                    <FieldContainer style={{ marginTop: theme.spacing.sm }}>
                        <FieldLabel>Variables ({variables.length}):</FieldLabel>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: theme.spacing.xs,
                            marginTop: theme.spacing.xs
                        }}>
                            {variables.map((variable, index) => (
                                <span
                                    key={variable}
                                    style={{
                                        background: theme.colors.primary[100],
                                        color: theme.colors.primary[700],
                                        padding: '3px 8px',
                                        borderRadius: theme.borderRadius.sm,
                                        fontSize: '11px',
                                        fontWeight: theme.typography.fontWeight.medium,
                                        border: `1px solid ${theme.colors.primary[200]}`,
                                        fontFamily: theme.typography.fontFamily.mono.join(', ')
                                    }}
                                >
                                    {variable}
                                </span>
                            ))}
                        </div>
                    </FieldContainer>
                )}
            </NodeContent>
        </NodeContainer>
    );
};
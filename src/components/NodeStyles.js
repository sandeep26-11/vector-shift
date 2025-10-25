// components/NodeStyles.js
// Styled components for ReactFlow nodes

import styled from 'styled-components';
import { theme } from '../theme';

export const NodeContainer = styled.div`
  background: white;
  border: 2px solid ${props => props.borderColor || theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.md};
  min-width: 200px;
  min-height: 80px;
  position: relative;
  transition: all ${theme.transitions.normal};
  
  &:hover {
    box-shadow: ${theme.shadows.lg};
    transform: translateY(-1px);
  }
  
  &.selected {
    border-color: ${theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${theme.colors.primary[100]};
  }
`;

export const NodeHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.sm};
  padding-bottom: ${theme.spacing.sm};
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

export const NodeIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: ${theme.borderRadius.sm};
  background: ${props => props.color || theme.colors.gray[400]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.sm};
  color: white;
  font-size: 12px;
  font-weight: ${theme.typography.fontWeight.bold};
`;

export const NodeTitle = styled.div`
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.gray[800]};
  flex: 1;
`;

export const NodeDescription = styled.div`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.gray[500]};
  margin-bottom: ${theme.spacing.sm};
  line-height: 1.4;
`;

export const NodeContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

export const FieldLabel = styled.label`
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.gray[700]};
  display: block;
`;

export const FieldInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.xs};
  background: white;
  transition: all ${theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
    box-shadow: 0 0 0 2px ${theme.colors.primary[100]};
  }
  
  &::placeholder {
    color: ${theme.colors.gray[400]};
  }
`;

export const FieldSelect = styled.select`
  width: 100%;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.xs};
  background: white;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
    box-shadow: 0 0 0 2px ${theme.colors.primary[100]};
  }
`;

// Custom handle styles
export const StyledHandle = styled.div`
  width: 12px;
  height: 12px;
  background: ${props => props.color || theme.colors.gray[400]};
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: ${theme.shadows.sm};
  transition: all ${theme.transitions.fast};
  
  &:hover {
    transform: scale(1.2);
    box-shadow: ${theme.shadows.md};
  }
  
  &.react-flow__handle-connecting {
    background: ${theme.colors.primary[500]};
    transform: scale(1.3);
  }
`;

// Node type specific styling
export const getNodeTypeStyles = (nodeType) => {
    const colors = theme.colors.nodeTypes;
    const baseColor = colors[nodeType] || theme.colors.gray[400];

    return {
        borderColor: baseColor,
        iconColor: baseColor,
        handleColor: baseColor,
    };
};
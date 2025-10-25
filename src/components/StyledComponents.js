// components/StyledComponents.js
// Styled components for the application

import styled from 'styled-components';
import { theme } from '../theme';

// Main application container
export const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${theme.colors.gray[50]} 0%, ${theme.colors.primary[50]} 100%);
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
`;

// Toolbar styling
export const ToolbarContainer = styled.div`
  background: white;
  border-bottom: 1px solid ${theme.colors.gray[200]};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  position: relative;
  z-index: 10;
`;

export const ToolbarTitle = styled.h1`
  margin: 0 0 ${theme.spacing.lg} 0;
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[800]};
  background: linear-gradient(135deg, ${theme.colors.primary[600]}, ${theme.colors.secondary[600]});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const NodeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${theme.spacing.md};
  max-width: 800px;
`;

// Draggable node button
export const DraggableNodeButton = styled.div`
  background: white;
  border: 2px solid ${props => theme.colors.nodeTypes[props.nodeType] || theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  cursor: grab;
  transition: all ${theme.transitions.normal};
  text-align: center;
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.gray[700]};
  box-shadow: ${theme.shadows.sm};
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
    border-color: ${props => theme.colors.nodeTypes[props.nodeType] || theme.colors.gray[400]};
  }
  
  &:active {
    cursor: grabbing;
    transform: translateY(0);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => theme.colors.nodeTypes[props.nodeType] || theme.colors.gray[300]};
  }
`;

export const NodeIcon = styled.div`
  width: 32px;
  height: 32px;
  margin: 0 auto ${theme.spacing.sm} auto;
  background: ${props => theme.colors.nodeTypes[props.nodeType] || theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
`;

// ReactFlow container
export const FlowContainer = styled.div`
  height: 70vh;
  background: ${theme.colors.gray[50]};
  border-radius: ${theme.borderRadius.lg};
  margin: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.lg};
  overflow: hidden;
  border: 1px solid ${theme.colors.gray[200]};
`;

// Submit button
export const SubmitContainer = styled.div`
  padding: ${theme.spacing.lg};
  display: flex;
  justify-content: center;
`;

export const SubmitButton = styled.button`
  background: linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.primary[600]});
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md} ${theme.spacing['2xl']};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  box-shadow: ${theme.shadows.md};
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.lg};
    background: linear-gradient(135deg, ${theme.colors.primary[600]}, ${theme.colors.primary[700]});
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
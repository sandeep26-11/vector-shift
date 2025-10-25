// components/PipelineAlert.js
// Alert component for displaying pipeline analysis results

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../theme';

// Animation for alert appearance
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Overlay backdrop
const AlertOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: ${fadeIn} 0.2s ease-out;
`;

// Alert container
const AlertContainer = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['2xl']};
  box-shadow: ${theme.shadows.xl};
  border: 1px solid ${theme.colors.gray[200]};
  max-width: 500px;
  width: 90%;
  animation: ${slideIn} 0.3s ease-out;
`;

// Alert header
const AlertHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg};
`;

const AlertTitle = styled.h2`
  margin: 0;
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[800]};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${theme.colors.gray[500]};
  padding: 4px;
  border-radius: ${theme.borderRadius.sm};
  transition: all ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.gray[100]};
    color: ${theme.colors.gray[700]};
  }
`;

// Alert content
const AlertContent = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const StatCard = styled.div`
  background: ${props => props.bgColor || theme.colors.gray[50]};
  border: 1px solid ${props => props.borderColor || theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${props => props.color || theme.colors.gray[800]};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.gray[600]};
  font-weight: ${theme.typography.fontWeight.medium};
`;

const DAGStatus = styled.div`
  background: ${props => props.isDAG ? theme.colors.success[50] : theme.colors.error[50]};
  border: 1px solid ${props => props.isDAG ? theme.colors.success[200] : theme.colors.error[200]};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  text-align: center;
`;

const DAGIcon = styled.div`
  font-size: 32px;
  margin-bottom: ${theme.spacing.sm};
`;

const DAGText = styled.div`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${props => props.isDAG ? theme.colors.success[700] : theme.colors.error[700]};
  margin-bottom: ${theme.spacing.xs};
`;

const DAGDescription = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${props => props.isDAG ? theme.colors.success[600] : theme.colors.error[600]};
  line-height: 1.4;
`;

const ErrorMessage = styled.div`
  background: ${theme.colors.error[50]};
  border: 1px solid ${theme.colors.error[200]};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  color: ${theme.colors.error[700]};
  text-align: center;
`;

const ActionButton = styled.button`
  background: ${theme.colors.primary[500]};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  width: 100%;
  
  &:hover {
    background: ${theme.colors.primary[600]};
  }
`;

export const PipelineAlert = ({ data, onClose }) => {
    // Handle click outside to close
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Handle escape key
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    // Add event listener for escape key
    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (data.error) {
        return (
            <AlertOverlay onClick={handleOverlayClick}>
                <AlertContainer>
                    <AlertHeader>
                        <AlertTitle>
                            ❌ Submission Error
                        </AlertTitle>
                        <CloseButton onClick={onClose}>×</CloseButton>
                    </AlertHeader>

                    <AlertContent>
                        <ErrorMessage>
                            {data.message}
                        </ErrorMessage>
                    </AlertContent>

                    <ActionButton onClick={onClose}>
                        Try Again
                    </ActionButton>
                </AlertContainer>
            </AlertOverlay>
        );
    }

    const { num_nodes, num_edges, is_dag } = data;

    return (
        <AlertOverlay onClick={handleOverlayClick}>
            <AlertContainer>
                <AlertHeader>
                    <AlertTitle>
                        📊 Pipeline Analysis Results
                    </AlertTitle>
                    <CloseButton onClick={onClose}>×</CloseButton>
                </AlertHeader>

                <AlertContent>
                    <StatGrid>
                        <StatCard
                            bgColor={theme.colors.primary[50]}
                            borderColor={theme.colors.primary[200]}
                        >
                            <StatValue color={theme.colors.primary[600]}>
                                {num_nodes}
                            </StatValue>
                            <StatLabel>Nodes</StatLabel>
                        </StatCard>

                        <StatCard
                            bgColor={theme.colors.secondary[50]}
                            borderColor={theme.colors.secondary[200]}
                        >
                            <StatValue color={theme.colors.secondary[600]}>
                                {num_edges}
                            </StatValue>
                            <StatLabel>Connections</StatLabel>
                        </StatCard>
                    </StatGrid>

                    <DAGStatus isDAG={is_dag}>
                        <DAGIcon>
                            {is_dag ? '✅' : '❌'}
                        </DAGIcon>
                        <DAGText isDAG={is_dag}>
                            {is_dag ? 'Valid DAG' : 'Not a DAG'}
                        </DAGText>
                        <DAGDescription isDAG={is_dag}>
                            {is_dag
                                ? 'Your pipeline forms a valid Directed Acyclic Graph. No circular dependencies detected.'
                                : 'Your pipeline contains circular dependencies or cycles. This may cause infinite loops during execution.'
                            }
                        </DAGDescription>
                    </DAGStatus>
                </AlertContent>

                <ActionButton onClick={onClose}>
                    Continue Editing
                </ActionButton>
            </AlertContainer>
        </AlertOverlay>
    );
};
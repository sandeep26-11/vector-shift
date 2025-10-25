// components/IntegrationDemo.js
// Demo component showcasing backend integration features

import styled from 'styled-components';
import { theme } from '../theme';

const DemoContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  background: white;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.xl};
  border: 1px solid ${theme.colors.gray[200]};
  max-width: 320px;
  z-index: 1000;
`;

const DemoTitle = styled.h3`
  margin: 0 0 ${theme.spacing.md} 0;
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.gray[800]};
`;

const DemoSection = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const DemoLabel = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.gray[600]};
  margin-bottom: ${theme.spacing.xs};
`;

const StepList = styled.ol`
  font-size: 12px;
  margin: 0;
  padding-left: 16px;
  
  li {
    margin-bottom: 4px;
    line-height: 1.4;
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 12px;
  color: ${theme.colors.gray[600]};
  margin-top: ${theme.spacing.sm};
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.color || theme.colors.gray[400]};
`;

const ExampleBox = styled.div`
  background: ${theme.colors.gray[50]};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.sm};
  font-size: 11px;
  font-family: ${theme.typography.fontFamily.mono.join(', ')};
  margin-top: ${theme.spacing.xs};
`;

export const IntegrationDemo = ({ show = false }) => {
    if (!show) return null;

    return (
        <DemoContainer>
            <DemoTitle>🔗 Backend Integration</DemoTitle>

            <DemoSection>
                <DemoLabel>How to Test</DemoLabel>
                <StepList>
                    <li>Start backend server on port 8000</li>
                    <li>Create nodes by dragging from toolbar</li>
                    <li>Connect nodes with edges</li>
                    <li>Click "🚀 Submit Pipeline" button</li>
                    <li>View analysis results in popup</li>
                </StepList>
            </DemoSection>

            <DemoSection>
                <DemoLabel>What Gets Analyzed</DemoLabel>
                <StepList>
                    <li><strong>Node Count:</strong> Total number of nodes</li>
                    <li><strong>Edge Count:</strong> Total number of connections</li>
                    <li><strong>DAG Check:</strong> Validates no circular dependencies</li>
                </StepList>
            </DemoSection>

            <DemoSection>
                <DemoLabel>Example Response</DemoLabel>
                <ExampleBox>
                    {`{
  "num_nodes": 4,
  "num_edges": 3,
  "is_dag": true
}`}
                </ExampleBox>
            </DemoSection>

            <DemoSection>
                <DemoLabel>Backend Status</DemoLabel>
                <StatusIndicator>
                    <StatusDot color={theme.colors.warning[500]} />
                    Requires backend server running
                </StatusIndicator>
                <StatusIndicator>
                    <StatusDot color={theme.colors.success[500]} />
                    CORS enabled for localhost:3000
                </StatusIndicator>
            </DemoSection>
        </DemoContainer>
    );
};
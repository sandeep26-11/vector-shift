// components/TextNodeDemo.js
// Demo component showcasing enhanced text node features

import styled from 'styled-components';
import { theme } from '../theme';

const DemoContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: white;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.xl};
  border: 1px solid ${theme.colors.gray[200]};
  max-width: 350px;
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

const ExampleCode = styled.code`
  background: ${theme.colors.gray[100]};
  padding: 2px 4px;
  border-radius: ${theme.borderRadius.sm};
  font-size: 11px;
  color: ${theme.colors.gray[700]};
`;

const FeatureList = styled.ul`
  font-size: 12px;
  margin: 0;
  padding-left: 16px;
  
  li {
    margin-bottom: 4px;
  }
`;

export const TextNodeDemo = ({ show = false }) => {
  if (!show) return null;

  return (
    <DemoContainer>
      <DemoTitle>📝 Enhanced Text Node</DemoTitle>

      <DemoSection>
        <DemoLabel>New Features</DemoLabel>
        <FeatureList>
          <li><strong>Dynamic Resizing:</strong> Node grows with content</li>
          <li><strong>Variable Detection:</strong> Auto-creates handles for variables</li>
          <li><strong>Better UX:</strong> Larger text area for visibility</li>
          <li><strong>Real-time Updates:</strong> Handles update as you type</li>
        </FeatureList>
      </DemoSection>

      <DemoSection>
        <DemoLabel>Variable Syntax</DemoLabel>
        <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
          Use double curly brackets around valid JavaScript variable names:
          <br />
          <ExampleCode>{"{{input}}"}</ExampleCode> <ExampleCode>{"{{data}}"}</ExampleCode> <ExampleCode>{"{{userName}}"}</ExampleCode>
        </div>
      </DemoSection>

      <DemoSection>
        <DemoLabel>Try It Out</DemoLabel>
        <div style={{ fontSize: '12px', color: theme.colors.gray[600] }}>
          1. Drag a Text node to the canvas<br />
          2. Type text with variables like <ExampleCode>{"Hello {{name}}!"}</ExampleCode><br />
          3. Watch handles appear automatically<br />
          4. Node resizes as you add more content<br />
          5. Get real-time validation feedback
        </div>
      </DemoSection>

      <DemoSection>
        <DemoLabel>Advanced Examples</DemoLabel>
        <div style={{ fontSize: '11px', color: theme.colors.gray[600], lineHeight: '1.3' }}>
          <ExampleCode>{"User {{firstName}} {{lastName}}"}</ExampleCode><br />
          <ExampleCode>{"Processing {{data}} with {{algorithm}}"}</ExampleCode><br />
          <ExampleCode>{"{{count}} items in {{category}}"}</ExampleCode>
        </div>
      </DemoSection>
    </DemoContainer>
  );
};
// components/StyleShowcase.js
// Component to showcase the design system

import styled from 'styled-components';
import { theme } from '../theme';

const ShowcaseContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.xl};
  border: 1px solid ${theme.colors.gray[200]};
  max-width: 300px;
  z-index: 1000;
`;

const ColorSwatch = styled.div`
  width: 20px;
  height: 20px;
  border-radius: ${theme.borderRadius.sm};
  background: ${props => props.color};
  border: 1px solid ${theme.colors.gray[300]};
  display: inline-block;
  margin-right: ${theme.spacing.sm};
`;

const ShowcaseTitle = styled.h3`
  margin: 0 0 ${theme.spacing.md} 0;
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.gray[800]};
`;

const ShowcaseSection = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const ShowcaseLabel = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.gray[600]};
  margin-bottom: ${theme.spacing.xs};
`;

export const StyleShowcase = ({ show = false }) => {
    if (!show) return null;

    return (
        <ShowcaseContainer>
            <ShowcaseTitle>Design System</ShowcaseTitle>

            <ShowcaseSection>
                <ShowcaseLabel>Node Colors</ShowcaseLabel>
                {Object.entries(theme.colors.nodeTypes).map(([type, color]) => (
                    <div key={type} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                        <ColorSwatch color={color} />
                        <span style={{ fontSize: '12px', textTransform: 'capitalize' }}>{type}</span>
                    </div>
                ))}
            </ShowcaseSection>

            <ShowcaseSection>
                <ShowcaseLabel>Features</ShowcaseLabel>
                <ul style={{ fontSize: '12px', margin: 0, paddingLeft: '16px' }}>
                    <li>Consistent color system</li>
                    <li>Responsive design</li>
                    <li>Smooth animations</li>
                    <li>Modern shadows & borders</li>
                    <li>Accessible typography</li>
                </ul>
            </ShowcaseSection>
        </ShowcaseContainer>
    );
};
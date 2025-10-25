// toolbar.js

import { DraggableNode } from './draggableNode';
import { ToolbarContainer, ToolbarTitle, NodeGrid } from './components/StyledComponents';

export const PipelineToolbar = () => {
    return (
        <ToolbarContainer>
            <ToolbarTitle>Node Pipeline Builder</ToolbarTitle>
            <NodeGrid>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='delay' label='Delay' />
                <DraggableNode type='validator' label='Validator' />
            </NodeGrid>
        </ToolbarContainer>
    );
};

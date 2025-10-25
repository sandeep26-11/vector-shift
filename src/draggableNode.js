// draggableNode.js

import { DraggableNodeButton, NodeIcon } from './components/StyledComponents';

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
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
    return icons[type] || '⚙️';
  };

  return (
    <DraggableNodeButton
      className={type}
      nodeType={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      <NodeIcon nodeType={type}>
        {getNodeIcon()}
      </NodeIcon>
      <span>{label}</span>
    </DraggableNodeButton>
  );
};

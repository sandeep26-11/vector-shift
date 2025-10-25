// llmNode.js

import { createNode } from './NodeFactory';
import { LLM_NODE_CONFIG } from './nodeConfigs';

export const LLMNode = createNode(LLM_NODE_CONFIG);

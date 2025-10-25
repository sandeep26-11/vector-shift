// submit.js

import { useState } from 'react';
import { SubmitContainer, SubmitButton as StyledSubmitButton } from './components/StyledComponents';
import { useStore } from './store';
import { PipelineAlert } from './components/PipelineAlert';

export const SubmitButton = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alertData, setAlertData] = useState(null);
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges
    }));

    const handleSubmit = async () => {
        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            // Prepare pipeline data
            const pipelineData = {
                nodes: nodes.map(node => ({
                    id: node.id,
                    type: node.type,
                    position: node.position,
                    data: node.data || {}
                })),
                edges: edges.map(edge => ({
                    id: edge.id,
                    source: edge.source,
                    target: edge.target,
                    sourceHandle: edge.sourceHandle || null,
                    targetHandle: edge.targetHandle || null
                }))
            };

            console.log('Submitting pipeline:', pipelineData);

            // Send to backend
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Backend response:', result);

            // Show alert with results
            setAlertData(result);

        } catch (error) {
            console.error('Error submitting pipeline:', error);

            // Show error alert
            setAlertData({
                error: true,
                message: `Failed to submit pipeline: ${error.message}`
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeAlert = () => {
        setAlertData(null);
    };

    return (
        <>
            <SubmitContainer>
                <StyledSubmitButton
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? '⏳ Submitting...' : '🚀 Submit Pipeline'}
                </StyledSubmitButton>
            </SubmitContainer>

            {alertData && (
                <PipelineAlert
                    data={alertData}
                    onClose={closeAlert}
                />
            )}
        </>
    );
};

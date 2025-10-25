// utils/textNodeUtils.js
// Utility functions for enhanced text node functionality

/**
 * Validates if a string is a valid JavaScript variable name
 * @param {string} name - The variable name to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidVariableName = (name) => {
    // JavaScript variable name rules:
    // - Must start with letter, underscore, or dollar sign
    // - Can contain letters, numbers, underscores, dollar signs
    // - Cannot be a reserved keyword
    const variableRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

    const reservedKeywords = [
        'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default',
        'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'function',
        'if', 'import', 'in', 'instanceof', 'let', 'new', 'return', 'super', 'switch',
        'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield'
    ];

    return variableRegex.test(name) && !reservedKeywords.includes(name);
};

/**
 * Extracts variables from text with validation
 * @param {string} text - The input text containing variables
 * @returns {Array} - Array of valid variable names
 */
export const extractVariables = (text) => {
    const variableRegex = /\{\{\s*([^}]+)\s*\}\}/g;
    const foundVariables = [];
    let match;

    while ((match = variableRegex.exec(text)) !== null) {
        const variableName = match[1].trim();

        // Only include valid variable names and avoid duplicates
        if (isValidVariableName(variableName) && !foundVariables.includes(variableName)) {
            foundVariables.push(variableName);
        }
    }

    return foundVariables;
};

/**
 * Highlights variables in text for preview
 * @param {string} text - The input text
 * @returns {Array} - Array of text segments with highlighting info
 */
export const highlightVariables = (text) => {
    const variableRegex = /\{\{\s*([^}]+)\s*\}\}/g;
    const segments = [];
    let lastIndex = 0;
    let match;

    while ((match = variableRegex.exec(text)) !== null) {
        // Add text before the variable
        if (match.index > lastIndex) {
            segments.push({
                text: text.slice(lastIndex, match.index),
                isVariable: false
            });
        }

        // Add the variable
        const variableName = match[1].trim();
        segments.push({
            text: match[0],
            isVariable: true,
            variableName: variableName,
            isValid: isValidVariableName(variableName)
        });

        lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
        segments.push({
            text: text.slice(lastIndex),
            isVariable: false
        });
    }

    return segments;
};

/**
 * Calculates optimal node dimensions based on content
 * @param {string} text - The text content
 * @param {number} variableCount - Number of variables
 * @returns {Object} - Dimensions object with width and height
 */
export const calculateNodeDimensions = (text, variableCount) => {
    const baseWidth = 250;
    const baseHeight = 120;

    // Calculate width based on text length (rough estimation)
    const textLength = text.length;
    const estimatedWidth = Math.max(baseWidth, Math.min(400, baseWidth + (textLength * 2)));

    // Calculate height based on text lines and variables
    const estimatedLines = Math.ceil(textLength / 40); // Rough chars per line
    const textHeight = Math.max(60, estimatedLines * 20);
    const variableHeight = variableCount * 25; // Space for variable handles
    const totalHeight = baseHeight + Math.max(textHeight - 60, 0) + (variableCount > 3 ? variableHeight - 75 : 0);

    return {
        width: estimatedWidth,
        height: Math.min(totalHeight, 500) // Max height limit
    };
};

/**
 * Generates example text with variables for demonstration
 * @returns {Array} - Array of example texts
 */
export const getExampleTexts = () => [
    'Hello {{name}}, welcome to our platform!',
    'Processing {{data}} with {{algorithm}} method.',
    'User {{userId}} has {{messageCount}} new messages.',
    'The {{product}} costs ${{price}} and is {{status}}.',
    'Welcome {{firstName}} {{lastName}}! Your order {{orderId}} is ready.',
    'Temperature: {{temperature}}°C, Humidity: {{humidity}}%'
];

/**
 * Validates variable syntax in real-time
 * @param {string} text - Current text being typed
 * @param {number} cursorPosition - Current cursor position
 * @returns {Object} - Validation result with suggestions
 */
export const validateVariableSyntax = (text, cursorPosition) => {
    const beforeCursor = text.slice(0, cursorPosition);
    const afterCursor = text.slice(cursorPosition);

    // Check if we're inside a variable declaration
    const openBraces = (beforeCursor.match(/\{\{/g) || []).length;
    const closeBraces = (beforeCursor.match(/\}\}/g) || []).length;

    const isInsideVariable = openBraces > closeBraces;

    if (isInsideVariable) {
        // Find the current variable being typed
        const lastOpenBrace = beforeCursor.lastIndexOf('{{');
        if (lastOpenBrace !== -1) {
            const currentVariable = beforeCursor.slice(lastOpenBrace + 2).trim();
            const isValid = currentVariable === '' || isValidVariableName(currentVariable);

            return {
                isInsideVariable: true,
                currentVariable,
                isValid,
                suggestion: isValid ? null : 'Variable names must start with a letter, _, or $ and contain only letters, numbers, _, or $'
            };
        }
    }

    return {
        isInsideVariable: false,
        currentVariable: null,
        isValid: true,
        suggestion: null
    };
};
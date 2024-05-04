class Node {
    constructor(value, frequency) {
        this.value = value;
        this.frequency = frequency;
        this.left = null;
        this.right = null;
    }
}

function buildFrequencyTable(text) {
    const frequencyTable = [];
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (frequencyTable[char]) {
            frequencyTable[char] = frequencyTable[char] + 1;
        } else {
            frequencyTable[char] = 1;
        }
    }

    return frequencyTable;
}

function buildHuffmanTree(frequencyTable) {
    const nodes = [];

    for (let char in frequencyTable) {
        const frequency = frequencyTable[char];
        const node = new Node(char, frequency);
        nodes.push(node);
    }

    while (nodes.length > 1) {
        nodes.sort((a, b) => a.frequency - b.frequency);
        const leftNode = nodes.shift();
        const rightNode = nodes.shift();
        const parentNode = new Node(
            null,
            leftNode.frequency + rightNode.frequency
        );
        parentNode.left = leftNode;
        parentNode.right = rightNode;

        nodes.push(parentNode);
    }

    return nodes[0];
}

function buildHuffmanCodes(rootNode) {
    const huffmanCodes = {};

    function traverse(node, path) {
        if (!node.left && !node.right) {
            huffmanCodes[node.value] = path;
            return;
        }

        traverse(node.left, path + "0");
        traverse(node.right, path + "1");
    }

    traverse(rootNode, "");

    return huffmanCodes;
}

function encodeText(text, huffmanCodes) {
    let encodedText = "";

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        encodedText += huffmanCodes[char];
    }

    return encodedText;
}

function decodeText(encodedText, rootNode) {
    let decodedText = "";
    let currentNode = rootNode;

    for (let i = 0; i < encodedText.length; i++) {
        const bit = encodedText[i];

        if (bit === "0") {
            currentNode = currentNode.left;
        } else {
            currentNode = currentNode.right;
        }

        if (!currentNode.left && !currentNode.right) {
            decodedText += currentNode.value;
            currentNode = rootNode;
        }
    }

    return decodedText;
}

// Example usage
const text = "hello world";
const frequencyTable = buildFrequencyTable(text);
const huffmanTree = buildHuffmanTree(frequencyTable);
const huffmanCodes = buildHuffmanCodes(huffmanTree);
const encodedText = encodeText(text, huffmanCodes);
const decodedText = decodeText(encodedText, huffmanTree);

console.log("Original text:", text);
console.log("Encoded text:", encodedText);
console.log("Decoded text:", decodedText);

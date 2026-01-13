#!/bin/bash

echo "🚀 SETTING UP JUPYTER DEMO ENVIRONMENT FOR INTERVIEWS"
echo "======================================================"

# Check if Jupyter is installed
if ! command -v jupyter &> /dev/null; then
    echo "📦 Installing Jupyter..."
    pip install jupyterlab notebook
fi

# Install tslab globally for TypeScript kernel
echo "📝 Installing TypeScript/JavaScript kernel..."
npm install -g tslab

# Register the kernels
echo "🔧 Registering kernels with Jupyter..."
tslab install --version

# Install additional packages for demos
echo "📦 Installing demo dependencies..."
npm install --save-dev @types/lodash lodash axios cheerio

# Verify installation
echo ""
echo "✅ INSTALLATION COMPLETE!"
echo "=========================="
jupyter kernelspec list

echo ""
echo "🎯 AVAILABLE KERNELS:"
echo "- TypeScript (tslab) - Full TypeScript with autocomplete"
echo "- JavaScript (tslab) - JavaScript with Node.js runtime"

echo ""
echo "🚀 START JUPYTER WITH:"
echo "cd /home/kevin/Projects/nodejs-traditional-autocomplete/interviewing"
echo "jupyter lab"

echo ""
echo "📁 DEMO NOTEBOOKS AVAILABLE:"
echo "- nodejs_fundamentals.ipynb - Core Node.js skills"
echo "- react_components.ipynb - React component development"
echo "- async_patterns.ipynb - Modern async/await patterns"
echo "- data_processing.ipynb - Data manipulation and APIs"
echo "- algorithm_demos.ipynb - Algorithm implementations"


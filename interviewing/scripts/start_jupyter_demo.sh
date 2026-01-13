#!/bin/bash

echo "🎯 STARTING JUPYTER INTERVIEW DEMONSTRATION"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "../package.json" ]; then
    echo "❌ Please run from the interviewing folder"
    exit 1
fi

# Check if kernels are installed
if ! jupyter kernelspec list | grep -q "tslab"; then
    echo "⚠️ TypeScript kernel not found. Running setup..."
    ./setup_jupyter_demo.sh
fi

# Set up environment
export NODE_ENV=development
export JUPYTER_CONFIG_DIR=$PWD/.jupyter

# Create Jupyter config if it doesn't exist
mkdir -p .jupyter

echo ""
echo "�� Starting Jupyter Lab for interview demonstrations..."
echo ""
echo "📋 Available Notebooks:"
echo "  • nodejs_fundamentals.ipynb - Core Node.js skills"
echo "  • react_components.ipynb - Advanced React patterns" 
echo ""
echo "🎯 Features:"
echo "  ✅ Traditional autocomplete (no AI)"
echo "  ✅ Instant code execution"
echo "  ✅ TypeScript support"
echo "  ✅ Real-time feedback"
echo ""

# Open Jupyter Lab
jupyter lab --ip=127.0.0.1 --port=8888 --no-browser --allow-root


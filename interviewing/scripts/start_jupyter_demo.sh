#!/bin/bash

echo "🚀 STARTING JUPYTER DEMO ENVIRONMENT"
echo "===================================="

# Check if we're in the right directory
if [ ! -f "../package.json" ]; then
    echo "❌ Please run from the interviewing folder within nodejs-traditional-autocomplete project"
    exit 1
fi

# Check if virtual environment exists
if [ ! -d ".venv" ]; then
    echo "❌ Virtual environment not found. Please run setup first:"
    echo "   npm run jupyter:setup"
    exit 1
fi

# Activate virtual environment
echo "🐍 Activating Python virtual environment..."
source .venv/bin/activate

# Check if tslab is installed locally
if [ ! -f "../node_modules/.bin/tslab" ]; then
    echo "❌ tslab not found. Please run setup first:"
    echo "   npm run jupyter:setup"
    exit 1
fi

# Export environment variables for ES Modules support
export NODE_ENV=development
export JUPYTER_CONFIG_DIR="$(pwd)/.jupyter"
export TSLAB_CONFIG_FILE="$(pwd)/tsconfig.jupyter.json"

# Ensure notebooks directory exists
mkdir -p notebooks

# Start Jupyter Lab with proper configuration
echo "🔧 Configuring Jupyter Lab..."
echo "📋 Available notebooks:"
ls -la notebooks/*.ipynb 2>/dev/null || echo "  (No notebooks found yet)"

echo ""
echo "🚀 Starting Jupyter Lab..."
echo "📱 Interface will be available at: http://localhost:8888"
echo "🔑 Token will be displayed below"
echo ""
echo "💡 TIP: Use 'nodejs_fundamentals_esm.ipynb' for ES Modules demonstration"
echo ""

# Start Jupyter Lab with the local installation
jupyter lab \
    --notebook-dir=./notebooks \
    --ip=127.0.0.1 \
    --port=8888 \
    --no-browser \
    --allow-root \
    --notebook-dir="$(pwd)/notebooks" \
    --ServerApp.kernel_spec_manager_class='jupyter_client.kernelspec.KernelSpecManager' \
    --ServerApp.kernelspec_path="$(pwd)/.jupyter/kernels" \
    --ServerApp.token="" \
    --ServerApp.password="" \
    --ServerApp.disable_check_xsrf=True

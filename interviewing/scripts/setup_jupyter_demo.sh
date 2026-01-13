#!/bin/bash

echo "🚀 SETTING UP JUPYTER DEMO ENVIRONMENT FOR INTERVIEWS"
echo "======================================================"

# Check if we're in the right directory
if [ ! -f "../package.json" ]; then
    echo "❌ Please run from the interviewing folder within nodejs-traditional-autocomplete project"
    exit 1
fi

# Check project type
PROJECT_TYPE=$(grep '"type"' ../package.json | grep -o '"module"' || echo '"commonjs"')
echo "📋 Project module type: $PROJECT_TYPE"

# Create virtual environment for Python packages
echo "🐍 Creating Python virtual environment..."
if [ ! -d ".venv" ]; then
    python3 -m venv .venv
fi
source .venv/bin/activate

# Install Jupyter locally
echo "📦 Installing Jupyter locally..."
pip install jupyterlab notebook ipywidgets

# Install tslab as a local dependency
echo "📝 Installing TypeScript/JavaScript kernel locally..."
cd ..  # Back to nodejs-traditional-autocomplete root
npm install tslab --save-dev
cd interviewing

# Register the TypeScript kernel using local tslab
echo "🔧 Registering TypeScript kernel..."
source .venv/bin/activate
../node_modules/.bin/tslab install --prefix=$(pwd)/.jupyter

# Configure TypeScript kernel for ES Modules
echo "⚙️ Configuring TypeScript kernel for ES Modules..."
mkdir -p .jupyter/kernels/tslab-esm

# Create custom ES Modules kernel
cat > .jupyter/kernels/tslab-esm/kernel.json << 'KERNEL_EOF'
{
    "argv": [
        "node",
        "../node_modules/tslab/dist/index.js",
        "--project=../tsconfig.base.json",
        "{connection_file}"
    ],
    "display_name": "TypeScript (ESM)",
    "language": "typescript",
    "env": {
        "NODE_OPTIONS": "--experimental-modules",
        "TSC_OPTIONS": "--target ES2022 --module ESNext --moduleResolution node"
    }
}
KERNEL_EOF

# Install additional packages for demos
echo "📦 Installing demo dependencies..."
cd ..
pnpm add -D @types/lodash lodash axios cheerio
cd interviewing

# Create symlinks to main project node_modules for shared dependencies
echo "🔗 Linking to main project dependencies..."
if [ ! -L node_modules ]; then
    ln -sf ../node_modules ./node_modules
fi

# Create TypeScript config for notebooks that extends main project
echo "📝 Creating TypeScript config for notebooks..."
cat > tsconfig.jupyter.json << 'TS_EOF'
{
    "extends": "../tsconfig.base.json",
    "compilerOptions": {
        "target": "ES2022",
        "module": "ESNext",
        "moduleResolution": "node",
        "allowSyntheticDefaultImports": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "strict": true,
        "declaration": false,
        "outDir": "./.jupyter/compiled",
        "rootDir": "./notebooks"
    },
    "include": [
        "./notebooks/**/*",
        "../**/*.d.ts"
    ],
    "exclude": [
        "node_modules",
        ".jupyter/compiled"
    ]
}
TS_EOF

# Create .env file for Jupyter configuration
echo "🌍 Setting up environment..."
cat > .env << 'ENV_EOF'
NODE_ENV=development
JUPYTER_CONFIG_DIR=./.jupyter
TSLAB_CONFIG_FILE=./tsconfig.jupyter.json
PYTHONPATH=$(pwd)/.venv/lib/python3.*/site-packages
PATH=$(pwd)/.venv/bin:$PATH
ENV_EOF

# Verify installation
echo ""
echo "✅ INSTALLATION COMPLETE!"
echo "=========================="
echo "📋 Available Kernels:"
if [ -d ".jupyter/kernels" ]; then
    ls -la .jupyter/kernels/
else
    echo "  TypeScript kernel configuration created"
fi

echo ""
echo "🎯 AVAILABLE KERNELS:"
echo "- TypeScript (tslab) - Full TypeScript with autocomplete"
echo "- TypeScript (ESM) - TypeScript optimized for ES Modules"
echo "- JavaScript (tslab) - JavaScript with Node.js runtime"

echo ""
echo "🚀 START JUPYTER WITH:"
echo "pnpm demo:start"
echo "# OR manually:"
echo "cd interviewing && ./scripts/start_jupyter_demo.sh"

echo ""
echo "📁 DEMO NOTEBOOKS AVAILABLE:"
echo "- nodejs_fundamentals_esm.ipynb - Core Node.js skills (ES Modules)"
echo "- nodejs_fundamentals.ipynb - Core Node.js skills (compatible)"
echo "- react_components.ipynb - React component development"

echo ""
echo "🔗 PROJECT INTEGRATION:"
echo "- ✅ Local virtual environment for Jupyter"
echo "- ✅ Local tslab installation (no global dependencies)"
echo "- ✅ Linked to main project dependencies"
echo "- ✅ ES Modules support configured" 
echo "- ✅ TypeScript config extends main project"
echo "- ✅ Traditional autocomplete (no AI assistance)"


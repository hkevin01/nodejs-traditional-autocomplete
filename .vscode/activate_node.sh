#!/bin/bash
# Node.js Traditional Autocomplete Environment Activation Script
# This script ensures the correct Node.js version is active and dependencies are available

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Setting up Node.js Traditional Autocomplete Environment${NC}"

# Get the workspace root directory
WORKSPACE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/.."
cd "$WORKSPACE_ROOT"

# Check if .nvmrc exists
if [ ! -f ".nvmrc" ]; then
    echo -e "${RED}❌ .nvmrc file not found${NC}"
    exit 1
fi

# Read Node.js version from .nvmrc
REQUIRED_NODE_VERSION=$(cat .nvmrc)
echo -e "${YELLOW}📋 Required Node.js version: ${REQUIRED_NODE_VERSION}${NC}"

# Check if nvm is available
if command -v nvm >/dev/null 2>&1; then
    echo -e "${GREEN}✅ NVM is available${NC}"
    # Use the required Node.js version
    nvm use "$REQUIRED_NODE_VERSION" || {
        echo -e "${YELLOW}⚠️  Installing Node.js ${REQUIRED_NODE_VERSION}${NC}"
        nvm install "$REQUIRED_NODE_VERSION"
        nvm use "$REQUIRED_NODE_VERSION"
    }
else
    echo -e "${YELLOW}⚠️  NVM not found, checking current Node.js version${NC}"
    # Check current Node.js version
    if command -v node >/dev/null 2>&1; then
        CURRENT_NODE_VERSION=$(node -v)
        echo -e "${BLUE}📍 Current Node.js version: ${CURRENT_NODE_VERSION}${NC}"
        
        # Simple version check (remove 'v' prefix for comparison)
        CURRENT_MAJOR=$(echo "$CURRENT_NODE_VERSION" | sed 's/v//' | cut -d. -f1)
        REQUIRED_MAJOR=$(echo "$REQUIRED_NODE_VERSION" | cut -d. -f1)
        
        if [ "$CURRENT_MAJOR" != "$REQUIRED_MAJOR" ]; then
            echo -e "${YELLOW}⚠️  Warning: Node.js version mismatch. Required: v${REQUIRED_NODE_VERSION}, Current: ${CURRENT_NODE_VERSION}${NC}"
            echo -e "${YELLOW}   Consider installing nvm and the correct Node.js version${NC}"
        else
            echo -e "${GREEN}✅ Node.js version is compatible${NC}"
        fi
    else
        echo -e "${RED}❌ Node.js not found. Please install Node.js ${REQUIRED_NODE_VERSION}${NC}"
        exit 1
    fi
fi

# Check if pnpm is available
if ! command -v pnpm >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  pnpm not found, installing via npm${NC}"
    npm install -g pnpm@9
else
    echo -e "${GREEN}✅ pnpm is available: $(pnpm -v)${NC}"
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    pnpm install
else
    echo -e "${GREEN}✅ Dependencies are installed${NC}"
    
    # Check if package.json has changed since last install
    if [ "package.json" -nt "node_modules" ] || [ "pnpm-lock.yaml" -nt "node_modules" ]; then
        echo -e "${YELLOW}🔄 Dependencies may be outdated, updating...${NC}"
        pnpm install
    fi
fi

# Set up environment variables
export NODE_OPTIONS="--max-old-space-size=4096"
export NODE_ENV="development"

echo -e "${GREEN}🎉 Environment setup complete!${NC}"
echo -e "${BLUE}💡 Available commands:${NC}"
echo -e "   ${YELLOW}pnpm dev${NC}        - Start all development servers"
echo -e "   ${YELLOW}pnpm dev:web${NC}    - Start Next.js web app"
echo -e "   ${YELLOW}pnpm dev:api${NC}    - Start Express API server"
echo -e "   ${YELLOW}pnpm build${NC}      - Build all packages"
echo -e "   ${YELLOW}pnpm test${NC}       - Run all tests"
echo -e "   ${YELLOW}pnpm lint${NC}       - Lint all code"
echo -e "   ${YELLOW}pnpm type-check${NC} - Type check all TypeScript"

# Make the script executable
chmod +x "$0" 2>/dev/null || true

echo -e "${GREEN}✨ Traditional autocomplete environment is ready!${NC}"
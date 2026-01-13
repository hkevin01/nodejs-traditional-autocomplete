#!/bin/bash

echo "🚀 DEMO EXECUTION ENVIRONMENT"
echo "============================="
echo "Jupyter-like environment for Node.js and React"
echo ""

# Function to run Node.js demo
run_nodejs() {
    echo "▶️  Running Node.js ES Modules Demo"
    echo "================================="
    node hello-world-nodejs.mjs
    echo ""
    echo "✅ Node.js demo completed!"
    echo ""
}

# Function to simulate React demo (since we don't have a full React setup)
run_react() {
    echo "▶️  React Demo Simulation"
    echo "========================"
    echo "📋 Component: HelloWorldReact"
    echo "🔧 Features: ES Modules, Hooks, Interactive Elements"
    echo "📝 Code location: hello-world-react.jsx"
    echo ""
    echo "💡 To run React demo in browser:"
    echo "   1. Set up Vite: npm create vite@latest react-demo -- --template react"
    echo "   2. Copy hello-world-react.jsx to src/App.jsx"
    echo "   3. Run: npm run dev"
    echo ""
    echo "✅ React demo information displayed!"
    echo ""
}

# Function to show available demos
show_menu() {
    echo "📋 Available Demos:"
    echo "=================="
    echo "1) Node.js ES Modules Demo"
    echo "2) React Components Demo (info)"
    echo "3) Run both demos"
    echo "4) Exit"
    echo ""
}

# Function to check Node.js demo file
check_nodejs() {
    if [ ! -f "hello-world-nodejs.mjs" ]; then
        echo "❌ Node.js demo file not found!"
        echo "   Expected: hello-world-nodejs.mjs"
        return 1
    fi
    return 0
}

# Function to check React demo file
check_react() {
    if [ ! -f "hello-world-react.jsx" ]; then
        echo "❌ React demo file not found!"
        echo "   Expected: hello-world-react.jsx"
        return 1
    fi
    return 0
}

# Main execution logic
main() {
    cd "$(dirname "$0")"
    
    echo "📁 Current directory: $(pwd)"
    echo "📋 Available files:"
    ls -la *.{mjs,jsx,js} 2>/dev/null || echo "   No demo files found"
    echo ""
    
    # Check if in interactive mode
    if [ "$1" = "--interactive" ] || [ -z "$1" ]; then
        while true; do
            show_menu
            read -p "Select an option (1-4): " choice
            
            case $choice in
                1)
                    if check_nodejs; then
                        run_nodejs
                    fi
                    ;;
                2)
                    if check_react; then
                        run_react
                    fi
                    ;;
                3)
                    if check_nodejs && check_react; then
                        run_nodejs
                        run_react
                    fi
                    ;;
                4|q|quit|exit)
                    echo "👋 Goodbye!"
                    exit 0
                    ;;
                *)
                    echo "❌ Invalid option. Please choose 1-4."
                    ;;
            esac
            
            read -p "Press Enter to continue..."
            echo ""
        done
    else
        # Direct execution based on parameter
        case "$1" in
            "nodejs"|"node")
                check_nodejs && run_nodejs
                ;;
            "react")
                check_react && run_react
                ;;
            "all")
                check_nodejs && check_react && run_nodejs && run_react
                ;;
            *)
                echo "Usage: $0 [nodejs|react|all|--interactive]"
                echo ""
                echo "Examples:"
                echo "  $0                    # Interactive mode"
                echo "  $0 --interactive      # Interactive mode"
                echo "  $0 nodejs            # Run Node.js demo"
                echo "  $0 react             # Show React demo info"
                echo "  $0 all               # Run all demos"
                ;;
        esac
    fi
}

# Execute main function
main "$@"

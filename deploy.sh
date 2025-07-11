#!/bin/bash

# Script para fazer commit e push das mudanças

echo "Adicionando arquivos ao Git..."
git add .

echo "Fazendo commit..."
git commit -m "feat: implement Shadcn/ui components and improve project structure

✨ Features:
- Add Shadcn/ui components: Button, Input, Checkbox, Label
- Replace native HTML elements with design system components
- Improve README with comprehensive documentation
- Add proper TypeScript interfaces and component props

🔧 Improvements:
- Better accessibility with semantic components
- Consistent styling across all form elements
- Enhanced developer experience with TypeScript
- Maintainable component architecture

📝 Updated:
- LoginForm: Use Shadcn/ui components
- RegisterForm: Use Shadcn/ui components  
- README: Complete project documentation
- Add proper component structure and exports"

echo "Fazendo push para o repositório..."
git push origin main

echo "✅ Commit e push realizados com sucesso!"
